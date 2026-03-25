import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const OUTPUT_FILE = resolve(ROOT, "notion-posts.json");

const RAW_NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN || "";
const NOTION_API_KEY = RAW_NOTION_API_KEY.trim().replace(/^['\"]|['\"]$/g, "");
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION = "2022-06-28";

const sectionMap = {
  tech: "tech",
  "legal-tech": "tech",
  "tech-obs": "tech",
  law: "law",
  investment: "investment",
  essays: "essays",
  photography: "photography",
  photos: "photography",
  music: "music"
};

function assertEnv() {
  if (!NOTION_API_KEY) throw new Error("Missing NOTION_API_KEY environment variable");
  if (!NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID environment variable");
  if (!(NOTION_API_KEY.startsWith("secret_") || NOTION_API_KEY.startsWith("ntn_"))) {
    console.warn("Warning: NOTION_API_KEY does not look like a Notion integration secret (expected prefix secret_ or ntn_).");
  }
}

async function notionRequest(path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 401) {
      throw new Error(
        `Notion API 401 unauthorized. Your token is invalid. ` +
        `Regenerate/copy the Internal Integration Secret in Notion, then update GitHub secret NOTION_API_KEY (no quotes, no spaces). Raw response: ${text}`
      );
    }
    throw new Error(`Notion API ${res.status}: ${text}`);
  }
  return res.json();
}

// ── Plain text (for property extraction only) ─────────────────────────────
function richTextToPlain(rich = []) {
  return (rich || []).map((r) => r?.plain_text || "").join("").trim();
}

// ── Annotated rich text (for body content) ────────────────────────────────
// Preserves bold, italic, code, strikethrough, underline, color, links
function richTextToAnnotated(rich = []) {
  return (rich || []).map((r) => {
    if (!r) return null;
    const ann = r.annotations || {};
    return {
      text: r.plain_text || "",
      href: r.href || r.text?.link?.url || null,
      bold: !!ann.bold,
      italic: !!ann.italic,
      code: !!ann.code,
      strike: !!ann.strikethrough,
      underline: !!ann.underline,
      color: ann.color && ann.color !== "default" ? ann.color : null
    };
  }).filter((s) => s && s.text);
}

// ── Property extractors ────────────────────────────────────────────────────
function getTitleProperty(properties) {
  for (const value of Object.values(properties || {})) {
    if (value?.type === "title") return richTextToPlain(value.title);
  }
  return "Untitled";
}

function getDateProperty(properties) {
  for (const value of Object.values(properties || {})) {
    if (value?.type === "date" && value?.date?.start) return value.date.start;
  }
  return new Date().toISOString().slice(0, 10);
}

function getSectionProperty(properties) {
  for (const value of Object.values(properties || {})) {
    if (value?.type === "select" && value?.select?.name) {
      const key = value.select.name.toLowerCase().trim();
      return sectionMap[key] || "tech";
    }
    if (value?.type === "status" && value?.status?.name) {
      const key = value.status.name.toLowerCase().trim();
      return sectionMap[key] || "tech";
    }
  }
  return "tech";
}

function getAuthorProperty(properties) {
  for (const value of Object.values(properties || {})) {
    if (value?.type === "people" && Array.isArray(value.people)) {
      const names = value.people.map((p) => p?.name || p?.id || "").filter(Boolean);
      return names.length > 0 ? names : null;
    }
  }
  return null;
}

function getTagsProperty(properties) {
  for (const value of Object.values(properties || {})) {
    if (value?.type === "multi_select" && Array.isArray(value.multi_select)) {
      const tags = value.multi_select.map((t) => t?.name || "").filter(Boolean);
      return tags.length > 0 ? tags : null;
    }
    if (value?.type === "rich_text") {
      const text = richTextToPlain(value.rich_text);
      if (text) {
        const tags = text.split(",").map((t) => t.trim()).filter(Boolean);
        return tags.length > 0 ? tags : null;
      }
    }
  }
  return null;
}

// Looks for a checkbox property whose name matches "show" / "show status" / "show on site"
// (case-insensitive). Only syncs the page if the checkbox is ticked.
// If no such property exists, the page is skipped (opt-in model).
function getShowStatusProperty(properties) {
  const SHOW_NAMES = ["show status", "show on site", "show", "publish", "published", "live", "public"];

  for (const [name, value] of Object.entries(properties || {})) {
    const lower = name.toLowerCase().trim();
    if (value?.type === "checkbox" && SHOW_NAMES.some((n) => lower === n || lower.includes(n))) {
      return {
        isPublished: !!value.checkbox,
        reason: `checkbox:${name}=${value.checkbox ? "true" : "false"}`
      };
    }
  }
  // No recognised show-status checkbox found — skip the page
  return { isPublished: false, reason: "no-show-status-checkbox(skip)" };
}

// ── Block fetching ──────────────────────────────────────────────────────────
async function fetchPageBlocks(pageId) {
  const chunks = [];
  let cursor = undefined;
  do {
    const qs = new URLSearchParams({ page_size: "100" });
    if (cursor) qs.set("start_cursor", cursor);
    const data = await notionRequest(`/blocks/${pageId}/children?${qs.toString()}`);
    chunks.push(...(data.results || []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return chunks;
}

// ── Structured block conversion ────────────────────────────────────────────
// Converts a raw Notion API block into our schema, preserving all formatting
function blockToStructured(block) {
  const type = block?.type;
  if (!type) return null;

  const data = block[type] || {};
  const base = {
    type,
    rich_text: richTextToAnnotated(data.rich_text),
    children: [] // filled by fetchBlocksRecursive
  };

  switch (type) {
    case "to_do":
      base.checked = !!data.checked;
      break;
    case "callout":
      base.icon = data.icon?.emoji || data.icon?.external?.url || null;
      base.color = data.color || null;
      break;
    case "code":
      base.language = data.language || "plain text";
      break;
    case "image":
      base.url = data.type === "external" ? data.external?.url : data.file?.url || null;
      base.expiry = data.type === "file" ? data.file?.expiry_time || null : null;
      base.caption = richTextToAnnotated(data.caption || []);
      base.rich_text = base.caption; // caption is the displayable rich text
      break;
    case "video":
      base.url = data.type === "external" ? data.external?.url : data.file?.url || null;
      base.caption = richTextToAnnotated(data.caption || []);
      break;
    case "embed":
    case "bookmark":
      base.url = data.url || null;
      base.caption = richTextToAnnotated(data.caption || []);
      break;
    case "file":
      base.url = data.type === "external" ? data.external?.url : data.file?.url || null;
      base.name = data.name || null;
      break;
    case "table":
      base.hasColumnHeader = !!data.has_column_header;
      base.hasRowHeader = !!data.has_row_header;
      base.tableWidth = data.table_width || 0;
      break;
    case "table_row":
      base.cells = (data.cells || []).map((cell) => richTextToAnnotated(cell));
      break;
    case "column_list":
    case "column":
      // children hold the content
      break;
    case "synced_block":
      // synced_from: null means this is the source block
      base.syncedFrom = data.synced_from?.block_id || null;
      break;
    case "link_preview":
      base.url = data.url || null;
      break;
  }

  return base;
}

// ── Recursive block fetcher ────────────────────────────────────────────────
// Fetches children for any block that has_children, up to depth 4
async function fetchBlocksRecursive(pageId, depth = 0) {
  if (depth > 4) return [];
  const rawBlocks = await fetchPageBlocks(pageId);
  const structured = [];

  for (const block of rawBlocks) {
    const s = blockToStructured(block);
    if (!s) continue;

    if (block.has_children && depth < 4) {
      try {
        s.children = await fetchBlocksRecursive(block.id, depth + 1);
      } catch {
        s.children = [];
      }
    }

    structured.push(s);
  }

  return structured;
}

// ── Plain text fallback (for summary generation) ──────────────────────────
function blocksToPlainText(blocks) {
  if (!blocks || blocks.length === 0) return "";
  const lines = blocks.map((b) => {
    const text = (b.rich_text || []).map((r) => r.text).join("").trim();
    if (b.type === "divider") return "---";
    if (!text && (!b.children || b.children.length === 0)) return "";
    const childText = b.children?.length ? "\n" + blocksToPlainText(b.children) : "";
    return text + childText;
  });
  return lines.filter(Boolean).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function summarize(text, max = 280) {
  const plain = (text || "").replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 1)}…`;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  assertEnv();

  const DEBUG_PROPERTIES = process.env.DEBUG_NOTION_PROPERTIES === "true";

  const entries = [];
  const discoveredProperties = new Map();
  let totalPagesSeen = 0;
  let skippedUnpublished = 0;
  const skipReasons = {};
  let cursor = undefined;

  do {
    const body = {
      page_size: 100,
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
      ...(cursor ? { start_cursor: cursor } : {})
    };
    const data = await notionRequest(`/databases/${NOTION_DATABASE_ID}/query`, body);

    for (const page of data.results || []) {
      totalPagesSeen += 1;
      const properties = page.properties || {};
      const publish = getShowStatusProperty(properties);
      if (!publish.isPublished) {
        skippedUnpublished += 1;
        skipReasons[publish.reason] = (skipReasons[publish.reason] || 0) + 1;
        continue;
      }

      const title = getTitleProperty(properties);
      const date = getDateProperty(properties);
      const section = getSectionProperty(properties);
      const author = getAuthorProperty(properties);
      const tags = getTagsProperty(properties);

      if (DEBUG_PROPERTIES) {
        for (const [name, value] of Object.entries(properties)) {
          if (!discoveredProperties.has(name)) {
            discoveredProperties.set(name, value?.type || "unknown");
          }
        }
      }

      // Fetch full block tree with annotations preserved
      const blocks = await fetchBlocksRecursive(page.id);

      // Plain text body for backward compat + summary generation
      const bodyText = blocksToPlainText(blocks);

      entries.push({
        id: Number.parseInt(page.id.replace(/-/g, "").slice(0, 12), 16),
        notionPageId: page.id,
        title,
        date,
        section,
        author,
        tags,
        // blocks: full structured tree — used by App.jsx renderer for exact Notion layout
        blocks: blocks.length > 0 ? blocks : null,
        // body: plain text fallback for old-style rendering + summary
        body: bodyText || "(No content yet)",
        summary: summarize(bodyText || ""),
        images: [],
        attachments: []
      });
    }

    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  entries.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(`Notion query pages seen: ${totalPagesSeen}`);
  console.log(`Included entries: ${entries.length}`);
  console.log(`Skipped as unpublished: ${skippedUnpublished}`);
  if (Object.keys(skipReasons).length > 0) {
    console.log("Skip reasons:");
    for (const [reason, count] of Object.entries(skipReasons)) {
      console.log(`  ${reason}: ${count}`);
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    source: "notion",
    entries
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${entries.length} entries to ${OUTPUT_FILE}`);

  if (DEBUG_PROPERTIES) {
    console.log("\n=== Discovered Notion DB Properties ===");
    const sorted = [...discoveredProperties.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    for (const [name, type] of sorted) {
      console.log(`  [${type}] ${name}`);
    }
    console.log("========================================\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
