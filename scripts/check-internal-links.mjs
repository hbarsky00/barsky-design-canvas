/**
 * Fail the build when the built HTML links somewhere that isn't a real page.
 *
 * Two defects shipped to production and sat there because nothing checked:
 *   - /blog/portfolio-red-flags-no-interviews 404'd while 8 blog posts linked it.
 *   - 9 retired /project/* slugs 301'd to the homepage, absorbing 35 links.
 * Both are trivially detectable from dist/ plus public/_redirects.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
if (!existsSync(DIST)) {
  console.error("check-internal-links: dist/ not found — run the build first.");
  process.exit(1);
}

/** Every path dist/ can actually serve as a page. */
const pages = new Set();
const walkDist = (dir, base = "") => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { walkDist(p, `${base}/${e.name}`); continue; }
    if (e.name === "index.html") pages.add(base === "" ? "/" : base);
  }
};
walkDist(DIST);

/** Redirect sources, so a link to a redirect is reported separately from a 404. */
const redirects = new Map();
const rdPath = "public/_redirects";
if (existsSync(rdPath)) {
  for (const line of readFileSync(rdPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [from, to, code] = t.split(/\s+/);
    if (from?.startsWith("/")) redirects.set(from.replace(/\/$/, "") || "/", { to, code });
  }
}

const matchesRedirect = (href) => {
  if (redirects.has(href)) return redirects.get(href);
  for (const [from, v] of redirects) {
    if (from.endsWith("/*") && href.startsWith(from.slice(0, -1))) return v;
  }
  return null;
};

// Anchors that exist as page sections, not routes.
const IGNORE = /^(#|mailto:|tel:|https?:|\/\/|\/assets\/|\/images\/|\/blog\/.*\.(jpg|png|webp)$)/;

const missing = new Map();
const viaRedirect = new Map();

const walkPages = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { walkPages(p); continue; }
    if (e.name !== "index.html") continue;
    const html = readFileSync(p, "utf8");
    const from = "/" + p.replace(/^dist\/?/, "").replace(/index\.html$/, "").replace(/\/$/, "");
    for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      let href = m[1];
      if (IGNORE.test(href)) continue;
      href = href.split("#")[0].split("?")[0];
      if (!href.startsWith("/")) continue;
      const norm = href.length > 1 ? href.replace(/\/$/, "") : "/";
      if (pages.has(norm)) continue;
      // A 200-serving static file (sitemap.xml, llms.txt) is fine.
      if (existsSync(join(DIST, norm)) && statSync(join(DIST, norm)).isFile()) continue;
      const r = matchesRedirect(norm);
      const bucket = r ? viaRedirect : missing;
      if (!bucket.has(norm)) bucket.set(norm, { pages: new Set(), to: r?.to });
      bucket.get(norm).pages.add(from || "/");
    }
  }
};
walkPages(DIST);

const report = (label, map) => {
  for (const [href, info] of [...map].sort((a, b) => b[1].pages.size - a[1].pages.size)) {
    const to = info.to ? ` -> ${info.to}` : "";
    console.log(`  ${label} ${href}${to}  (linked from ${info.pages.size} page${info.pages.size === 1 ? "" : "s"})`);
  }
};

if (viaRedirect.size) {
  console.log(`🔗 internal links pointing at a redirect (${viaRedirect.size}):`);
  report("↪", viaRedirect);
}

if (missing.size) {
  console.error(`\n❌ internal links to pages that do not exist (${missing.size}):`);
  report("✗", missing);
  console.error("\nEither create the page, add a redirect, or unlink it.");
  process.exit(1);
}

console.log(`🔗 internal links: ${pages.size} pages, no dead links.`);
