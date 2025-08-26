import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

// minimal head generator (safe fallback)
function headHtml({ title, description, canonical }) {
  const esc = s => String(s||"").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
  return `
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${canonical}" />
<meta name="twitter:card" content="summary_large_image" />
`.trim();
}

function injectHead(html, head) {
  return html.replace(/<head[^>]*>[\s\S]*?<\/head>/i, `<head>${head}</head>`);
}

function write(route, html) {
  const outDir = path.join(DIST, route === "/" ? "" : route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
}

function readIndex() {
  const p = path.join(DIST, "index.html");
  if (!fs.existsSync(p)) throw new Error(`Template not found: ${p} (did vite build run?)`);
  return fs.readFileSync(p, "utf8");
}

async function main() {
  const template = readIndex();

  // prerender only a few key routes to unblock build
  const routes = ["/", "/projects", "/blog", "/about", "/contact"];
  const base = "https://barskydesign.pro";

  for (const r of routes) {
    const head = headHtml({
      title: "Barsky Design",
      description: "Designing AI-enhanced digital experiences.",
      canonical: `${base}${r === "/" ? "/" : r}`
    });
    const html = injectHead(template, head);
    write(r, html);
    console.log("✓ prerendered", r);
  }

  // minimal sitemap/robots so validator passes
  const today = new Date().toISOString().slice(0,10);
  const urls = routes.map(r => `${base}${r === "/" ? "/" : r}`);
  const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sm, "utf8");
  fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`, "utf8");
}

main().catch(err => {
  console.error("[PRERENDER ERROR]");
  console.error(err.stack || err);
  process.exit(1);
});
