#!/usr/bin/env node
/**
 * House rule, enforced: every image in a case study or a blog post carries a
 * caption that says something the picture alone doesn't.
 *
 * Why this exists as a build step rather than a note in a doc:
 *
 *  - `npm run build` is `vite build`, which does NOT typecheck. Making
 *    `caption` a required field on SimpleCaseStudyImage / BlogPost stops it in
 *    the editor, but nothing would have stopped it reaching production.
 *  - Blog bodies are HTML strings. TypeScript can't see inside them at all,
 *    so an `<img>` pasted into a post is invisible to the compiler.
 *
 * The rule has teeth in three directions:
 *   1. Every case-study image object has a non-empty `caption`.
 *   2. Every blog `<img>` sits inside a `<figure>` with a non-empty
 *      `<figcaption>`, and every post has a `coverCaption`.
 *   3. A caption is never just the alt text repeated. Alt is what a screen
 *      reader says INSTEAD of the image; a caption is what a sighted reader
 *      reads UNDERNEATH it. They are different jobs, and the old
 *      `caption ?? alt` fallback quietly made half the site print one as the
 *      other.
 *
 * Navigational thumbnails (post cards, project cards, related-post strips)
 * are out of scope — their link title is the label. This is about images
 * inside the body of a piece of writing.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);

/* ── shared: strip comments and strings so brace matching is honest ──────── */
/** An apostrophe inside a `//` comment used to open a phantom string literal
 *  and swallow the rest of the file. Mask comments before scanning. */
const maskComments = (s) => {
  let out = '', i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === '"' || c === "'" || c === '`') {
      const q = c; out += c; i++;
      while (i < s.length) {
        if (s[i] === '\\') { out += s[i] + (s[i + 1] ?? ''); i += 2; continue; }
        out += s[i];
        if (s[i] === q) { i++; break; }
        i++;
      }
      continue;
    }
    if (c === '/' && s[i + 1] === '/') {
      while (i < s.length && s[i] !== '\n') { out += ' '; i++; }
      continue;
    }
    if (c === '/' && s[i + 1] === '*') {
      while (i < s.length && !(s[i] === '*' && s[i + 1] === '/')) { out += s[i] === '\n' ? '\n' : ' '; i++; }
      out += '  '; i += 2;
      continue;
    }
    out += c; i++;
  }
  return out;
};

/** Innermost `{ ... }` literals that look like an image: they have src + alt. */
const imageObjects = (src) => {
  const s = maskComments(src);
  const objs = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '{') continue;
    let depth = 0, j = i, inStr = null, esc = false;
    for (; j < s.length; j++) {
      const c = s[j];
      if (esc) { esc = false; continue; }
      if (inStr) { if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
      if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) break; }
    }
    if (depth !== 0) continue;
    const body = s.slice(i, j + 1);
    if (!/\bsrc\s*:/.test(body) || !/\balt\s*:/.test(body)) continue;
    objs.push({ i, j, body, line: s.slice(0, i).split('\n').length });
  }
  return objs.filter((o) => !objs.some((p) => p !== o && p.i > o.i && p.j <= o.j));
};

const strProp = (body, name) => {
  const m = body.match(new RegExp(`\\b${name}\\s*:\\s*(["'])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`));
  return m ? m[2] : null;
};

/* ── 1. case studies ─────────────────────────────────────────────────────── */
const caseStudyFiles = fs
  .readdirSync(path.join(ROOT, 'src/pages'))
  .filter((f) => /CaseStudy\.tsx$/.test(f))
  .map((f) => `src/pages/${f}`)
  .filter((f) => fs.readFileSync(path.join(ROOT, f), 'utf8').includes('SimpleCaseStudyPage'));

let caseImages = 0;
for (const f of caseStudyFiles) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const o of imageObjects(src)) {
    caseImages++;
    const imgSrc = strProp(o.body, 'src') ?? '(unknown src)';
    const caption = strProp(o.body, 'caption');
    const alt = strProp(o.body, 'alt');
    if (!/\bcaption\s*:/.test(o.body)) {
      fail(f, `line ${o.line}: ${imgSrc} has no caption`);
    } else if (!caption || !caption.trim()) {
      fail(f, `line ${o.line}: ${imgSrc} has an empty caption`);
    } else if (alt && caption.trim() === alt.trim()) {
      fail(f, `line ${o.line}: ${imgSrc} repeats its alt text as the caption`);
    }
  }
}

/* ── 2. blog bodies ──────────────────────────────────────────────────────── */
const blogPath = 'src/data/blogData.ts';
const blog = fs.readFileSync(path.join(ROOT, blogPath), 'utf8');
const blogLines = blog.split('\n');

let blogImages = 0;
blogLines.forEach((line, idx) => {
  if (!/<img\s/.test(line)) return;
  blogImages++;
  const n = idx + 1;
  const imgSrc = (line.match(/src="([^"]+)"/) || [])[1] ?? '(unknown src)';
  const alt = (line.match(/alt="([^"]+)"/) || [])[1] ?? '';
  const before = blogLines.slice(Math.max(0, idx - 4), idx).join('\n');
  const after = blogLines.slice(idx + 1, idx + 6).join('\n');
  if (!/<figure[\s>]/.test(before)) {
    fail(blogPath, `line ${n}: ${imgSrc} is not wrapped in a <figure>`);
    return;
  }
  const cap = after.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
  const text = cap ? cap[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
  if (!cap) fail(blogPath, `line ${n}: ${imgSrc} has no <figcaption>`);
  else if (!text) fail(blogPath, `line ${n}: ${imgSrc} has an empty <figcaption>`);
  else if (alt && text === alt.trim()) fail(blogPath, `line ${n}: ${imgSrc} repeats its alt text as the caption`);
  // A bare photo credit is an attribution, not a caption.
  else if (/^photo by /i.test(text)) fail(blogPath, `line ${n}: ${imgSrc} has only a photo credit, not a caption`);
});

/* ── 3. blog cover images ────────────────────────────────────────────────── */
let covers = 0;
blogLines.forEach((line, idx) => {
  const m = line.match(/^\s*coverImage:\s*["'`]([^"'`]+)["'`]/);
  if (!m) return;
  covers++;
  const next = blogLines.slice(idx + 1, idx + 3).join('\n');
  const capM = next.match(/coverCaption:\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1/);
  if (!capM || !capM[2].trim()) fail(blogPath, `line ${idx + 1}: ${m[1]} has no coverCaption`);
});

/* ── report ──────────────────────────────────────────────────────────────── */
if (failures.length) {
  console.error(`\n✗ image captions: ${failures.length} problem(s)\n`);
  failures.forEach((f) => console.error(`  ${f}`));
  console.error(
    '\n  Every image in a case study or blog post needs a caption that says\n' +
    '  something the picture alone does not. Alt text describes the image for\n' +
    '  someone who cannot see it; a caption tells a reader why it is on the page.\n' +
    '  Do not reuse one as the other.\n'
  );
  process.exit(1);
}

console.log(
  `✓ image captions: ${caseImages} case-study images, ${blogImages} blog images, ${covers} covers — all captioned`
);
