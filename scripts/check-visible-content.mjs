/**
 * Fail the build if any shipped page hides real content at opacity 0.
 *
 * framer-motion's whileInView writes its `initial` state as an inline style.
 * When the prerender capture misses an element — the page is still growing as
 * lazy sections hydrate, so a scroll step can jump past one and its observer
 * never fires — that initial state is serialised into the HTML we ship:
 * `style="opacity: 0; transform: translateY(20px)"`.
 *
 * A visitor never sees it, because React hydrates and plays the animation. A
 * crawler reading the served HTML sees nothing there, and Google discounts
 * content it finds at opacity 0. It shipped three case-study section headings
 * and all three of DAE's result metrics that way, and because the race is
 * nondeterministic it moved around between captures instead of staying put long
 * enough to be noticed.
 *
 * The capture script settles these before writing (settleViewportAnimations).
 * This gate exists because that fix is invisible when it works, and a fix you
 * cannot see fail is a fix you find out about four months later.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
walk(DIST);

// Inline opacity 0 AND an inline translate: framer-motion's unfired `initial`.
// Anything deliberately invisible here (the wipe overlay) is aria-hidden, and a
// decorative element with no translate never matches in the first place.
const STUCK = /<[a-z0-9]+\b[^>]*\bstyle="[^"]*\bopacity:\s*0\s*;[^"]*\btransform:\s*[^";]*translate[^"]*"[^>]*>/gi;

const offenders = [];
for (const file of htmlFiles) {
  if (!statSync(file).isFile()) continue;
  const html = readFileSync(file, "utf8");
  const hits = (html.match(STUCK) || []).filter((tag) => !/aria-hidden=["']true/i.test(tag));
  if (hits.length) offenders.push([relative(DIST, file), hits.length]);
}

if (offenders.length) {
  const total = offenders.reduce((n, [, c]) => n + c, 0);
  console.error(`\n❌ ${total} element(s) shipped at opacity 0 on ${offenders.length} page(s):\n`);
  for (const [page, count] of offenders) console.error(`   ${page}  —  ${count}`);
  console.error(
    "\n   These are whileInView animations the prerender capture froze before they fired.\n" +
      "   Re-run `npm run capture-bodies`; settleViewportAnimations should clear them.\n"
  );
  process.exit(1);
}

console.log(`👁  visible content: ${htmlFiles.length} pages, nothing shipped at opacity 0.`);
