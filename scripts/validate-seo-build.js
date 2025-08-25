import fs from "node:fs";
import path from "node:path";
const DIST = "dist";
const ROUTES = ["/", "/projects", "/blog", "/project/herbalink", "/blog/ai-in-design"];

function headFor(route) {
  const f = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
  const html = fs.readFileSync(f, "utf8");
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : "";
}

let bad = false;
for (const r of ROUTES) {
  const h = headFor(r);
  if (!/rel=["']canonical["']/.test(h)) { console.error(`❌ ${r}: canonical missing`); bad = true; }
  if (!/og:image/.test(h)) { console.error(`❌ ${r}: og:image missing`); bad = true; }
  if (!/twitter:card/.test(h)) { console.error(`❌ ${r}: twitter:card missing`); bad = true; }
}
if (bad) process.exit(1);
console.log("✅ SEO build validated.");