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
  // Core Legal Tech - High Weight Terms (3x score)
  "legal ai", "legal technology", "law technology", "legal innovation",
  "law firm technology", "legal automation", "contract ai",
  
  // AI/ML in Law - High Weight
  "genai", "llm", "gpt", "claude", "legal language model",
  "predictive coding", "technology assisted review", "tar",
  "e-discovery", "document review", "legal research ai",
  
  // Compliance & Regulation - High Weight
  "regtech", "compliance automation", "gdpr", "ccpa",
  "regulatory technology", "legal compliance", "risk management",
  
  // Contract Tech - High Weight
  "smart contract", "contract lifecycle management", "clm",
  "electronic signature", "esign", "digital contracting",
  "contract analytics", "ai contract review",
  
  // Legal Practice - Medium Weight
  "legal ops", "legal operations", "matter management",
  "ebilling", "legal project management", "legal analytics",
  "law firm innovation", "alternative legal services",
  
  // Court & Litigation - Medium Weight
  "online dispute resolution", "odr", "virtual court",
  "electronic filing", "ecourt", "litigation technology",
  "case management system", "judicial technology",
  
  // Legal Education & Access - Medium Weight
  "legal tech education", "justice technology", "access to justice",
  "legal aid technology", "pro bono tech",
  
  // Emerging Tech - Medium Weight
  "blockchain law", "smart legal contracts", "dao law",
  "web3 legal", "nft legal", "metaverse law",
  "quantum computing law", "ai ethics", "algorithmic bias",
  
  // General Tech (relevant to legal context) - Low Weight
  "artificial intelligence", "machine learning", "deep learning",
  "natural language processing", "computer vision",
  "robotic process automation", "rpa", "workflow automation",
  "cloud computing", "saas", "api", "microservices",
  "devops", "ci/cd", "containerization", "docker", "kubernetes",
  "cybersecurity", "information security", "data privacy",
  "big data", "analytics", "data science",

  // Chinese Tech Ecosystem (medium weight - for CN sources)
  "ai agent", "ai agent", "大模型", "人工智能", "ai应用", "ai原生",
  "kimi", "通义", "豆包", "deepseek", "qwen", "moonshot",
  "cursor", "claude code", "openclaude", "windsurf", "copilot",
  "llm", "llm应用", "ai编程", "ai开发", "aigc", "生成式ai",
  "ai infra", "ai基础设施", "推理模型", "vla", "多模态",
  "tech startup", "科技创业", "ai startup", "ai startup",
  "chip war", "芯片战", "半导体设备", "算力", "gpu集群",
  "robotaxi", "l4自动驾驶", "端到端自动驾驶", "智能驾驶",
  "developer tool", "开发者工具", "ai coding", "ai代码",
  "cloud native", "kubernetes", "serverless",
  "web3", "blockchain", "crypto",
  "data center", "ai算力", "算力集群"
];

// Negative terms - if any of these appear strongly, reduce score or filter out
const NEGATIVE_TERMS = [
  // Sports
  "super bowl", "world cup", "olympics", "fifa", "nba", "nfl", "mlb", "nhl",
  "premier league", "laliga", "bundesliga", "serie a", "cricket", "tennis",
  "golf", "boxing", "ufc", "mma",
  
  // Entertainment
  "hollywood", "celebrity", "movie", "film", "tv show", "netflix", "disney",
  "grammy", "oscar", "emmy", "tiktok", "instagram", "youtube star",
  
  // General News (unless tech-related)
  "politics", "election", "president", "senate", "congress", "parliament",
  "war", "conflict", "attack", "bomb", "shooting", "murder", "crime",
  
  // Irrelevant Business
  "retail", "fashion", "beauty", "cosmetics", "food", "restaurant", "travel",
  "hotel", "airline", "real estate", "mortgage", "insurance" // unless specifically insurtech
];

function hasStrongNegativeMatch(text) {
  const strongNegatives = [
    "super bowl", "world cup", "olympics", "fifa", "nba", "nfl", "mlb", "nhl",
    "premier league", "laliga", "bundesliga", "serie a", "world series",
    "grammy", "oscar", "emmy", "hollywood movie", "netflix series"
  ];
  
  return strongNegatives.some(term => text.includes(term));
}

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

