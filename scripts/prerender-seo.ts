// Runs after `vite build`: generates per-route static HTML files in dist/ with
// proper per-page <title>, description, canonical, and og:*/twitter:* tags.
//
// Why: react-helmet-async only mutates <head> after JS hydration. Search and
// social crawlers that don't execute JS otherwise see one identical untitled
// shell for every URL — the source of duplicate-title/description errors.
//
// What: copy dist/index.html to dist/<route>/index.html with head tags
// rewritten per route. Netlify serves the physical file when present, so no
// per-route redirect rules are needed; the SPA hydrates normally for visitors.
//
// Route inventory comes from scripts/seo-routes.ts — shared with
// generate-sitemap.ts so sitemap URLs and prerendered files always match 1:1.

import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import {
  BASE_URL,
  STATIC_PATHS,
  FEATURED_PROJECTS,
  FEATURED_CASE_STUDIES,
  getBlogEntries,
  getProductEntries,
  bodyFilename,
} from "./seo-routes";
import { STATIC_PAGE_SEO, PROJECT_SEO_MAP, BLOG_IMAGE_MAP, BLOG_SEO_MAP } from "../src/data/seoData";

const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

if (!existsSync(TEMPLATE_PATH)) {
  console.error("[prerender-seo] dist/index.html not found — run vite build first.");
  process.exit(1);
}

const template = readFileSync(TEMPLATE_PATH, "utf8");

const DEFAULT_IMAGE = `${BASE_URL}/images/hiram-barsky-profile.png`;
const SITE_SUFFIX = " — Hiram Barsky";

// Real rendered body content, captured locally by
// scripts/capture-prerendered-bodies.ts (a real browser, never run in CI)
// and checked into git. Splicing it into <div id="root"> here — a plain
// string replace in this Node-only build step — is what turns the raw HTML
// crawlers see from an empty shell into the actual page, with zero headless
// browser dependency in the Netlify build itself.
const BODIES_DIR = resolve("prerendered-bodies");
const ROOT_PLACEHOLDER = '<div id="root"><!--app-html--></div>';
const missingBodies: string[] = [];

function injectBody(html: string, routePath: string): string {
  const bodyPath = resolve(BODIES_DIR, bodyFilename(routePath));
  if (!existsSync(bodyPath)) {
    missingBodies.push(routePath);
    return html;
  }
  const body = readFileSync(bodyPath, "utf8");
  let out = html.replace(ROOT_PLACEHOLDER, `<div id="root">${body}</div>`);

  // Page-specific JSON-LD (Organization/Article/BlogPosting/WebPage),
  // captured separately since it lives in <head>, not #root. Additive to
  // the sitewide LocalBusiness/WebSite blocks already in the template —
  // Google explicitly supports multiple JSON-LD blocks per page.
  const schemaPath = resolve(BODIES_DIR, bodyFilename(routePath).replace(/\.html$/, ".schema.html"));
  if (existsSync(schemaPath)) {
    const schema = readFileSync(schemaPath, "utf8");
    out = out.replace(/<\/head>/i, `  ${schema}\n  </head>`);
  }
  return out;
}

interface RouteSEO {
  path: string;
  title: string;
  description: string;
  image: string;
  type: "website" | "article";
}

const routes: RouteSEO[] = [];
const missing: string[] = [];

// 1) Static pages (homepage keeps dist/index.html as-is)
for (const path of STATIC_PATHS) {
  if (path === "/") continue;
  const seo = STATIC_PAGE_SEO[path];
  if (!seo) {
    missing.push(path);
    continue;
  }
  routes.push({
    path,
    title: seo.title || "",
    description: seo.description || "",
    image: seo.image || DEFAULT_IMAGE,
    type: "website",
  });
}

// 2) Featured project promo pages. Titles are varied from the case-study
// pages (which share SEO data) so the two routes don't emit duplicate titles.
for (const id of FEATURED_PROJECTS) {
  const seo = PROJECT_SEO_MAP[id];
  if (!seo) {
    missing.push(`/project/${id}`);
    continue;
  }
  routes.push({
    path: `/project/${id}`,
    title: seo.title.replace(/Case Study/i, "Product Overview"),
    description: `Product tour: ${seo.description}`,
    image: seo.image,
    type: "article",
  });
}

// 3) Case-study pages
for (const id of FEATURED_CASE_STUDIES) {
  const seo = PROJECT_SEO_MAP[id];
  if (!seo) {
    missing.push(`/case-studies/${id}`);
    continue;
  }
  routes.push({
    path: `/case-studies/${id}`,
    title: seo.title,
    description: seo.description,
    image: seo.image,
    type: "article",
  });
}

// 4) Blog posts — slug/title/excerpt/cover from blogData.ts via seo-routes.
// Cover images are Vite-imported assets, so resolve each source basename to
// its hashed file in dist/assets (e.g. ai-claude-starter-cover-B3xQ.jpg).
const distAssets = readdirSync(resolve(DIST, "assets"));
function resolveAssetUrl(basename: string | null): string | null {
  if (!basename) return null;
  const file = distAssets.find((f) => f.startsWith(`${basename}-`));
  return file ? `${BASE_URL}/assets/${file}` : null;
}

for (const { slug, title, excerpt, coverBasename } of getBlogEntries()) {
  const override = BLOG_SEO_MAP[slug];
  routes.push({
    path: `/blog/${slug}`,
    title: override?.title || `${title}${SITE_SUFFIX}`,
    description: override?.description || excerpt,
    image: BLOG_IMAGE_MAP[slug] || resolveAssetUrl(coverBasename) || DEFAULT_IMAGE,
    type: "article",
  });
}

