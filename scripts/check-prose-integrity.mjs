#!/usr/bin/env node
/**
 * Fail the build if a blog post's rendered text does not match what the author
 * wrote in blogData.ts.
 *
 * Why this exists (2026-11-17):
 *
 * `InternalLinkEnhancer` injected internal links by REPLACING a matched
 * keyword with a different phrase. The rule for the keyword "AI" carried
 * `anchorText: 'designing and building products'`, so this shipped live on
 * /blog/the-work-is-deleting-not-generating:
 *
 *     "...the parts designing and building products genuinely couldn't do,
 *      is in the Ring-Rival case study."
 *
 * Hiram wrote "the parts AI genuinely couldn't do". The linker was editing
 * published prose, silently, wherever a one-word keyword landed mid-sentence,
 * and nothing in the build noticed for as long as it had been there.
 *
 * Every other gate in this repo checks structure — links resolve, captions
 * differ from alt text, dates parse. None of them checked that the words on
 * the page are the words in the source. This one does.
 *
 * It compares normalised visible text, so markup changes are fine: wrapping a
 * phrase in an anchor, a span or an emphasis tag passes. Changing, adding or
 * dropping a word does not.
 *
 * To prove it can fail (it has been checked this way, and should be again if
 * it is ever rewritten): change one word inside a `content:` template literal
 * in src/data/blogData.ts without rebuilding the prerendered body, then run
 * this script. It must report that post. A gate nobody has watched fail is
 * not known to work.
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BODIES = join(ROOT, 'prerendered-bodies');

/** Visible text, normalised: tags dropped, entities decoded, spaces collapsed. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Whitespace-free form, used for the actual comparison.
 *
 * Wrapping a phrase in an anchor puts a tag boundary mid-sentence, and
 * stripping tags there leaves a space: `approval chain</a>,` becomes
 * "approval chain ," while the source says "approval chain,". That is correct
 * markup and identical prose, so comparing on spacing produced six false
 * positives the first time this ran.
 *
 * Dropping whitespace entirely removes that whole class of artifact and still
 * catches what this gate is for: a changed, added or dropped WORD moves the
 * character sequence no matter how it is spaced. A pure spacing change is the
 * one thing it will not flag, which is the right trade.
 */
const compact = (s) => s.replace(/\s+/g, '');

/**
 * Pull each post's slug and raw `content` template literal out of blogData.ts.
 * Parsing the source beats importing it: this file is plain Node, the data
 * module imports image assets through Vite's `@/` alias, and the alias does
 * not resolve outside a Vite process.
 */
function postsFromSource() {
  const src = readFileSync(join(ROOT, 'src', 'data', 'blogData.ts'), 'utf8');
  const posts = [];

  // Read a quoted literal (backtick or double quote) starting at `i`, which
  // must be the opening delimiter. Returns the raw inner text and the index
  // just past the closing delimiter.
  function readLiteral(i) {
    const quote = src[i];
    let out = '';
    let j = i + 1;
    while (j < src.length) {
      const c = src[j];
      if (c === '\\') { out += src[j + 1]; j += 2; continue; }
      if (c === quote) return { text: out, next: j + 1 };
      out += c;
      j += 1;
    }
    return { text: out, next: j };
  }

  const keyRe = /slug:\s*"([^"]+)",\s*\n\s*content:\s*/g;
  let m;
  while ((m = keyRe.exec(src))) {
    const slug = m[1];
    let i = keyRe.lastIndex;
    const chunks = [];

    if (src[i] === '`' || src[i] === '"') {
      // content: `...`
      chunks.push(readLiteral(i).text);
    } else if (src.startsWith('wrap(', i)) {
      // content: wrap(intro, inlineImage, altText, body)
      //
      // Seven posts use this helper. The first parser matched only a bare
      // template literal, so it skipped all seven and still reported success
      // — a gate covering 42 of 49 while claiming to pass. Only arguments 1
      // and 4 become visible prose; 2 is an image import and 3 is alt text,
      // which lives in an attribute and never appears in body text.
      let j = i + 'wrap('.length;
      let depth = 0;
      let argIndex = 0;
      while (j < src.length) {
        const c = src[j];
        if (c === '(' || c === '[') { depth += 1; j += 1; continue; }
        if (c === ')' && depth === 0) break;
        if (c === ')' || c === ']') { depth -= 1; j += 1; continue; }
        if (c === ',' && depth === 0) { argIndex += 1; j += 1; continue; }
        if (c === '`' || c === '"') {
          const lit = readLiteral(j);
          if (argIndex === 0 || argIndex === 3) chunks.push(lit.text);
          j = lit.next;
          continue;
        }
        j += 1;
      }
    }

    if (chunks.length > 0) posts.push({ slug, content: chunks.join('\n') });
    else posts.push({ slug, content: null });
  }
  return posts;
}

