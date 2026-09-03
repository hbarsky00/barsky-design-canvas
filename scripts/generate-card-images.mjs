// Makes the small copies the blog cards actually need.
//
// Blog covers double as case-study heroes, so they are 1500-2880px wide. The
// cards on / and /blog render them at 339px. On 2026-08-31 that meant 22 of the
// 24 images on /blog were oversized by 2.5x or more, the worst an 8.5x — a
// 2880px file drawn into 339px. The originals cannot simply be shrunk; they are
// still the hero on the case study.
//
// So each cover gets a `<stem>-thumb.webp` at 678px (2x the 339px slot), and
// the card components ask for that. Variants are generated for EVERY cover, not
// only the oversized ones, so the derived path is never a 404.
//
// The suffix is `-thumb`, NOT `-card`. `-card` already means something else in
// this repo: the 900px images VideoCaseStudiesSection uses for the homepage
// case-study cards, which render at 514px. The first version of this script
// used `-card` and silently shrank two of those from 900px to 678px. Hence the
// refusal below to overwrite anything that already exists.
//
// LOCAL ONLY. Needs dwebp/cwebp (brew install webp); Netlify does not have them.
// Run it after adding a blog post, and commit what it writes.
import { readFileSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, basename, extname } from "node:path";
import { tmpdir } from "node:os";

const SLOT_WIDTH = 678;
const src = readFileSync("src/data/blogData.ts", "utf8");
const covers = [...new Set([...src.matchAll(/coverImage:\s*"([^"]+)"/g)].map((m) => m[1]))];

let made = 0, skipped = 0, savedBytes = 0;
for (const cover of covers) {
  const abs = join("public", cover);
  if (!existsSync(abs)) { console.log(`  MISSING  ${cover}`); continue; }
  const out = join("public", dirname(cover), `${basename(cover, extname(cover))}-thumb.webp`);
  if (existsSync(out)) { console.log(`  EXISTS   ${out} — refusing to overwrite`); skipped++; continue; }
  const tmp = join(tmpdir(), `thumb-${Date.now()}.png`);
  try {
    execFileSync("dwebp", [abs, "-o", tmp], { stdio: "ignore" });
  } catch {
    // Not a webp — cwebp reads png/jpeg directly.
    try { execFileSync("cwebp", ["-quiet", "-resize", String(SLOT_WIDTH), "0", "-q", "82", abs, "-o", out]); made++; continue; }
    catch { console.log(`  FAILED   ${cover}`); continue; }
  }
  execFileSync("cwebp", ["-quiet", "-resize", String(SLOT_WIDTH), "0", "-q", "82", tmp, "-o", out]);
  savedBytes += statSync(abs).size - statSync(out).size;
  made++;
}
console.log(`  ${made} card variants written, ${skipped} skipped`);
console.log(`  ~${(savedBytes / 1048576).toFixed(1)} MB less per full pass over the blog index`);
