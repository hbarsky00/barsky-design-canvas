// scripts/guard-seo-hardcodes.js
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const APPROVED = new Set([
  path.normalize("prerender.js"),
  path.normalize("src/utils/seo/seoBuilder.ts"),
  path.normalize("src/data/seoData.ts"),
  path.normalize("scripts/validate-seo-build.js"),
  path.normalize("scripts/guard-seo-hardcodes.js"),
  // Add other intentional SEO-handling files here if needed
]);

const SCAN_DIRS = ["src", "app", "components", "public", "" /* project root */];
const IGNORE_DIRS = new Set([
  "node_modules", "dist", "build", ".git", ".cache", ".vite",
  ".netlify", ".vercel", ".parcel-cache", ".turbo", "coverage"
]);

// Multiline-safe regexes
const META_RE = /<meta\s+[^>]*\b(?:name|property)\s*=\s*["']\s*(?:og:[^"']*|twitter:[^"']*|description|robots|article:[^"']*)\s*["'][^>]*>/ims;
const CANON_RE = /<link\s+[^>]*\brel\s*=\s*["']\s*canonical\s*["'][^>]*>/ims;

const offenders = [];

/** Read file safely and return text (limit ~1MB to avoid huge blobs). */
function readFileSafe(file) {
  try {
    const stat = fs.statSync(file);
    if (stat.size > 1_048_576) return ""; // skip >1MB
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(name)) continue;
      walk(path.join(dir, name));
    } else if (/\.(tsx?|jsx?|html?)$/i.test(name)) {
      scan(path.join(dir, name));
    }
  }
}

function snippetAt(text, index) {
  if (index < 0) return "";
  const start = Math.max(0, text.lastIndexOf("\n", index - 1));
  const end = text.indexOf("\n", index);
  const line = text.slice(start + 1, end === -1 ? undefined : end);
  return line.trim().slice(0, 200);
}

function scan(file) {
  const rel = path.relative(ROOT, file);
  if (APPROVED.has(path.normalize(rel))) return;

  const txt = readFileSafe(file);
  if (!txt) return;

  const m1 = txt.match(META_RE);
  if (m1) {
    offenders.push({
      file: rel,
      kind: "meta",
      snippet: snippetAt(txt, m1.index ?? 0)
    });
  }

  const m2 = txt.match(CANON_RE);
  if (m2) {
    offenders.push({
      file: rel,
      kind: "canonical",
      snippet: snippetAt(txt, m2.index ?? 0)
    });
  }
}

// Kick off
for (const base of SCAN_DIRS) {
  const full = path.join(ROOT, base);
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    walk(full);
  } else if (fs.existsSync(full) && /\.html?$/i.test(base)) {
    scan(full);
  }
}

if (offenders.length) {
  const byFile = offenders.reduce((acc, o) => {
    (acc[o.file] ||= []).push(o);
    return acc;
  }, {});

  console.error("\n🚫 Hardcoded SEO detected outside approved files:");
  for (const [file, list] of Object.entries(byFile)) {
    console.error("\n" + file);
    for (const o of list) {
      console.error(`  • ${o.kind}: ${o.snippet}`);
    }
  }
  console.error(`\nTotal issues: ${offenders.length}\n`);
  process.exit(1);
} else {
  console.log("✅ No hardcoded SEO found.");
}