function firstDifference(a, b) {
  const aw = a.split(' ');
  const bw = b.split(' ');
  for (let i = 0; i < Math.max(aw.length, bw.length); i += 1) {
    if (aw[i] !== bw[i]) {
      return {
        at: i,
        source: aw.slice(Math.max(0, i - 6), i + 7).join(' '),
        rendered: bw.slice(Math.max(0, i - 6), i + 7).join(' ')
      };
    }
  }
  return null;
}

const posts = postsFromSource();
if (posts.length === 0) {
  console.error('✗ prose integrity: parsed 0 posts out of blogData.ts — the parser is broken, not the content.');
  process.exit(1);
}

if (!existsSync(BODIES)) {
  console.log('… prose integrity: no prerendered-bodies/ yet, skipping.');
  process.exit(0);
}

const available = new Set(readdirSync(BODIES));
const failures = [];
const unlocatable = [];
const unparsed = [];
let checked = 0;

for (const post of posts) {
  if (post.content === null) { unparsed.push(post.slug); continue; }
  const file = `blog__${post.slug}.html`;
  if (!available.has(file)) continue; // not captured yet; the build reports that separately
  checked += 1;

  const sourceText = visibleText(post.content);
  const renderedAll = visibleText(readFileSync(join(BODIES, file), 'utf8'));
  const sourceC = compact(sourceText);
  const renderedC = compact(renderedAll);

  // The body carries header, breadcrumbs and footer around the article, so
  // containment is the correct test, not equality.
  if (renderedC.includes(sourceC)) continue;

  // Locate the article inside the surrounding chrome. Try a few anchors from
  // the start of the source text, because the very first words may themselves
  // be what got rewritten.
  let start = -1;
  for (const probe of [sourceText.slice(0, 60), sourceText.slice(0, 30), sourceText.slice(0, 16)]) {
    if (probe.length < 8) break;
    start = renderedAll.indexOf(probe);
    if (start >= 0) break;
  }

  if (start < 0) {
    // Could not find the article at all. That is a checker problem, not
    // evidence of mangled prose, and must be reported as its own category
    // rather than inflating the failure count.
    unlocatable.push(post.slug);
    continue;
  }

  const window = renderedAll.slice(start, start + sourceText.length + 600);
  failures.push({ slug: post.slug, diff: firstDifference(sourceText, window) });
}

if (unparsed.length > 0) {
  // A post this script cannot read is a post it is not protecting. Fail
  // loudly rather than reporting success over partial coverage.
  console.error(`\u2717 prose integrity: could not parse content for ${unparsed.length} post(s): ${unparsed.join(', ')}`);
  console.error('  Extend postsFromSource() to handle how their content is written.\n');
  process.exitCode = 1;
}

if (unlocatable.length > 0) {
  console.warn(`… prose integrity: could not locate the article text in ${unlocatable.length} body/bodies — checker limitation, not a content finding:`);
  console.warn('   ' + unlocatable.join(', ') + '\n');
}

if (failures.length > 0) {
  console.error(`✗ prose integrity: ${failures.length} post(s) render text that is not what the source says.\n`);
  for (const f of failures) {
    console.error(`  /blog/${f.slug}`);
    if (f.diff) {
      console.error(`    source  : …${f.diff.source}…`);
      console.error(`    rendered: …${f.diff.rendered}…`);
    }
    console.error('');
  }
  console.error('  Something between blogData.ts and the page is editing the words.');
  console.error('  Check InternalLinkEnhancer first — that is what did it last time.');
  process.exit(1);
}

console.log(`📝 prose integrity: ${checked} post bodies match their source text.`);
