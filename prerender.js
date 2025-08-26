// scripts/prerender.ts
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Try to import TS modules (tsx will transpile on the fly).
// IMPORTANT: use RELATIVE paths, NOT "@/..."
let buildSEO: any = null;
let resolveSeoInput: any = null;
let getAllRoutes: any = null;

async function importUnified() {
  try {
    ({ buildSEO } = await import(path.join(ROOT, "src/utils/seo/seoBuilder.ts")));
  } catch {}
  try {
    const mod = await import(path.join(ROOT, "src/data/seoData.ts"));
    resolveSeoInput = mod.resolveSeoInput;
    getAllRoutes = mod.getAllRoutes;
  } catch {}
}

const FALLBACK = {
  BASE: "https://barskydesign.pro",
  SITE_NAME: "Barsky Design",
  DEFAULT_TITLE: "Hiram Barsky — Product Designer & Gen AI Developer",
  DEFAULT_DESC:
    "Senior Product/UX Designer crafting AI-enhanced, data-driven experiences for fintech, healthcare, and SaaS.",
  DEFAULT_IMAGE:
    "https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp",
  TWITTER_HANDLE: "@barskydesign",
};

const ARTICLE_PREFIXES = ["/project/", "/blog/"];

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));

const isArticleRoute = (r: string) =>
  ARTICLE_PREFIXES.some((p) => r.startsWith(p));

const ensureAbsHttps = (u?: string) => {
  if (!u) return "";
  if (/^https:\/\//i.test(u)) return u;
  const suf = u.startsWith("/") ? u : `/${u}`;
  return `${FALLBACK.BASE}${suf}`;
};

function buildFallbackSEO(route: string) {
  const canonical =
    route === "/" ? `${FALLBACK.BASE}/` : `${FALLBACK.BASE}${route}`;
  const type = isArticleRoute(route) ? "article" : "website";
  return {
    title: route === "/" ? FALLBACK.DEFAULT_TITLE : `${FALLBACK.SITE_NAME} — Product & UX`,
    description: FALLBACK.DEFAULT_DESC,
    canonical,
    robots: "index,follow",
    type,
    image: FALLBACK.DEFAULT_IMAGE,
    imageAlt: "Portrait of Hiram Barsky, Product Designer",
    siteName: FALLBACK.SITE_NAME,
    twitterCard: "summary_large_image",
    twitterSite: FALLBACK.TWITTER_HANDLE,
    publishedTime: type === "article" ? new Date().toISOString() : undefined,
    modifiedTime: type === "article" ? new Date().toISOString() : undefined,
    author: type === "article" ? "Hiram Barsky" : undefined,
  };
}

function normalizeSEO(unified: any | null, route: string) {
  const fb = buildFallbackSEO(route);
  const seo = { ...fb, ...(unified || {}) };
  if (!seo.canonical || !/^https:\/\//.test(seo.canonical)) seo.canonical = fb.canonical;
  if (!seo.title) seo.title = fb.title;
  if (!seo.description) seo.description = fb.description;
  if (!seo.type) seo.type = fb.type;

  seo.image = ensureAbsHttps(seo.image || fb.image);
  if (!seo.imageAlt) seo.imageAlt = fb.imageAlt;
  if (!seo.robots) seo.robots = fb.robots;
  if (!seo.siteName) seo.siteName = fb.siteName;
  if (!seo.twitterCard) seo.twitterCard = fb.twitterCard;
  if (!seo.twitterSite) seo.twitterSite = fb.twitterSite;

  if (seo.type === "article") {
    if (!seo.publishedTime) seo.publishedTime = fb.publishedTime;
    if (!seo.modifiedTime) seo.modifiedTime = fb.modifiedTime;
    if (!seo.author) seo.author = fb.author;
  } else {
    delete seo.publishedTime;
    delete seo.modifiedTime;
    delete seo.author;
  }
  return seo;
}

const injectHead = (tpl: string, head: string) =>
  tpl.replace(/<head[^>]*>[\s\S]*?<\/head>/i, `<head>${head}</head>`);

const headHtml = (seo: any) => `\
<!-- prerender: injected head -->
<title>${esc(seo.title)}</title>
<meta name="description" content="${esc(seo.description)}" />
<link rel="canonical" href="${seo.canonical}" />
<meta name="robots" content="${seo.robots}" />
<meta property="og:type" content="${seo.type}" />
<meta property="og:title" content="${esc(seo.title)}" />
<meta property="og:description" content="${esc(seo.description)}" />
<meta property="og:url" content="${seo.canonical}" />
${seo.siteName ? `<meta property="og:site_name" content="${esc(seo.siteName)}" />` : ""}
${seo.image ? `<meta property="og:image" content="${seo.image}" />` : ""}
${seo.imageAlt ? `<meta property="og:image:alt" content="${esc(seo.imageAlt)}" />` : ""}
<meta name="twitter:card" content="${seo.twitterCard}" />
${seo.twitterSite ? `<meta name="twitter:site" content="${seo.twitterSite}" />` : ""}
<meta name="twitter:title" content="${esc(seo.title)}" />
<meta name="twitter:description" content="${esc(seo.description)}" />
${seo.image ? `<meta name="twitter:image" content="${seo.image}" />` : ""}
${seo.type === "article" && seo.publishedTime ? `<meta property="article:published_time" content="${seo.publishedTime}" />` : ""}
${seo.type === "article" && seo.modifiedTime ? `<meta property="article:modified_time" content="${seo.modifiedTime}" />` : ""}
${seo.type === "article" && seo.author ? `<meta property="article:author" content="${esc(seo.author)}" />` : ""}`;

async function main() {
  // 1) import unified TS modules via tsx
  await importUnified();

  // 2) template
  const templatePath = path.join(DIST, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath} — did 'vite build' run?`);
  }
  const template = fs.readFileSync(templatePath, "utf8");

  // 3) route list (fallback if TS import failed)
  let routes: string[] = ["/"];
  if (typeof getAllRoutes === "function") {
    try {
      routes = await getAllRoutes();
    } catch {}
  } else {
    // minimal safe defaults
    routes = ["/", "/projects", "/blog", "/about", "/contact", "/project/herbalink"];
  }

  const urls: { url: string; lastmod: string }[] = [];

  for (const route of routes) {
    // Try unified data
    let unifiedInput: any = null;
    if (typeof resolveSeoInput === "function") {
      try {
        unifiedInput = await resolveSeoInput(route);
      } catch {}
    }

    let unifiedSEO: any = null;
    if (typeof buildSEO === "function" && unifiedInput) {
      try {
        unifiedSEO = buildSEO(unifiedInput);
      } catch {}
    }

    const seo = normalizeSEO(unifiedSEO, route);
    const html = injectHead(template, headHtml(seo));

    const dir = path.join(DIST, route === "/" ? "" : route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");

    urls.push({
      url: seo.canonical,
      lastmod: seo.modifiedTime || seo.publishedTime || new Date().toISOString(),
    });

    console.log(`✓ prerendered ${route}`);
  }

  // 4) sitemap + robots
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod.slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  const base = urls[0]?.url?.replace(/\/$/, "") || FALLBACK.BASE;
  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`,
    "utf8"
  );

  console.log("✓ sitemap.xml and robots.txt generated");
}

main().catch((err) => {
  console.error("[PRERENDER ERROR]");
  console.error(err?.stack || err);
  process.exit(1);
});
