// Postbuild step: generate per-route static HTML files in dist/ with proper
// per-page <title>, description, canonical, and og:*/twitter:* tags.
//
// Why: react-helmet-async only mutates <head> after JS hydration. Social-preview
// crawlers (LinkedIn, Slack, Facebook, Twitter, Discord, iMessage) and many AI
// crawlers don't execute JS, so they only see the static head shipped in
// dist/index.html. Without this step every shared link previews the homepage.
//
// What: copy dist/index.html into dist/<route>/index.html with head tags
// rewritten per route. Static hosts (Lovable / Cloudflare Pages) serve the
// matching file when present, then fall back to dist/index.html for SPA routes.
// React Router still hydrates and runs the SPA normally for human visitors.

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import {
  STATIC_PAGE_SEO,
  PROJECT_SEO_MAP,
  BLOG_SEO_MAP,
  BLOG_IMAGE_MAP,
} from "../src/data/seoData";

const BASE_URL = "https://barskydesign.pro";
const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

if (!existsSync(TEMPLATE_PATH)) {
  console.warn("[prerender-seo] dist/index.html not found; skipping.");
  process.exit(0);
}

const template = readFileSync(TEMPLATE_PATH, "utf8");

const DEFAULT_IMAGE = `${BASE_URL}/images/hiram-barsky-profile.png`;

interface RouteSEO {
  path: string; // route path like "/blog/foo"
  title: string;
  description: string;
  image: string;
  type: "website" | "article";
}

const routes: RouteSEO[] = [];

// 1) Static pages
for (const [path, seo] of Object.entries(STATIC_PAGE_SEO)) {
  if (path === "/") continue; // homepage uses dist/index.html as-is
  routes.push({
    path,
    title: seo.title || "",
    description: seo.description || "",
    image: seo.image || DEFAULT_IMAGE,
    type: "website",
  });
}

// 2) Projects
for (const [id, seo] of Object.entries(PROJECT_SEO_MAP)) {
  routes.push({
    path: `/project/${id}`,
    title: seo.title,
    description: seo.description,
    image: seo.image,
    type: "article",
  });
}

// 3) Blog posts
for (const [slug, seo] of Object.entries(BLOG_SEO_MAP)) {
  routes.push({
    path: `/blog/${slug}`,
    title: seo.title,
    description: seo.description,
    image: BLOG_IMAGE_MAP[slug] || DEFAULT_IMAGE,
    type: "article",
  });
}

// 4) Products — read ids from productsData.ts
function getProductIds(): string[] {
  const p = resolve("src/data/productsData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  return Array.from(new Set(
    Array.from(txt.matchAll(/^\s*id:\s*["'`]([a-z0-9-]+)["'`]/gim)).map((m) => m[1]),
  ));
}
for (const id of getProductIds()) {
  routes.push({
    path: `/store/product/${id}`,
    title: "Design Resources & Templates — Barsky",
    description: "Professional design resources, wireframe kits, and UX templates. Instant digital downloads.",
    image: `${BASE_URL}/images/macbookpro.png`,
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

function rewriteHead(html: string, r: RouteSEO): string {
  const url = `${BASE_URL}${r.path}`;
  const t = escapeAttr(r.title);
  const d = escapeAttr(r.description);
  const img = escapeAttr(r.image);

  let out = html;

  // <title>
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);

  // description
  out = out.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${d}" />`,
  );

  // canonical — replace if present, otherwise inject before </head>
  if (/<link\s+rel=["']canonical["']/i.test(out)) {
    out = out.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${url}" />`,
    );
  } else {
    out = out.replace(/<\/head>/i, `  <link rel="canonical" href="${url}" />\n  </head>`);
  }

  // og:*
  const ogReplacements: [RegExp, string][] = [
    [/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${t}" />`],
    [/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${d}" />`],
    [/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${url}" />`],
    [/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${img}" />`],
    [/<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:type" content="${r.type}" />`],
  ];
  for (const [re, rep] of ogReplacements) out = out.replace(re, rep);

  // twitter:*
  const twReplacements: [RegExp, string][] = [
    [/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${t}" />`],
    [/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:description" content="${d}" />`],
    [/<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:image" content="${img}" />`],
  ];
  for (const [re, rep] of twReplacements) out = out.replace(re, rep);

  return out;
}

let written = 0;
for (const r of routes) {
  const outPath = resolve(DIST, r.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, rewriteHead(template, r));
  written++;
}

console.log(`[prerender-seo] wrote ${written} per-route HTML files in dist/`);
