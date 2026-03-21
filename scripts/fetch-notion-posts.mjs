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

function richTextToPlain(rich = []) {
  return (rich || []).map((r) => r?.plain_text || "").join("").trim();
}

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

function getPublishedProperty(properties) {
  const explicitFalseTerms = ["draft", "private", "idea", "todo", "wip", "archive", "archived"];
  const explicitTrueTerms = ["publish", "published", "live", "public", "done", "ready"];

  for (const [name, value] of Object.entries(properties || {})) {
    const lower = name.toLowerCase();
    if ((lower.includes("publish") || lower.includes("live")) && value?.type === "checkbox") {
      return {
        isPublished: !!value.checkbox,
        reason: `checkbox:${name}=${value.checkbox ? "true" : "false"}`
      };
    }
    if ((lower.includes("status") || lower.includes("state")) && value?.type === "select") {
      const n = (value.select?.name || "").toLowerCase();
      if (!n) return { isPublished: true, reason: `select:${name}=empty(default-allow)` };
      if (explicitFalseTerms.some((t) => n.includes(t))) {
        return { isPublished: false, reason: `select:${name}=${n}(blocked)` };
      }
      if (explicitTrueTerms.some((t) => n.includes(t))) {
        return { isPublished: true, reason: `select:${name}=${n}(allow)` };
      }
      return { isPublished: true, reason: `select:${name}=${n}(default-allow)` };
    }
    if ((lower.includes("status") || lower.includes("state")) && value?.type === "status") {
      const n = (value.status?.name || "").toLowerCase();
      if (!n) return { isPublished: true, reason: `status:${name}=empty(default-allow)` };
      if (explicitFalseTerms.some((t) => n.includes(t))) {
        return { isPublished: false, reason: `status:${name}=${n}(blocked)` };
      }
      if (explicitTrueTerms.some((t) => n.includes(t))) {
        return { isPublished: true, reason: `status:${name}=${n}(allow)` };
      }
      return { isPublished: true, reason: `status:${name}=${n}(default-allow)` };
    }
  }
  return { isPublished: true, reason: "no-publish-field(default-allow)" };
}

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

function blockToText(block) {
  const type = block?.type;
  if (!type || !block[type]) return "";

  const data = block[type];
  if (data.rich_text) {
    const text = richTextToPlain(data.rich_text);
    if (!text) return "";
    if (type === "heading_1") return `\n\n§§H1§§${text}\n\n`;
    if (type === "heading_2") return `\n\n§§H2§§${text}\n\n`;
    if (type === "heading_3") return `\n\n§§H3§§${text}\n\n`;
    if (type === "bulleted_list_item") return `\n\n§§BULLET§§${text}`;
    if (type === "numbered_list_item") return `\n\n§§NUMBER§§${text}`;
    if (type === "quote") return `\n\n§§QUOTE§§${text}`;
    if (type === "callout") return `\n\n§§CALLOUT§§${text}`;
    return text + "\n\n";
  }

  if (type === "divider") return `\n\n§§DIVIDER§§\n\n`;
  return "";
}

function cleanBody(raw) {
  return raw.replace(/\n{3,}/g, "\n\n").trim();
}

function parseBodyToBlocks(body) {
  const parts = body.split(/\n\n+/);
  const blocks = [];
  for (const p of parts) {
    const t = p.trim();
    if (!t || t === "§§DIVIDER§§") { blocks.push({ type: "divider" }); continue; }
    if (t.startsWith("§§H1§§")) blocks.push({ type: "h1", text: t.replace("§§H1§§", "") });
    else if (t.startsWith("§§H2§§")) blocks.push({ type: "h2", text: t.replace("§§H2§§", "") });
    else if (t.startsWith("§§H3§§")) blocks.push({ type: "h3", text: t.replace("§§H3§§", "") });
    else if (t.startsWith("§§QUOTE§§")) blocks.push({ type: "quote", text: t.replace("§§QUOTE§§", "") });
    else if (t.startsWith("§§CALLOUT§§")) blocks.push({ type: "callout", text: t.replace("§§CALLOUT§§", "") });
    else if (t.startsWith("§§BULLET§§")) blocks.push({ type: "bullet", text: t.replace("§§BULLET§§", "") });
    else if (t.startsWith("§§NUMBER§§")) blocks.push({ type: "number", text: t.replace("§§NUMBER§§", "") });
    else if (t) blocks.push({ type: "paragraph", text: t });
  }
  return blocks;
}

function summarize(text, max = 280) {
  const plain = text.replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 1)}…`;
}

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
      const publish = getPublishedProperty(properties);
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

      const blocks = await fetchPageBlocks(page.id);
      const rawBody = blocks.map(blockToText).filter(Boolean).join("");
      const bodyText = cleanBody(rawBody);
      const bodyBlocks = parseBodyToBlocks(bodyText);

      entries.push({
        id: Number.parseInt(page.id.replace(/-/g, "").slice(0, 12), 16),
        notionPageId: page.id,
        title,
        date,
        section,
        author,
        tags,
        body: bodyText || "(No content yet)",
        bodyBlocks,
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
      console.log(`- ${reason}: ${count}`);
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
    console.log("To use these in your site, update the script with property extractors.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
