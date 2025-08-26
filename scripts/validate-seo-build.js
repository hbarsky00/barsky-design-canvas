// scripts/validate-seo-build.js
import fs from "node:fs";
import path from "node:path";

const DIST = "dist";
const FAIL = [];
const WARN = [];

function read(p) {
  try { return fs.readFileSync(p, "utf8"); } catch { return ""; }
}

function walkHtml(dir) {
  const out = [];
  (function rec(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) rec(p);
      else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) out.push(p);
    }
  })(dir);
  return out;
}

function betweenHead(html) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : "";
}

function fail(file, msg) { FAIL.push(`❌ ${file}: ${msg}`); }
function warn(file, msg) { WARN.push(`⚠️  ${file}: ${msg}`); }

function isArticleRoute(relUrl) {
  // treat /blog/* and /project/* as articles; adjust if needed
  return /^\/?(blog|project)\//i.test(relUrl.replace(/^\/+/, ""));
}

function ensureAbsHttps(u) { return /^https:\/\/[^"']+/.test(u); }

function findMeta(head, nameOrProp, value) {
  const re = new RegExp(
    `<meta\\s+[^>]*\\b(?:${nameOrProp})\\s*=\\s*["']\\s*${value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*["'][^>]*>`,
    "i"
  );
  return head.match(re);
}

function getAttr(tag, attr) {
  const m = tag.match(new RegExp(`\\b${attr}\\s*=\\s*["']([^"']+)["']`, "i"));
  return m ? m[1] : "";
}

function validateHtmlFile(absPath) {
  const rel = "/" + path.relative(DIST, absPath).replace(/\\/g, "/");
  const urlFor = rel.replace(/index\.html$/i, "");
  const html = read(absPath);
  if (!html) { fail(rel, "file unreadable"); return; }

  const head = betweenHead(html);
  if (!head) { fail(rel, "<head> not found"); return; }

  // Canonical
  const canonTag = head.match(/<link[^>]*\brel=["']canonical["'][^>]*>/i);
  if (!canonTag) fail(rel, "canonical missing");
  else {
    const href = getAttr(canonTag[0], "href");
    if (!href) fail(rel, "canonical has no href");
    else {
      if (!/^https?:\/\//.test(href)) fail(rel, "canonical must be absolute URL");
      // Optional: ensure canonical ends with the route path
      // if (!href.endsWith(urlFor)) warn(rel, `canonical href (${href}) does not end with ${urlFor}`);
    }
  }

  // Title & Description
  if (!head.match(/<title>[^<]{10,}<\/title>/i)) fail(rel, "title missing or too short");
  if (!findMeta(head, "name", "description")) fail(rel, "meta description missing");

  // Open Graph basics
  if (!findMeta(head, "property", "og:title")) fail(rel, "og:title missing");
  if (!findMeta(head, "property", "og:description")) fail(rel, "og:description missing");
  const ogImageTag = head.match(/<meta[^>]*\bproperty=["']og:image["'][^>]*>/i);
  if (!ogImageTag) fail(rel, "og:image missing");
  else {
    const src = getAttr(ogImageTag[0], "content");
    if (!src) fail(rel, "og:image has no content");
    else if (!ensureAbsHttps(src)) fail(rel, "og:image must be absolute HTTPS");
  }
  if (!findMeta(head, "property", "og:url")) warn(rel, "og:url missing (recommended)");
  if (!findMeta(head, "property", "og:type")) warn(rel, "og:type missing (website/article)");

  // Twitter
  const twCard = head.match(/<meta[^>]*\bname=["']twitter:card["'][^>]*>/i);
  if (!twCard) fail(rel, "twitter:card missing");
  else {
    const v = getAttr(twCard[0], "content");
    if (!/summary_large_image/i.test(v || "")) warn(rel, "twitter:card should be summary_large_image");
  }
  const twImage = head.match(/<meta[^>]*\bname=["']twitter:image["'][^>]*>/i);
  if (!twImage) warn(rel, "twitter:image missing (recommended)");
  else if (!ensureAbsHttps(getAttr(twImage[0], "content"))) fail(rel, "twitter:image must be absolute HTTPS");

  // Article-specific
  if (isArticleRoute(urlFor)) {
    if (!findMeta(head, "property", "article:published_time")) warn(rel, "article:published_time missing");
    if (!findMeta(head, "property", "article:author")) warn(rel, "article:author missing");
  }

  // JSON-LD presence (optional but nice)
  if (!head.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i)) {
    warn(rel, "JSON-LD structured data not found");
  }
}

function validateSitemapAndRobots() {
  const robots = path.join(DIST, "robots.txt");
  const sitemap = path.join(DIST, "sitemap.xml");
  if (!fs.existsSync(robots)) warn("/", "robots.txt missing");
  if (!fs.existsSync(sitemap)) warn("/", "sitemap.xml missing");
  const sm = read(sitemap);
  if (sm && !sm.match(/<urlset[\s\S]*?<url>/i)) warn("/", "sitemap.xml has no <url> entries");
}

// --- Run ---
if (!fs.existsSync(DIST)) {
  console.error(`❌ ${DIST} not found. Did you run 'vite build'?`);
  process.exit(1);
}

const htmlFiles = walkHtml(DIST);
htmlFiles.forEach(validateHtmlFile);
validateSitemapAndRobots();

if (FAIL.length || WARN.length) {
  if (FAIL.length) {
    console.error("\n✖ FAILURES:");
    for (const f of FAIL) console.error(f);
  }
  if (WARN.length) {
    console.warn("\n• WARNINGS:");
    for (const w of WARN) console.warn(w);
  }
  if (FAIL.length) process.exit(1);
}

console.log("✅ SEO build validated.");
