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
  photo: "photography",
  music: "music",
  pottery: "pottery",
  ceramics: "pottery",
  ceramic: "pottery",
  陶艺: "pottery",
  video: "video",
  videos: "video",
  film: "video",
  films: "video",
  youtube: "video",
  小红书: "video",
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
    if (type === "heading_1") return `# ${text}\n`;
    if (type === "heading_2") return `## ${text}\n`;
    if (type === "heading_3") return `### ${text}\n`;
    if (type === "bulleted_list_item") return `- ${text}\n`;
    if (type === "numbered_list_item") return `1. ${text}\n`;
    return text + "\n";
  }

  if (type === "divider") return "\n---\n";
  return "";
}

// Extract image URLs from page blocks (uploaded files + external images)
function extractImageUrls(blocks) {
  const urls = [];
  for (const block of blocks) {
    if (block?.type !== "image") continue;
    const img = block.image;
    if (!img) continue;
    // Uploaded file (expires after 1 hour — Notion limitation; use external links instead)
    if (img.type === "file" && img.file?.url) urls.push(img.file.url);
    // External image URL (permanent)
    if (img.type === "external" && img.external?.url) urls.push(img.external.url);
  }
  return urls;
}

// Also grab page cover image (a great place to put the hero photo)
function getCoverImage(page) {
  const cover = page?.cover;
  if (!cover) return null;
  if (cover.type === "external" && cover.external?.url) return cover.external.url;
  if (cover.type === "file" && cover.file?.url) return cover.file.url;
  return null;
}

// Extract Spotify URL from page body blocks (bookmark, embed, link_preview, paragraph hrefs)
function extractSpotifyFromBlocks(blocks) {
  for (const block of blocks) {
    const type = block?.type;
    if (!type) continue;
    // bookmark / embed / link_preview blocks store URL directly
    if (["bookmark", "embed", "link_preview"].includes(type)) {
      const url = block[type]?.url;
      if (url && /spotify\.com/.test(url)) return url;
    }
    // paragraph / callout / quote — check rich_text for linked hrefs
    if (block[type]?.rich_text) {
      for (const r of block[type].rich_text) {
        const href = r.href || r.text?.link?.url || "";
        if (/spotify\.com/.test(href)) return href;
      }
    }
  }
  return null;
}

// Extract SpotifyURL from a URL or rich_text property named "Spotify", "SpotifyURL", "spotify_url" etc.
function getSpotifyUrlProperty(properties) {
  for (const [name, value] of Object.entries(properties || {})) {
    const lname = name.toLowerCase().replace(/[_\s-]/g, "");
    if (!lname.includes("spotify")) continue;
    if (value?.type === "url" && value?.url) return value.url;
    if (value?.type === "rich_text") {
      const text = richTextToPlain(value.rich_text);
      if (text) return text;
    }
  }
  return null;
}

function cleanBody(raw) {
  return raw.replace(/\n{3,}/g, "\n\n").trim();
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
      const spotifyUrl = getSpotifyUrlProperty(properties);

      if (DEBUG_PROPERTIES) {
        for (const [name, value] of Object.entries(properties)) {
          if (!discoveredProperties.has(name)) {
            discoveredProperties.set(name, value?.type || "unknown");
          }
        }
      }

      const blocks = await fetchPageBlocks(page.id);
      const bodyText = cleanBody(blocks.map(blockToText).filter(Boolean).join(""));

      // Collect images: page cover first, then any image blocks in body
      const coverUrl = getCoverImage(page);
      const blockImages = extractImageUrls(blocks);
      const images = [...(coverUrl ? [coverUrl] : []), ...blockImages];

      // Spotify: try DB property first, fall back to scanning blocks
      const resolvedSpotifyUrl = spotifyUrl || extractSpotifyFromBlocks(blocks);

      const entry = {
        id: Number.parseInt(page.id.replace(/-/g, "").slice(0, 12), 16),
        notionPageId: page.id,
        title,
        date,
        section,
        author,
        tags,
        body: bodyText || "(No content yet)",
        summary: summarize(bodyText || ""),
        images,
        attachments: []
      };

      if (resolvedSpotifyUrl) entry.spotifyUrl = resolvedSpotifyUrl;

      entries.push(entry);
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
