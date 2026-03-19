import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SOURCES_FILE = resolve(ROOT, "news-sources.json");
const HIGHLIGHTS_FILE = resolve(ROOT, "manual-highlights.json");
const OUTPUT_FILE = resolve(ROOT, "news-feed.json");

const MAX_POOL_PER_REGION = 120;

const CATEGORY_RULES = {
  tools: [
    "tool",
    "product",
    "platform",
    "release",
    "launch",
    "feature",
    "plugin",
    "copilot",
    "assistant"
  ],
  skills: [
    "guide",
    "how to",
    "tutorial",
    "workflow",
    "prompt",
    "best practice",
    "playbook"
  ],
  articles: [
    "analysis",
    "opinion",
    "research",
    "paper",
    "essay",
    "report",
    "insight"
  ],
  updates: [
    "update",
    "funding",
    "policy",
    "regulation",
    "acquisition",
    "partnership",
    "announcement"
  ]
};

const RELEVANCE_TERMS = [
  "legal ai",
  "legal tech",
  "law firm",
  "contract",
  "compliance",
  "regulation",
  "e-discovery",
  "genai",
  "agent",
  "llm",
  "court",
  "litigation"
];

function decodeEntities(str) {
  return (str || "")
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(str) {
  return decodeEntities(str).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getTagText(block, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const m = block.match(re);
  return m ? stripTags(m[1]) : "";
}

function getEntryLink(block) {
  const rssLink = getTagText(block, "link");
  if (rssLink && /^https?:\/\//i.test(rssLink)) return rssLink;

  const atomHref = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  if (atomHref?.[1]) return atomHref[1].trim();

  const guid = getTagText(block, "guid");
  if (guid && /^https?:\/\//i.test(guid)) return guid;
  return "";
}

function parseDate(block) {
  const raw =
    getTagText(block, "pubDate") ||
    getTagText(block, "updated") ||
    getTagText(block, "published") ||
    getTagText(block, "dc:date");
  const d = raw ? new Date(raw) : null;
  if (!d || Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function parseFeed(xml, source) {
  const itemBlocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map((m) => m[0]);
  const entryBlocks = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map((m) => m[0]);
  const blocks = itemBlocks.length > 0 ? itemBlocks : entryBlocks;

  return blocks
    .map((block) => {
      const title = getTagText(block, "title");
      const url = getEntryLink(block);
      const summary =
        getTagText(block, "description") ||
        getTagText(block, "summary") ||
        getTagText(block, "content");
      const publishedAt = parseDate(block);

      if (!title || !url) return null;

      return {
        id: `${source.name}:${normalizeKey(url)}`,
        title,
        url,
        source: source.name,
        publishedAt,
        summary: summary.slice(0, 220),
        category: classify(title, summary),
        region: source.region,
        score: scoreItem(title, summary, source.priority || 1, publishedAt)
      };
    })
    .filter(Boolean);
}

function normalizeKey(value) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[?#].*$/, "")
    .replace(/\/$/, "");
}

function classify(title, summary) {
  const text = `${title} ${summary}`.toLowerCase();
  for (const [category, terms] of Object.entries(CATEGORY_RULES)) {
    if (terms.some((term) => text.includes(term))) return category;
  }
  return "updates";
}

function scoreItem(title, summary, priority, publishedAt) {
  const text = `${title} ${summary}`.toLowerCase();
  const relevance = RELEVANCE_TERMS.reduce((acc, term) => acc + (text.includes(term) ? 1 : 0), 0);

  let recency = 0;
  if (publishedAt) {
    const hours = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60);
    recency = Math.max(0, 72 - hours) / 72;
  }

  return priority * 2 + relevance * 3 + recency * 4;
}

async function fetchWithTimeout(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "fukun-news-radar/1.0" }
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

function dedupe(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = normalizeKey(item.url) || normalizeKey(item.title);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

async function main() {
  const sourceConfig = JSON.parse(await readFile(SOURCES_FILE, "utf8"));
  const manual = JSON.parse(await readFile(HIGHLIGHTS_FILE, "utf8"));
  const enabledSources = (sourceConfig.sources || []).filter((s) => s.enabled !== false);

  const all = [];
  for (const source of enabledSources) {
    try {
      const xml = await fetchWithTimeout(source.url);
      const parsed = parseFeed(xml, source);
      all.push(...parsed);
      console.log(`Fetched ${parsed.length} items from ${source.name}`);
    } catch (err) {
      console.warn(`Skipping ${source.name}: ${err.message}`);
    }
  }

  const deduped = dedupe(all);
  const byRegion = {
    na: deduped.filter((i) => i.region === "na"),
    cn: deduped.filter((i) => i.region === "cn")
  };

  for (const region of ["na", "cn"]) {
    byRegion[region].sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (db !== da) return db - da;
      return b.score - a.score;
    });
    byRegion[region] = byRegion[region].slice(0, MAX_POOL_PER_REGION).map(({ score, ...rest }) => rest);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    highlights: {
      na: manual.highlights?.na || [],
      cn: manual.highlights?.cn || []
    },
    panels: byRegion
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
