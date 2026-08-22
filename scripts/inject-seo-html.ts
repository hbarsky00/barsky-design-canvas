// Runs after `vite build` (postbuild hook). Vite's output is a single bare shell —
// dist/index.html has no <title>, no meta description, no OG tags, no JSON-LD; every
// route returns byte-identical HTML because all of that is injected client-side by
// react-helmet-async in UnifiedSEO.tsx. Any crawler that doesn't execute JavaScript
// (many AI answer-engine bots, link-unfurlers) sees a blank, undifferentiated shell
// no matter which page it hits.
//
// This script writes a real dist/<route>/index.html for every indexable route, with
// the correct <title>/meta/canonical/OG/Twitter/JSON-LD baked in as static HTML —
// matching the per-route rewrites netlify.toml already expects. It intentionally
// does NOT try to prerender the React body (no headless browser dependency); it only
// fixes the head, which is what crawlers, social unfurlers, and answer engines
// actually read on a non-JS fetch. Real browsers still get the full client-rendered
// page and react-helmet-async still runs and can override with live Supabase data.

import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { buildSEO, SEOInput, BuiltSEO } from "../src/utils/seo/seoBuilder";
import { generateStructuredData } from "../src/utils/seo/structuredDataUtils";
import { getStaticPageSEO, getProjectSEO, getBlogSEO } from "../src/data/seoData";
import { SEO_CONSTANTS } from "../src/utils/seoConstants";

const DIST = resolve("dist");

const STATIC_PATHS = [
  "/",
  "/services",
  "/design-services/ux-ui-design",
  "/design-services/mobile-app-design",
  "/design-services/web-development",
  "/about",
  "/contact",
  "/store",
  "/blog",
  "/projects",
];

// Kept in sync with scripts/generate-sitemap.ts's getProjectPaths/getBlogSlugs —
// duplicated rather than imported so this script has no side effects beyond writing
// SEO'd HTML (generate-sitemap.ts's top-level code writes sitemap.xml as a side effect
// of being loaded).
function getProjectPaths(): string[] {
  const appPath = resolve("src/App.tsx");
  const src = existsSync(appPath) ? readFileSync(appPath, "utf8") : "";
  const found = new Set<string>();
  for (const line of src.split("\n")) {
    const m = /<Route\s+path="(\/project\/[a-z0-9-]+)"/i.exec(line);
    if (m && !line.includes("Navigate")) {
      found.add(m[1]);
    }
  }
  // smarterhealth/medication-app/gold2crypto have no matching entry in
  // structuredCaseStudies.ts — soft 404s, kept out of the generated HTML.
  // business-management has real data as of 2026-08-08, so it's not excluded.
  // (Kept in sync with the identical logic in generate-sitemap.ts.)
  return Array.from(found).sort();
}

// Kept in sync with the identical fix in scripts/generate-sitemap.ts.
function getBlogSlugs(): string[] {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  const slugs = Array.from(txt.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)).map((m) => m[1]);
  return Array.from(new Set(slugs)).sort();
}

function seoInputFor(pathname: string): SEOInput {
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    const override = getBlogSEO(slug) || {};
    return {
      path: pathname,
      kind: "post",
      title: override.title ?? `Blog Post: ${slug} — ${SEO_CONSTANTS.SITE_NAME}`,
      description: override.description ?? SEO_CONSTANTS.DEFAULT_DESCRIPTION,
      image: override.image,
      published: override.published,
      modified: override.modified,
    };
  }
  if (pathname.startsWith("/project/")) {
    const projectId = pathname.replace("/project/", "");
    const override = getProjectSEO(projectId);
    if (override) {
      return {
        path: pathname,
        kind: "project",
        title: override.title!,
        description: override.description!,
        image: override.image,
      };
    }
    return {
      path: pathname,
      kind: "project",
      title: `Project: ${projectId} — Hiram Barsky`,
      description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    };
  }
  const staticSeo = getStaticPageSEO(pathname);
  if (staticSeo) {
    return { path: pathname, ...staticSeo } as SEOInput;
  }
  return {
    path: pathname,
    kind: "page",
    title: SEO_CONSTANTS.SITE_NAME,
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHead(seo: BuiltSEO): string {
  const structuredData = generateStructuredData(seo as any);
  const lines = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SEO_CONSTANTS.SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    seo.image ? `<meta property="og:image" content="${seo.image}" />` : "",
    seo.image ? `<meta property="og:image:width" content="1200" />` : "",
    seo.image ? `<meta property="og:image:height" content="630" />` : "",
    `<meta property="og:locale" content="${SEO_CONSTANTS.LOCALE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    seo.twitterSite ? `<meta name="twitter:site" content="${seo.twitterSite}" />` : "",
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    seo.image ? `<meta name="twitter:image" content="${seo.image}" />` : "",
    seo.publishedTime
      ? `<meta property="article:published_time" content="${seo.publishedTime}" />`
      : "",
    seo.modifiedTime
      ? `<meta property="article:modified_time" content="${seo.modifiedTime}" />`
      : "",
    `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
  ];
  return lines.filter(Boolean).join("\n    ");
}

