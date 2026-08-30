/**
 * Inline above-the-fold CSS into every prerendered page and load the rest async.
 *
 * Lighthouse measured first paint on /project/herbalink at 4.2 s against only
 * 656 ms of TTFB. The gap is round trips: the browser had to fetch the HTML,
 * discover a stylesheet link, then fetch 30 KB of CSS before it could paint
 * anything. That stylesheet is render-blocking by definition.
 *
 * Beasties walks each page's actual DOM, keeps only the rules that page uses
 * above the fold, inlines those, and rewrites the <link> to load
 * asynchronously with a <noscript> fallback. The full stylesheet is left in
 * place (pruneSource: false) so nothing that appears later is missing.
 *
 * Runs AFTER inject-seo-html, because it needs the final per-route HTML —
 * critical CSS for a case study is not critical CSS for the homepage.
 */
import Beasties from "beasties";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

// NOTE: .nvmrc pins Node 18.18.0 for Netlify. `globSync` was not exported from
// node:fs until Node 22, so importing it here threw at module load on the build
// server — postbuild failed, the build failed, and nothing deployed for several
// commits while local builds on Node 22 kept passing. It was never even used.
// Keep this file to Node 18 APIs.

const DIST = resolve("dist");
const files = execSync(`find ${DIST} -name "*.html" -not -path "*/assets/*"`, { encoding: "utf8" })
  .split("\n").filter(Boolean);

const beasties = new Beasties({
  path: DIST,
  publicPath: "/",
  preload: "swap",        // media="print" onload swap + <noscript> fallback
  pruneSource: false,     // keep the full stylesheet intact
  reduceInlineStyles: false,
  logLevel: "silent",
  fonts: false,           // fonts are self-hosted and already preloaded
});

let ok = 0, skipped = 0, totalInlined = 0;
for (const f of files) {
  const before = readFileSync(f, "utf8");
  try {
    const after = await beasties.process(before);
    // Guard: never write a result that lost the app shell or gained nothing.
    if (!after.includes('id="root"') || after.length < before.length * 0.5) {
      console.warn(`  ! skipped ${f.replace(DIST, "")} — output looked wrong`);
      skipped++; continue;
    }
    const inlined = (after.match(/<style>([\s\S]*?)<\/style>/g) || [])
      .reduce((n, s) => n + s.length, 0);
    totalInlined += inlined;

    // Beasties defers the non-critical stylesheet with
    // onload="this.rel='stylesheet'". That is an inline event handler, and CSP
    // blocks those once script-src drops 'unsafe-inline' — hashes do not apply
    // to handlers, only the 'unsafe-hashes' keyword does. Left in place it
    // silently strands every page on its inlined critical CSS.
    //
    // Strip the handler and let /js/css-swap.js do the promotion instead.
    let out = after.replace(/\s*onload="this\.onload=null;?\s*this\.rel='stylesheet'"/g, "")
                   .replace(/\s*onload="this\.rel='stylesheet'"/g, "");
    if (out.includes('rel="preload"') && !out.includes("/js/css-swap.js")) {
      out = out.replace("</body>", '<script src="/js/css-swap.js" defer></script></body>');
    }
    writeFileSync(f, out);
    ok++;
  } catch (e) {
    console.warn(`  ! ${f.replace(DIST, "")}: ${e.message.slice(0, 60)}`);
    skipped++;
  }
}
console.log(`Critical CSS inlined into ${ok} pages (${skipped} skipped), avg ${Math.round(totalInlined / Math.max(ok,1) / 1024)} KB inline per page`);
