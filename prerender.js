import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSEO } from "./src/utils/seo/seoBuilder.js";
import { resolveSeoInput, getAllRoutes } from "./src/data/seoData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const esc = (s="") => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

const head = (seo) => `\
<title>${esc(seo.title)}</title>
<meta name="description" content="${esc(seo.description)}" />
<link rel="canonical" href="${seo.canonical}" />
<meta name="robots" content="${seo.robots ?? "index,follow"}" />
<meta property="og:type" content="${seo.type}" />
<meta property="og:title" content="${esc(seo.title)}" />
<meta property="og:description" content="${esc(seo.description)}" />
<meta property="og:url" content="${seo.canonical}" />
${seo.siteName ? `<meta property="og:site_name" content="${esc(seo.siteName)}" />` : ""}
${seo.image ? `<meta property="og:image" content="${seo.image}" />
<meta property="og:image:secure_url" content="${seo.image}" />
${seo.imageAlt ? `<meta property="og:image:alt" content="${esc(seo.imageAlt)}" />` : ""}
${seo.imageWidth ? `<meta property="og:image:width" content="${seo.imageWidth}" />` : ""}
${seo.imageHeight ? `<meta property="og:image:height" content="${seo.imageHeight}" />` : ""}` : ""}
<meta name="twitter:card" content="${seo.twitterCard ?? "summary_large_image"}" />
${seo.twitterSite ? `<meta name="twitter:site" content="${seo.twitterSite}" />` : ""}
<meta name="twitter:title" content="${esc(seo.title)}" />
<meta name="twitter:description" content="${esc(seo.description)}" />
${seo.image ? `<meta name="twitter:image" content="${seo.image}" />
${seo.imageAlt ? `<meta name="twitter:image:alt" content="${esc(seo.imageAlt)}" />` : ""}` : ""}
${seo.type === "article" && seo.publishedTime ? `<meta property="article:published_time" content="${seo.publishedTime}" />` : ""}
${seo.type === "article" && seo.modifiedTime ? `<meta property="article:modified_time" content="${seo.modifiedTime}" />` : ""}
${seo.type === "article" && seo.author ? `<meta property="article:author" content="${esc(seo.author)}" />` : ""}`;

const page = (seo) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head(seo)}</head><body></body></html>`;

const write = (route, html) => {
  const dir = path.join(DIST, route === "/" ? "" : route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
};

async function main() {
  const routes = await getAllRoutes();
  const sitemapUrls = [];
  for (const r of routes) {
    const input = await resolveSeoInput(r);
    const seo = buildSEO(input);
    write(r, page(seo));
    sitemapUrls.push(seo.canonical);
    console.log("✓ prerendered", r);
  }
  // sitemap.xml
  const today = new Date().toISOString().slice(0,10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf8");
  // robots.txt
  const base = sitemapUrls[0].replace(/\/$/, "");
  fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`, "utf8");
}
main().catch(err => { console.error(err); process.exit(1); });