// 5) Store products — per-product name/description/image, mirroring the
// title/description shaping UnifiedSEO applies at runtime.
for (const { id, name, description, image } of getProductEntries()) {
  const brand = " | Barsky Design Store";
  const maxName = 60 - brand.length;
  const safeName = name.length > maxName ? `${name.slice(0, maxName - 1).trimEnd()}…` : name;
  const safeDesc = description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description;
  routes.push({
    path: `/store/product/${id}`,
    title: `${safeName}${brand}`,
    description: safeDesc,
    image: image || DEFAULT_IMAGE,
    type: "website",
  });
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Head tags carry data-rh="true" so react-helmet-async claims and replaces
// them at hydration (instead of appending duplicates alongside the static set).
const RH = `(?:data-rh=["']true["']\\s+)?`;

function metaNameRe(name: string): RegExp {
  return new RegExp(`<meta\\s+${RH}name=["']${name}["']\\s+content=["'][^"']*["']\\s*\\/?>`, "i");
}

function metaPropRe(prop: string): RegExp {
  return new RegExp(`<meta\\s+${RH}property=["']${prop}["']\\s+content=["'][^"']*["']\\s*\\/?>`, "i");
}

function rewriteHead(html: string, r: RouteSEO): string {
  const url = `${BASE_URL}${r.path}`;
  const t = escapeAttr(r.title);
  const d = escapeAttr(r.description);
  const img = escapeAttr(r.image);

  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);

  out = out.replace(metaNameRe("description"), `<meta data-rh="true" name="description" content="${d}" />`);

  // canonical — replace if present, otherwise inject before </head>
  const canonicalRe = new RegExp(`<link\\s+${RH}rel=["']canonical["']\\s+href=["'][^"']*["']\\s*\\/?>`, "i");
  const canonicalTag = `<link data-rh="true" rel="canonical" href="${url}" />`;
  if (canonicalRe.test(out)) {
    out = out.replace(canonicalRe, canonicalTag);
  } else {
    out = out.replace(/<\/head>/i, `  ${canonicalTag}\n  </head>`);
  }

  // Self-referencing hreflang + x-default. The site is English-only with no
  // regional variants, so there's nothing to build a full hreflang mesh
  // against — this pair just satisfies "declare what you are" hygiene and
  // stops SEO tooling from flagging every URL as an undeclared orphan.
  // Strip any existing hreflang tags first (the template — dist/index.html —
  // already carries its own self-referencing pair) so per-route rewriting
  // doesn't end up with two, one pointing at "/" and one at the real route.
  out = out.replace(new RegExp(`\\s*<link\\s+${RH}rel=["']alternate["']\\s+hreflang=["'][^"']*["']\\s+href=["'][^"']*["']\\s*\\/?>`, "gi"), "");
  out = out.replace(
    /<\/head>/i,
    `  <link data-rh="true" rel="alternate" hreflang="en" href="${url}" />\n` +
    `  <link data-rh="true" rel="alternate" hreflang="x-default" href="${url}" />\n  </head>`,
  );

  const replacements: [RegExp, string][] = [
    [metaPropRe("og:title"), `<meta data-rh="true" property="og:title" content="${t}" />`],
    [metaPropRe("og:description"), `<meta data-rh="true" property="og:description" content="${d}" />`],
    [metaPropRe("og:url"), `<meta data-rh="true" property="og:url" content="${url}" />`],
    [metaPropRe("og:image"), `<meta data-rh="true" property="og:image" content="${img}" />`],
    [metaPropRe("og:type"), `<meta data-rh="true" property="og:type" content="${r.type}" />`],
    [metaNameRe("twitter:title"), `<meta data-rh="true" name="twitter:title" content="${t}" />`],
    [metaNameRe("twitter:description"), `<meta data-rh="true" name="twitter:description" content="${d}" />`],
    [metaNameRe("twitter:image"), `<meta data-rh="true" name="twitter:image" content="${img}" />`],
  ];
  for (const [re, rep] of replacements) out = out.replace(re, rep);

  return out;
}

// Write flat files (dist/about.html, not dist/about/index.html): Netlify
// serves <route>.html at /<route> with a 200, whereas a directory index
// triggers a 301 to the trailing-slash URL and contradicts the canonicals.
let written = 0;
for (const r of routes) {
  const outPath = resolve(DIST, `${r.path.replace(/^\//, "")}.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, injectBody(rewriteHead(template, r), r.path));
  written++;
}

// Homepage keeps its static head as-is (see loop above), but still gets its
// real body spliced into dist/index.html — the file Netlify serves at "/".
writeFileSync(TEMPLATE_PATH, injectBody(template, "/"));
written++;

console.log(`[prerender-seo] wrote ${written} per-route HTML files in dist/`);
if (missing.length) {
  console.error(`[prerender-seo] MISSING SEO DATA for routes: ${missing.join(", ")}`);
  process.exit(1);
}
if (missingBodies.length) {
  console.warn(
    `[prerender-seo] WARNING: no captured body for ${missingBodies.length} route(s), served as empty shell to non-JS crawlers: ${missingBodies.join(", ")}\n` +
    `  Run \`npm run capture-bodies\` locally and commit prerendered-bodies/ to fix.`,
  );
}
