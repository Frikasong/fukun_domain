import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SOURCES_FILE = resolve(ROOT, "news-sources.json");
const HIGHLIGHTS_FILE = resolve(ROOT, "manual-highlights.json");
const OUTPUT_FILE = resolve(ROOT, "news-feed.json");

const MAX_POOL_PER_REGION = 150;

// ── Category classification ──────────────────────────────────────────────────
const CATEGORY_RULES = {
  tools: ["tool", "product", "platform", "release", "launch", "feature", "plugin", "copilot", "assistant", "app", "software", "solution"],
  skills: ["guide", "how to", "tutorial", "workflow", "prompt", "best practice", "playbook", "tip", "learn", "training"],
  articles: ["analysis", "opinion", "research", "paper", "essay", "report", "insight", "review", "study", "survey", "benchmark"],
  updates: ["update", "funding", "policy", "regulation", "acquisition", "partnership", "announcement", "raises", "launches", "hires", "appoints"]
};

// ── Topic taxonomy — drives per-item topic tags ──────────────────────────────
const TOPIC_TAXONOMY = {
  "legal-tech": [
    "legal ai", "legal tech", "legaltech", "law firm", "e-discovery", "ediscovery",
    "legal ops", "legal operations", "clm", "contract lifecycle", "contract management",
    "regtech", "compliance tech", "court tech", "judicial", "lawyer ai", "attorney ai",
    "legal software", "legal automation", "legal research", "smart contract",
    "online dispute", "odr", "legal analytics", "law practice", "law review",
    "bar association", "paralegal ai", "legal document", "legal workflow"
  ],
  "ai": [
    "artificial intelligence", "machine learning", "llm", "large language model",
    "gpt", "claude", "gemini", "chatgpt", "neural network", "deep learning",
    "generative ai", "genai", "foundation model", "ai agent", "rag", "fine-tuning",
    "transformer", "diffusion model", "multimodal", "ai model", "ai system",
    "openai", "anthropic", "google deepmind", "mistral", "hugging face",
    "ai assistant", "copilot", "ai tool", "ai platform", "ai startup"
  ],
  "tech": [
    "software", "saas", "platform", "api", "cloud", "open source", "startup",
    "developer", "devops", "engineering", "infrastructure", "database", "kubernetes",
    "microservice", "cybersecurity", "security breach", "data breach", "vulnerability",
    "programming", "framework", "sdk", "tech company", "venture", "series a",
    "series b", "ipo", "silicon valley", "big tech"
  ],
  "compliance": [
    "gdpr", "eu ai act", "ai act", "ccpa", "dsa", "dma", "digital services act",
    "digital markets act", "data protection regulation", "privacy regulation",
    "ai regulation", "ai governance", "algorithmic accountability", "algorithmic transparency",
    "regtech", "regulatory technology", "kyc", "aml", "anti-money laundering",
    "sox", "hipaa", "pci dss", "financial regulation", "prudential regulation",
    "sec enforcement", "data breach notification", "cybersecurity regulation",
    "legal compliance", "compliance technology", "data governance framework"
  ],
  "fintech": [
    "fintech", "banking", "payment", "blockchain", "crypto", "defi",
    "digital asset", "financial technology", "insurtech", "wealthtech",
    "neobank", "digital bank", "robo-advisor", "embedded finance"
  ]
};

// ── Negative filters — items matching these are heavily penalized ─────────────
const NEGATIVE_TERMS = [
  "sports", "soccer", "football", "basketball", "nba", "nfl", "cricket",
  "celebrity", "entertainment", "box office", "box-office", "album",
  "fashion", "lifestyle", "recipe", "cooking", "restaurant", "travel",
  "horoscope", "zodiac", "dating", "relationship advice",
  "movie", "tv show", "streaming series", "netflix original",
  "gaming", "video game", "esports" // keep esports out unless it has tech relevance
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

function detectTopics(title, summary) {
  const text = `${title} ${summary}`.toLowerCase();
  const matched = [];
  for (const [topic, terms] of Object.entries(TOPIC_TAXONOMY)) {
    if (terms.some((t) => text.includes(t))) matched.push(topic);
  }
  return matched;
}

function hasNegativeMatch(title, summary) {
  const text = `${title} ${summary}`.toLowerCase();
  return NEGATIVE_TERMS.some((t) => text.includes(t));
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

      const topics = detectTopics(title, summary);
      const score = scoreItem(title, summary, source.priority || 1, publishedAt, source.tags || [], topics);

      // Drop clearly off-topic content from broad sources
      if (hasNegativeMatch(title, summary)) return null;

      return {
        id: `${source.name}:${normalizeKey(url)}`,
        title,
        url,
        source: source.name,
        sourceTags: source.tags || [],
        publishedAt,
        summary: summary.slice(0, 260),
        category: classify(title, summary),
        topics,
        region: source.region,
        score
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

function scoreItem(title, summary, priority, publishedAt, sourceTags, topics) {
  // Base: source priority (0–10 range)
  let score = priority * 1.5;

  // Topic boost: legal-tech and ai get extra weight
  if (topics.includes("legal-tech")) score += 6;
  if (topics.includes("ai")) score += 4;
  if (topics.includes("compliance")) score += 3;
  if (topics.includes("tech")) score += 1;
  if (topics.includes("fintech")) score += 2;

  // Source tag boost
  if (sourceTags.includes("legal-tech")) score += 3;
  if (sourceTags.includes("ai")) score += 2;

  // Recency boost: exponential decay over 48h, max +5
  if (publishedAt) {
    const hours = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60);
    score += Math.max(0, (1 - hours / 48)) * 5;
  }

  return Math.round(score * 10) / 10;
}

async function fetchWithTimeout(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "news-radar/2.0 (+https://fukun.ca)" }
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
      console.log(`✓ ${source.name}: ${parsed.length} items`);
    } catch (err) {
      console.warn(`✗ ${source.name}: ${err.message}`);
    }
  }

  const deduped = dedupe(all);
  const byRegion = {
    na: deduped.filter((i) => i.region === "na"),
    cn: deduped.filter((i) => i.region === "cn"),
    eu: deduped.filter((i) => i.region === "eu")
  };

  for (const region of ["na", "cn", "eu"]) {
    byRegion[region].sort((a, b) => {
      // Primary: score descending
      if (b.score !== a.score) return b.score - a.score;
      // Secondary: recency descending
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return db - da;
    });
    // Strip score from output (client re-scores based on user focus)
    byRegion[region] = byRegion[region]
      .slice(0, MAX_POOL_PER_REGION)
      .map(({ score, ...rest }) => rest);
  }

  // Collect available topic tags for client-side UI
  const allItems = [...byRegion.na, ...byRegion.cn];
  const topicCounts = {};
  for (const item of allItems) {
    for (const t of item.topics || []) {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    topicCounts,
    highlights: {
      na: manual.highlights?.na || [],
      cn: manual.highlights?.cn || []
    },
    panels: byRegion
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`\nWrote ${byRegion.na.length} NA + ${byRegion.eu.length} EU + ${byRegion.cn.length} CN items → ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
