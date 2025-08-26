// scripts/prerender.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSEO } from "../src/utils/seo/seoBuilder.js";
import { resolveSeoInput, getAllRoutes } from "../src/data/seoData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "../dist");

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

// Reuse Vite template, only swap <head>
const injectHead = (tpl, head) =>
  tpl.replace(/<head[^>]*>[\s\S]*?<\/head>/i, `<head>${head}</head>`);

const headHtml = (seo) => `\
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
${seo.imageAlt ? `<meta property="og:image:alt" content="${esc(seo.imageAlt)}" />` : ""}` : ""}
<meta name="twitter:card" content="${seo.twitterCard ?? "summary_large_image"}" />
${seo.twitterSite ? `<meta name="twitter:site" content="${seo.twitterSite}" />` : ""}
<meta name="twitter:title" content="${esc(seo.title)}" />
<meta name="twitter:description" content="${esc(seo.description)}" />
${seo.image ? `<meta name="twitter:image" content="${seo.image}" />` : ""}
${seo.type === "article" && seo.publishedTime ? `<meta property="article:published_time" content="${seo.publishedTime}" />` : ""}
${seo.type === "article" && seo.modifiedTime ? `<meta property="article:modified_time" content="${seo.modifiedTime}" />` : ""}
${seo.type === "article" && seo.author ? `<meta property="article:author" content="${esc(seo.author)}" />` : ""}`;

async function main() {
  const templatePath = path.join(DIST, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath} — did 'vite build' run?`);
  }
  const template = fs.readFileSync(templatePath, "utf8");

  const routes = await getAllRoutes();
  const urls = [];
  let failures = 0;

  for (const route of routes) {
    try {
      const input = await resolveSeoInput(route);
      if (!input) {
        console.error(`❌ No SEO data returned for route: ${route}`);
        failures++;
        continue;
      }
      const seo = buildSEO(input);

      if (!seo.title || !seo.description) {
        console.error(`❌ Incomplete SEO for ${route}:`, seo);
        failures++;
        continue;
      }

      const html = injectHead(template, headHtml(seo));
      const dir = path.join(DIST, route === "/" ? "" : route);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");

      urls.push(seo.canonical);
      console.log(`✓ prerendered ${route}`);
    } catch (err) {
      console.error(`[ERROR] Failed to prerender ${route}:`, err.message || err);
      failures++;
    }
  }

  // sitemap + robots
  if (urls.length) {
    const today = new Date().toISOString().slice(0, 10);
    const base = urls[0]?.replace(/\/$/, "") || "";
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  )
  .join("\n")}
</urlset>`;
    fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf8");
    fs.writeFileSync(
      path.join(DIST, "robots.txt"),
      `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`,
      "utf8"
    );
  }

  if (failures > 0) {
    console.error(`\n⚠️  ${failures} routes failed SEO prerender. Check console output above.`);
    process.exit(1);
  } else {
    console.log("✅ All routes prerendered with SEO.");
  }
}

main().catch((err) => {
  console.error("[PRERENDER ERROR]");
  console.error(err.stack || err);
  process.exit(1);
});
