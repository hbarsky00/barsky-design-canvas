/**
 * Fail the build if any shipped page hides real content at opacity 0.
 *
 * Two different animations put content at opacity 0 in the prerendered HTML,
 * and only one of them carries a transform:
 *
 *   1. framer-motion's `whileInView` writes its `initial` state as an inline
 *      style. When the capture misses an element — the page is still growing as
 *      lazy sections hydrate, so a scroll step can jump past one and its
 *      observer never fires — that state ships as
 *      `style="opacity: 0; transform: translateY(20px)"`.
 *   2. `SectionHeader` wraps every title and subtitle on the site in
 *      `AnimatedText type="word" animation="typewriter"`, whose hidden state is
 *      `{ opacity: 0 }` and nothing else (see CharacterAnimationVariants.ts — it
 *      was `display: none` until 2026-11-14, changed so the words stay in the
 *      DOM). A word whose observer never fires ships as `style="opacity: 0"`,
 *      with no transform at all.
 *
 * A visitor never sees either, because React hydrates and plays the animation.
 * A crawler reading the served HTML sees nothing there, and Google discounts
 * content it finds at opacity 0. Case (1) shipped three case-study section
 * headings and all three of DAE's result metrics. Case (2) is every section
 * heading and subtitle on the homepage.
 *
 * This gate used to require opacity 0 AND an inline `translate`, which made it
 * blind to case (2) — the site's default and only text animation — and to
 * `transform: scale(...)` and `transform: none` as well. On 2026-11-20 a capture
 * produced 96 such words across the homepage and contact page and this gate
 * passed them. On 2026-11-21 seven were injected into a body deliberately, the
 * full build ran, and the gate still printed "nothing shipped at opacity 0" and
 * exited 0. So the match no longer requires a translate, and `aria-hidden` is
 * the only way to opt out.
 *
 * The capture script settles these before writing (settleViewportAnimations) on
 * the same predicate. This gate exists because that fix is invisible when it
 * works, and a fix you cannot see fail is a fix you find out about four months
 * later. selfTest() is here for the same reason one level up: this gate quietly
 * stopped being able to fail, so it now proves it still can before reporting on
 * anything.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Inline opacity 0, whatever the transform is or whether there is one at all.
// The value has to end at a `;` or the closing quote, so `opacity: 0.5` does
// not read as 0.
const STUCK = /<[a-z0-9]+\b[^>]*\bstyle="[^"]*\bopacity:\s*0(?:\.0+)?\s*(?:;[^"]*)?"[^>]*>/gi;

// Anything deliberately invisible opts out with aria-hidden: it is not content,
// and a crawler is already told to ignore it. React renders a valueless JSX
// `aria-hidden` as `aria-hidden="true"`, but accept the bare attribute too.
// `aria-hidden="false"` is content and must still be caught.
const OPTED_OUT = /\baria-hidden(?:=["']?true["']?)?[\s>]/i;

const stuckTags = (html) => (html.match(STUCK) || []).filter((tag) => !OPTED_OUT.test(tag));

/**
 * Prove the predicate still works before trusting a clean report.
 *
 * Every case here is a shape this repo has actually shipped or deliberately
 * relies on, not an invented one. If a future edit narrows the match again,
 * this fails loudly instead of printing "nothing shipped at opacity 0" over a
 * page full of invisible headings.
 */
function selfTest() {
  const cases = [
    // must be caught
    ['<span class="inline-block" style="opacity: 0">products</span>', 1, "typewriter word — SectionHeader's default"],
    ['<div style="opacity: 0; transform: translateY(20px)">x</div>', 1, "framer whileInView initial"],
    ['<div style="opacity: 0; transform: scale(0.8)">x</div>', 1, "scale rather than translate"],
    ['<section style="opacity: 0; transform: none">x</section>', 1, "transform explicitly none"],
    ['<div style="opacity:0">x</div>', 1, "no space after the colon"],
    ['<div style="will-change: opacity; opacity: 0">x</div>', 1, "opacity named earlier in the style"],
    ['<div aria-hidden="false" style="opacity: 0">x</div>', 1, 'aria-hidden="false" is still content'],
    // must be ignored
    ['<div aria-hidden="true" style="opacity: 0"></div>', 0, 'aria-hidden="true" opt-out'],
    ['<div aria-hidden style="opacity: 0"></div>', 0, "bare aria-hidden opt-out"],
    ['<div style="opacity: 0.22">x</div>', 0, "the wipe overlay mid-animation"],
    ['<div style="opacity: 0.5; transform: translateY(1px)">x</div>', 0, "0.5 must not read as 0"],
    ['<div style="opacity: 1; transform: none">x</div>', 0, "a settled element"],
    ['<div class="opacity-0">x</div>', 0, "a Tailwind class, not an inline style"],
  ];

  const wrong = cases.filter(([html, want]) => stuckTags(html).length !== want);
  if (wrong.length) {
    console.error("\n❌ check-visible-content's own predicate is broken:\n");
    for (const [html, want, why] of wrong) {
      console.error(`   expected ${want ? "a hit" : "no hit"} — ${why}\n     ${html}`);
    }
    console.error("\n   Fix the predicate before trusting this gate's verdict.\n");
    process.exit(1);
  }
  return cases.length;
}

const checks = selfTest();

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

const offenders = [];
for (const file of htmlFiles) {
  if (!statSync(file).isFile()) continue;
  const hits = stuckTags(readFileSync(file, "utf8"));
  if (hits.length) offenders.push([relative(DIST, file), hits.length]);
}

if (offenders.length) {
  const total = offenders.reduce((n, [, c]) => n + c, 0);
  console.error(`\n❌ ${total} element(s) shipped at opacity 0 on ${offenders.length} page(s):\n`);
  for (const [page, count] of offenders) console.error(`   ${page}  —  ${count}`);
  console.error(
    "\n   These are reveal animations the prerender capture froze before they fired —\n" +
      "   framer-motion's whileInView `initial`, or a typewriter word span.\n" +
      "   Re-run `npm run capture-bodies`; settleViewportAnimations should clear them.\n" +
      "   If one is genuinely decorative, give it aria-hidden rather than widening this gate.\n"
  );
  process.exit(1);
}

console.log(
  `👁  visible content: ${htmlFiles.length} pages, nothing shipped at opacity 0 (${checks} self-checks passed).`
);
