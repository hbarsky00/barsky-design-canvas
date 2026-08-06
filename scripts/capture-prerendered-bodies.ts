// LOCAL-ONLY. Not part of `npm run build` and never runs in Netlify's CI —
// deliberately, so the production build never depends on a headless browser
// being installable in that container.
//
// Renders every route in a real browser against a local `vite preview`
// server, captures the fully-hydrated body markup, and writes it to
// prerendered-bodies/<slug>.html. scripts/prerender-seo.ts reads those files
// back in during the plain-Node build and splices them into
// dist/<route>.html, so crawlers that don't execute JS (and the
// js-rendering-diff class of checker) see the real page instead of an
// empty <div id="root">.
//
// Re-run this whenever page content changes:
//   npm run build && tsx scripts/capture-prerendered-bodies.ts
//
// Requires the `playwright` devDependency's Chromium: `npx playwright install chromium`.

import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { preview } from "vite";
import { getAllRoutePaths, bodyFilename } from "./seo-routes";

const OUT_DIR = resolve("prerendered-bodies");
mkdirSync(OUT_DIR, { recursive: true });

if (!existsSync(resolve("dist/index.html"))) {
  console.error("[capture-prerendered-bodies] dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

const server = await preview({ preview: { port: 4174, strictPort: true } });
const base = `http://localhost:4174`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Respect prefers-reduced-motion so captured markup doesn't depend on
// mid-animation DOM state (e.g. the hero's day/night timers).
await page.emulateMedia({ reducedMotion: "reduce" });

const routes = getAllRoutePaths();
let written = 0;
const failures: string[] = [];

for (const routePath of routes) {
  try {
    try {
      await page.goto(`${base}${routePath}`, { waitUntil: "networkidle", timeout: 20000 });
    } catch {
      // Some pages (Ring-Rival — WebGL + persistent audio/animation polling)
      // never go fully network-idle, no matter how long you wait — this
      // isn't a slow load, it's ongoing background activity by design.
      // Fall back to "load" (page + initial resources ready, doesn't wait
      // for network silence) plus a longer settle delay for hydration.
      await page.goto(`${base}${routePath}`, { waitUntil: "load", timeout: 20000 });
      await page.waitForTimeout(2000);
    }
    // Let any client-only data fetches / lazy chunks settle beyond networkidle.
    await page.waitForTimeout(500);
    const html = await page.evaluate(() => document.getElementById("root")?.innerHTML ?? "");
    if (!html || html.length < 200) {
      failures.push(`${routePath} (suspiciously short: ${html.length} chars)`);
      continue;
    }
    writeFileSync(resolve(OUT_DIR, bodyFilename(routePath)), html);

    // The page-specific JSON-LD (Organization/Article/BlogPosting/WebPage)
    // is Helmet-managed and lives in <head>, not #root, so it needs a
    // separate capture. Static index.html already ships its own sitewide
    // LocalBusiness/WebSite blocks; this is additive, not a replacement.
    const schemaScript = await page.evaluate(() => {
      const el = document.querySelector('script[type="application/ld+json"][data-rh="true"]');
      return el ? el.outerHTML : null;
    });
    if (schemaScript) {
      writeFileSync(resolve(OUT_DIR, bodyFilename(routePath).replace(/\.html$/, ".schema.html")), schemaScript);
    }

    written++;
  } catch (e) {
    failures.push(`${routePath} (${(e as Error).message})`);
  }
}

await browser.close();
await server.close();

console.log(`[capture-prerendered-bodies] wrote ${written}/${routes.length} bodies to ${OUT_DIR}`);
if (failures.length) {
  console.error(`[capture-prerendered-bodies] FAILED routes:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