function getEntryLink(block, baseUrl = "") {
  // Try RSS <link> element (text content between tags)
  const rssLink = getTagText(block, "link");
  if (rssLink) {
    const cleaned = cleanUrl(rssLink.trim(), baseUrl);
    if (cleaned) return cleaned;
  }

  // Try Atom <link href="..."> attribute
  const atomMatch = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  if (atomMatch?.[1]) {
    const cleaned = cleanUrl(atomMatch[1].trim(), baseUrl);
    if (cleaned) return cleaned;
  }

  // Fallback to <guid> if it looks like a URL
  const guid = getTagText(block, "guid");
  if (guid) {
    const cleaned = cleanUrl(guid.trim(), baseUrl);
    if (cleaned) return cleaned;
  }

  return "";
}

function cleanUrl(raw, baseUrl = "") {
  if (!raw) return "";

  // Handle double/triple domain prefixes: "https://a.comhttps://a.com/path"
  // The real URL is the LAST occurrence of "https://" + subsequent path
  // Match everything from the LAST https:// to the end
  const lastProtoIdx = raw.lastIndexOf("https://");
  if (lastProtoIdx >= 0) {
    raw = raw.slice(lastProtoIdx);
  } else {
    const lastHttpIdx = raw.lastIndexOf("http://");
    if (lastHttpIdx >= 0) {
      raw = raw.slice(lastHttpIdx);
    }
  }

  // If still doesn't start with http, try resolving as relative
  if (!/^https?:\/\//i.test(raw)) {
    if (baseUrl) {
      try {
        const base = new URL(baseUrl);
        // Handle root-relative links like "/news/article"
        if (raw.startsWith("/")) {
          return `${base.origin}${raw}`;
        }
        // Handle relative links
        return new URL(raw, base).href;
      } catch {
        return "";
      }
    }
    return "";
  }

  // Validate the URL is well-formed
  try {
    const u = new URL(raw);
    if (!u.hostname || !u.pathname) return "";
    return u.href;
  } catch {
    return "";
  }
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

function parseFeed(xml, source, debug = false) {
  const itemBlocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map((m) => m[0]);
  const entryBlocks = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map((m) => m[0]);
  const blocks = itemBlocks.length > 0 ? itemBlocks : entryBlocks;

  return blocks
    .map((block) => {
      const title = getTagText(block, "title");
      const url = getEntryLink(block, source.url);
      const summary =
        getTagText(block, "description") ||
        getTagText(block, "summary") ||
        getTagText(block, "content");
      const publishedAt = parseDate(block);

      if (!title || !url) {
        if (debug && title) console.warn(`  [${source.name}] Could not extract URL for: "${title.slice(0, 80)}"`);
        return null;
      }

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
  
  const scores = {};
  for (const [category, terms] of Object.entries(CATEGORY_RULES)) {
    let score = 0;
    for (const term of terms) {
      if (containsTerm(text, term)) score++;
    }
    scores[category] = score;
  }
  
  let maxScore = 0;
  let bestCategory = "updates";
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }
  
  return bestCategory;
}

// Define term weights (higher = more important)
const TERM_WEIGHTS = {
  // High weight terms (3x)
  "legal ai": 3, "legal technology": 3, "law technology": 3, "legal innovation": 3,
  "law firm technology": 3, "legal automation": 3, "contract ai": 3,
  "genai": 3, "llm": 3, "gpt": 3, "claude": 3, "legal language model": 3,
  "predictive coding": 3, "technology assisted review": 3, "tar": 3,
  "e-discovery": 3, "document review": 3, "legal research ai": 3,
  "regtech": 3, "compliance automation": 3, "gdpr": 3, "ccpa": 3,
  "regulatory technology": 3, "legal compliance": 3, "risk management": 3,
  "smart contract": 3, "contract lifecycle management": 3, "clm": 3,
  "electronic signature": 3, "esign": 3, "digital contracting": 3,
  "contract analytics": 3, "ai contract review": 3,
  
  // Medium weight terms (2x)
  "legal ops": 2, "legal operations": 2, "matter management": 2,
  "ebilling": 2, "legal project management": 2, "legal analytics": 2,
  "law firm innovation": 2, "alternative legal services": 2,
  "online dispute resolution": 2, "odr": 2, "virtual court": 2,
  "electronic filing": 2, "ecourt": 2, "litigation technology": 2,
  "case management system": 2, "judicial technology": 2,
  "legal tech education": 2, "justice technology": 2, "access to justice": 2,
  "legal aid technology": 2, "pro bono tech": 2,
  "blockchain law": 2, "smart legal contracts": 2, "dao law": 2,
  "web3 legal": 2, "nft legal": 2, "metaverse law": 2,
  "quantum computing law": 2, "ai ethics": 2, "algorithmic bias": 2,
  
  // Low weight terms (1x)
  "artificial intelligence": 1, "machine learning": 1, "deep learning": 1,
  "natural language processing": 1, "computer vision": 1,
  "robotic process automation": 1, "rpa": 1, "workflow automation": 1,
  "cloud computing": 1, "saas": 1, "api": 1, "microservices": 1,
  "devops": 1, "ci/cd": 1, "containerization": 1, "docker": 1, "kubernetes": 1,
  "cybersecurity": 1, "information security": 1, "data privacy": 1,
  "big data": 1, "analytics": 1, "data science": 1,

  // Chinese Tech Ecosystem (2x - relevant for CN sources)
  "ai agent": 2, "大模型": 2, "人工智能": 2, "ai应用": 2, "ai原生": 2,
  "kimi": 2, "通义": 2, "豆包": 2, "deepseek": 2, "qwen": 2, "moonshot": 2,
  "cursor": 2, "claude code": 2, "openclaude": 2, "windsurf": 2, "copilot": 2,
  "llm": 2, "llm应用": 2, "ai编程": 2, "ai开发": 2, "aigc": 2, "生成式ai": 2,
  "ai infra": 2, "ai基础设施": 2, "推理模型": 2, "vla": 2, "多模态": 2,
  "tech startup": 2, "ai startup": 2,
  "chip war": 2, "芯片战": 2, "半导体设备": 2, "算力": 2, "gpu集群": 2,
  "robotaxi": 2, "l4自动驾驶": 2, "端到端自动驾驶": 2, "智能驾驶": 2,
  "developer tool": 2, "开发者工具": 2, "ai coding": 2, "ai开发": 2,
  "cloud native": 2, "serverless": 2,
  "web3": 2, "blockchain": 2, "crypto": 2,
  "data center": 2, "ai算力": 2, "算力集群": 2
};

// Default weight for terms not explicitly listed
const DEFAULT_TERM_WEIGHT = 1;

function getTermWeight(term) {
  return TERM_WEIGHTS[term] || DEFAULT_TERM_WEIGHT;
}

function containsTerm(text, term) {
  if (/[^\x00-\x7F]/.test(term)) {
    return text.includes(term);
  }
  const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  return re.test(text);
}

function matchTerms(text, terms) {
  text = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (containsTerm(text, term)) score++;
  }
  return score;
}

function scoreItem(title, summary, priority, publishedAt) {
  const text = `${title} ${summary}`.toLowerCase();
  
  if (hasStrongNegativeMatch(text)) {
    return -1000;
  }
  
  let relevanceScore = 0;
  for (const term of RELEVANCE_TERMS) {
    if (containsTerm(text, term)) {
      relevanceScore += getTermWeight(term);
    }
  }
  
  let negativePenalty = 0;
  for (const term of NEGATIVE_TERMS) {
    if (containsTerm(text, term)) negativePenalty += 1;
  }
  relevanceScore = Math.max(0, relevanceScore - negativePenalty * 0.5);
  
  let recency = 0;
  if (publishedAt) {
    const hours = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60);
    recency = Math.exp(-hours / 24);
  }
  
  const priorityBoost = priority * 0.5;
  const relevancePoints = relevanceScore > 0 ? Math.log(1 + relevanceScore) * 3.5 : 0;
  
  return priorityBoost + relevancePoints + recency * 2;
}

