import { writeFile, readFile, mkdir, access } from "node:fs/promises";
import { resolve, extname } from "node:path";

const ROOT = resolve(process.cwd());
const OUTPUT_FILE = resolve(ROOT, "instagram-posts.json");
const IMAGES_DIR = resolve(ROOT, "instagram-images");
const IMAGES_PUBLIC = "instagram-images"; // path referenced from the deployed site root

// Behold (https://behold.so) gives an official-API-backed JSON feed for one
// Instagram account and refreshes the access token for us. The fukun_vision
// feed URL is baked in below so the workflow works out of the box; override it
// with a repo Variable / env var named BEHOLD_FEED_URL to point elsewhere.
// (The feed is public and read-only — it only exposes already-public IG posts.)
const DEFAULT_FEED_URL = "https://feeds.behold.so/EVjv9pFfrwunlgORpXBq";
const FEED_URL = (process.env.BEHOLD_FEED_URL || DEFAULT_FEED_URL).trim().replace(/^['"]|['"]$/g, "");

// Instagram photos land in the "Fun" garden, which renders the photography section.
const SECTION = "photography";
const MAX_IMAGES_PER_POST = 10;

function assertEnv() {
  if (!FEED_URL) {
    throw new Error("No Behold feed URL configured (DEFAULT_FEED_URL is empty and BEHOLD_FEED_URL is unset).");
  }
  if (!/^https?:\/\//i.test(FEED_URL) && !FEED_URL.startsWith("data:")) {
    throw new Error(`BEHOLD_FEED_URL does not look like a URL: ${FEED_URL}`);
  }
}

async function fetchFeed() {
  const res = await fetch(FEED_URL, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Behold feed ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

// Behold has shipped a few top-level shapes over time; accept all of them.
function extractPosts(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.posts)) return data.posts;
  if (Array.isArray(data?.feed)) return data.feed;
  return [];
}

// Prefer Behold-hosted sized URLs over a raw mediaUrl (which can be an
// Instagram CDN link that expires). We download whichever we pick, so the photo
// becomes self-hosted and survives Behold's free-tier "recent N" rotation.
function pickImageUrl(node) {
  if (!node) return null;
  const s = node.sizes || {};
  return (
    s.large?.mediaUrl || s.large?.url ||
    s.medium?.mediaUrl || s.medium?.url ||
    s.full?.mediaUrl || s.full?.url ||
    s.small?.mediaUrl || s.small?.url ||
    node.mediaUrl || node.mediaURL || node.media_url ||
    null
  );
}

// Videos: grab a still frame, never the .mp4 (the garden renders <img>).
function pickThumbUrl(node) {
  if (!node) return null;
  return (
    node.thumbnailUrl || node.thumbnailURL || node.thumbnail_url ||
    node.sizes?.large?.mediaUrl || node.sizes?.medium?.mediaUrl ||
    null
  );
}

function mediaType(node) {
  return String(node?.mediaType || node?.media_type || "IMAGE").toUpperCase();
}

function collectImageUrls(post) {
  const urls = [];
  const type = mediaType(post);

  if (type === "CAROUSEL_ALBUM" && Array.isArray(post.children)) {
    for (const child of post.children) {
      const u = mediaType(child) === "VIDEO" ? pickThumbUrl(child) : pickImageUrl(child);
      if (u) urls.push(u);
    }
  } else if (type === "VIDEO") {
    const u = pickThumbUrl(post);
    if (u) urls.push(u);
  } else {
    const u = pickImageUrl(post);
    if (u) urls.push(u);
  }

  return [...new Set(urls)].slice(0, MAX_IMAGES_PER_POST);
}

function firstLine(text, max = 90) {
  const plain = (text || "").replace(/\s+/g, " ").trim();
  if (!plain) return "";
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 1)}…`;
}

// Stable numeric id derived from the Instagram media id (for dedup + React keys).
function stableId(seed) {
  const s = String(seed || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Read previously-synced entries so photos accumulate beyond Behold's recent-N
// window (free tier serves only the latest ~6).
async function readExistingEntries() {
  try {
    const data = JSON.parse(await readFile(OUTPUT_FILE, "utf8"));
    if (Array.isArray(data.entries)) return data.entries;
  } catch {
    // no/invalid existing file — start fresh
  }
  return [];
}

function fileExists(p) {
  return access(p).then(() => true).catch(() => false);
}

function extFromUrl(url, fallback = ".jpg") {
  try {
    const candidate = extname(new URL(url).pathname).split("?")[0].toLowerCase();
    if (candidate && candidate.length <= 5 && /^\.[a-z0-9]+$/.test(candidate)) return candidate;
  } catch {
    // ignore
  }
  return fallback;
}

// Download a remote image into instagram-images/ (idempotent) and return the
// local path. Falls back to the remote URL if the download fails so the photo
// still shows; it gets retried on the next run while still in Behold's window.
async function localizeImage(remoteUrl, igId, index) {
  const ext = extFromUrl(remoteUrl);
  const filename = `${igId}-${index}${ext}`;
  const filepath = resolve(IMAGES_DIR, filename);
  const localPath = `${IMAGES_PUBLIC}/${filename}`;

  if (await fileExists(filepath)) return localPath; // already saved — skip re-download

  try {
    await mkdir(IMAGES_DIR, { recursive: true });
    const res = await fetch(remoteUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(filepath, buf);
    console.log(`  Saved image: ${filename}`);
    return localPath;
  } catch (err) {
    console.warn(`  Image download failed (${filename}): ${err.message}`);
    return remoteUrl;
  }
}

async function buildEntry(post) {
  const igId = String(post.id || post.permalink || post.timestamp);
  const remoteImages = collectImageUrls(post);
  if (remoteImages.length === 0) return null; // nothing we can render

  const images = [];
  for (let i = 0; i < remoteImages.length; i++) {
    images.push(await localizeImage(remoteImages[i], igId, i));
  }

  const caption = post.prunedCaption || post.caption || "";
  const ts = post.timestamp || post.createdAt || post.created_time || "";
  const date = ts ? String(ts).slice(0, 10) : new Date().toISOString().slice(0, 10);

  return {
    id: stableId(igId),
    instagramId: igId,
    title: firstLine(caption) || `Instagram · ${date}`,
    date,
    section: SECTION,
    source: "instagram",
    permalink: post.permalink || null,
    images,
    body: caption || "",
    summary: firstLine(caption, 200),
    tags: null,
    attachments: []
  };
}

async function main() {
  assertEnv();

  // Start from everything we've archived, then upsert the latest window.
  const existing = await readExistingEntries();
  const byId = new Map(existing.map((e) => [String(e.instagramId || e.id), e]));

  const data = await fetchFeed();
  const posts = extractPosts(data);

  let added = 0;
  for (const post of posts) {
    const entry = await buildEntry(post);
    if (!entry) continue;
    if (!byId.has(entry.instagramId)) added += 1;
    byId.set(entry.instagramId, entry); // refresh in-window posts (heals images, updates caption)
  }

  const entries = [...byId.values()].sort((a, b) => new Date(b.date) - new Date(a.date));

  const output = {
    generatedAt: new Date().toISOString(),
    source: "instagram",
    account: data?.profile?.username || data?.username || "fukun_vision",
    entries
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(
    `Instagram sync: ${entries.length} total photos ` +
    `(${added} new this run, ${entries.length - added} carried over from archive).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
