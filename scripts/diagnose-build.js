import fs from "node:fs";
import path from "node:path";
const phase = process.argv[2] || "pre";
const must = ["package.json", "netlify.toml", "prerender.js"];
if (phase === "post") must.push("dist/index.html");

console.log(`\n🩺 DIAGNOSE (${phase})`);
console.log("Node:", process.version);
for (const f of must) {
  const ok = fs.existsSync(f);
  console.log(`${ok ? "✓" : "✗"} ${f}`);
}
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  console.log("✓ package.json parsed. build =", pkg.scripts?.build);
} catch (e) {
  console.error("✗ package.json parse failed:", e.message);
  process.exit(1);
}