const BODIES = resolve("prerendered-bodies");

/** Mirrors routeToFile() in scripts/capture-prerendered-bodies.ts. */
function bodyFileFor(pathname: string): string {
  const slug =
    pathname === "/" ? "index" : pathname.replace(/^\//, "").replace(/\//g, "__");
  return resolve(BODIES, `${slug}.html`);
}

/**
 * Bake the captured render into #root so hydrateRoot() has something to hydrate
 * and non-JS crawlers get real content. Missing snapshots are not fatal — the
 * route just ships the old empty shell and still works, it's only invisible to
 * crawlers that don't run JavaScript.
 */
function injectBody(html: string, pathname: string): { html: string; had: boolean } {
  const file = bodyFileFor(pathname);
  if (!existsSync(file)) return { html, had: false };

  const body = readFileSync(file, "utf8").trim();
  if (body.length < 500) return { html, had: false };

  // index.html ships an SSR placeholder — <div id="root"><!--app-html--></div>
  // — rather than an empty div. Both forms are handled so this keeps working if
  // the placeholder is ever dropped from the template.
  for (const marker of ['<div id="root"><!--app-html--></div>', '<div id="root"></div>']) {
    if (html.includes(marker)) {
      return { html: html.replace(marker, () => `<div id="root">${body}</div>`), had: true };
    }
  }

  console.warn(`  no #root placeholder found for ${pathname} — body not injected`);
  return { html, had: false };
}

function writeRoute(template: string, pathname: string): boolean {
  const seo = buildSEO(seoInputFor(pathname));
  const head = renderHead(seo);
  const withHead = template.replace("</head>", () => `    ${head}\n  </head>`);
  const { html, had } = injectBody(withHead, pathname);
  const outDir = pathname === "/" ? DIST : resolve(DIST, pathname.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html);
  return had;
}

function main() {
  const templatePath = resolve(DIST, "index.html");
  if (!existsSync(templatePath)) {
    console.error("dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }
  const template = readFileSync(templatePath, "utf8");

  const routes = [
    ...STATIC_PATHS,
    ...getProjectPaths(),
    ...getBlogSlugs().map((slug) => `/blog/${slug}`),
  ];

  let prerendered = 0;
  for (const route of routes) {
    if (writeRoute(template, route)) prerendered++;
  }

  // The SPA catch-all needs a shell with an *empty* root. Without this it would
  // fall back to dist/index.html — which now carries the homepage's prerendered
  // body — so every unmatched URL would serve homepage content, turning 404s
  // into soft 200s just after we finished redirecting the last batch away.
  writeFileSync(resolve(DIST, "spa-shell.html"), template);

  console.log(
    `SEO HTML written for ${routes.length} routes ` +
      `(${prerendered} with prerendered bodies, ${routes.length - prerendered} head-only).`
  );

  if (prerendered === 0) {
    console.warn(
      "No prerendered bodies found. Run `npm run capture-bodies` locally and commit " +
        "prerendered-bodies/ — otherwise hydrateRoot() has an empty container to hydrate."
    );
  }
}

main();
