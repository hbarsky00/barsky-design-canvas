import fs from "node:fs";
import path from "node:path";

const APPROVED = new Set([
  path.normalize("prerender.js"),
  path.normalize("src/utils/seo/seoBuilder.ts"),
  path.normalize("src/data/seoData.ts"),
  path.normalize("scripts/validate-seo-build.js"),
  path.normalize("scripts/guard-seo-hardcodes.js")
]);

const ROOT = process.cwd();
const SRC_DIRS = ["src", "app", "components"];

const META_RE = /<meta\s+[^>]*(name|property)=["'](og:|twitter:|description|robots|article:)[^>]*>/i;
const CANON_RE = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;

const offenders = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|html)$/.test(entry.name)) scan(p);
  }
}
function scan(file) {
  const rel = path.relative(ROOT, file);
  if (APPROVED.has(path.normalize(rel))) return;
  const txt = fs.readFileSync(file, "utf8");
  if (META_RE.test(txt) || CANON_RE.test(txt)) offenders.push(rel);
}

for (const d of SRC_DIRS) {
  const p = path.join(ROOT, d);
  if (fs.existsSync(p)) walk(p);
}

if (offenders.length) {
  console.error("\n🚫 Hardcoded SEO detected outside approved files:\n" + offenders.map(f => "  " + f).join("\n"));
  process.exit(1);
} else {
  console.log("✅ No hardcoded SEO found.");
}