async function fetchWithTimeout(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "fukun-news-radar/1.0" }
    });
    if (!res.ok) {
      // Provide more detailed error information
      const errorText = await res.text().catch(() => "Unable to read response body");
      throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText.substring(0, 200)}`);
    }
    return await res.text();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw err;
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

// Minimum relevance score threshold (items below this are filtered out)
const MIN_RELEVANCE_SCORE = 1.0;

// Per-source minimum score overrides
// Broad tech AI feeds need stricter thresholds since "gpt", "llm", "ai" alone are too generic
// Thresholds tuned so items need 2+ relevant term matches (or 1 high-weight term + recency) to pass
const SOURCE_MIN_SCORE = {
  "OpenAI News": 10.0,
  "Google AI Blog": 8.0,
  "Microsoft AI Blog": 8.0,
  "36Kr": 9.0,
  "InfoQ China": 7.0,
  "Sixth Tone": 8.0,
  "SCMP China Business": 8.0,
  "The Guardian China": 9.0,
};

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      args[key] = value === undefined ? true : value;
    }
  });
  return args;
}

async function main() {
  const args = parseArgs();
  
  // Configuration with defaults
  const sourcesFile = args['sources-file'] || SOURCES_FILE;
  const highlightsFile = args['highlights-file'] || HIGHLIGHTS_FILE;
  const outputFile = args['output-file'] || OUTPUT_FILE;
  const regionFilter = args['region'] || 'both'; // na, cn, both
  const hoursBack = parseFloat(args['hours-back']) || 72;
  const minScore = parseFloat(args['min-score']) || MIN_RELEVANCE_SCORE;
  const maxItemsPerRegion = parseInt(args['max-items-per-region']) || MAX_POOL_PER_REGION;
  const debug = args['debug'] === 'true';
  
  // Override constants if needed
  const effectiveMaxPoolPerRegion = maxItemsPerRegion;
  
  if (debug) {
    console.log('News Radar Configuration:', {
      sourcesFile,
      highlightsFile,
      outputFile,
      regionFilter,
      hoursBack,
      minScore,
      maxItemsPerRegion
    });
  }

  const sourceConfig = JSON.parse(await readFile(sourcesFile, "utf8"));
  const manual = JSON.parse(await readFile(highlightsFile, "utf8"));
  const enabledSources = (sourceConfig.sources || []).filter((s) => s.enabled !== false);

  const all = [];
  for (const source of enabledSources) {
    try {
      const xml = await fetchWithTimeout(source.url);
      const parsed = parseFeed(xml, source, debug);
      const effectiveMin = SOURCE_MIN_SCORE[source.name] ?? minScore;
      const filtered = parsed.filter(item => item.score >= effectiveMin);
      all.push(...filtered);
      if (debug) {
        console.log(`Fetched ${parsed.length} items from ${source.name}, ${filtered.length} passed (min: ${effectiveMin})`);
      } else {
        console.log(`Fetched ${parsed.length} items from ${source.name}, ${filtered.length} passed`);
      }
    } catch (err) {
      console.warn(`Skipping ${source.name}: ${err.message}`);
    }
  }

  const deduped = dedupe(all);
  const byRegion = {
    na: deduped.filter((i) => i.region === "na"),
    cn: deduped.filter((i) => i.region === "cn"),
    cn_en: deduped.filter((i) => i.region === "cn_en")
  };

  for (const region of ["na", "cn", "cn_en"]) {
    if (regionFilter !== 'both' && regionFilter !== region) {
      byRegion[region] = [];
      continue;
    }
    
    byRegion[region].sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (db !== da) return db - da;
      return b.score - a.score;
    });
    byRegion[region] = byRegion[region].slice(0, effectiveMaxPoolPerRegion).map(({ score, ...rest }) => rest);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    highlights: {
      na: manual.highlights?.na || [],
      cn: manual.highlights?.cn || [],
      cn_en: manual.highlights?.cn_en || []
    },
    panels: byRegion
  };

  await writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outputFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
