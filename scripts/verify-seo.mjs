import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const SITE_URL = process.env.SITE_URL || "https://barskydesign.pro";
const DIST = path.resolve("dist");

function fail(msg){ return { ok:false, msg }; }
function ok(){ return { ok:true }; }

function read(file){
  try{ return fs.readFileSync(file, "utf8"); }
  catch{ return null; }
}

function listDistHtmlFiles(dir){
  const out = [];
  (function walk(d){
    for(const name of fs.readdirSync(d)){
      const full = path.join(d, name);
      const stat = fs.statSync(full);
      if(stat.isDirectory()) walk(full);
      else if(name === "index.html") out.push(full);
    }
  })(dir);
  return out;
}

function extractRouteFromPath(file){
  const rel = path.relative(DIST, path.dirname(file)).replaceAll("\\","/");
  return rel === "" ? "/" : `/${rel}`;
}

function parseMeta(html){
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const q = (sel)=>doc.querySelector(sel);
  const qa = (sel)=>Array.from(doc.querySelectorAll(sel));
  const title = q("title")?.textContent?.trim() || "";
  const desc = q('meta[name="description"]')?.getAttribute("content") || "";
  const canonTags = qa('link[rel="canonical"]');
  const canonical = canonTags[0]?.getAttribute("href") || "";
  const ogTitle = q('meta[property="og:title"]')?.getAttribute("content") || "";
  const ogDesc = q('meta[property="og:description"]')?.getAttribute("content") || "";
  const ogUrl = q('meta[property="og:url"]')?.getAttribute("content") || "";
  const ogImage = q('meta[property="og:image"]')?.getAttribute("content") || "";
  const twTitle = q('meta[name="twitter:title"]')?.getAttribute("content") || "";
  const twDesc = q('meta[name="twitter:description"]')?.getAttribute("content") || "";
  const robotsNoindex = q('meta[name="robots"][content*="noindex" i]') ? true : false;
  return { title, desc, canonical, canonCount: canonTags.length, ogTitle, ogDesc, ogUrl, ogImage, twTitle, twDesc, robotsNoindex };
}

function validate(route, m){
  const issues = [];

  // 1) exactly one canonical
  if(m.canonCount !== 1) issues.push(`canonical count != 1 (${m.canonCount})`);

  // 2) canonical absolute + starts with site url + matches route
  if(!m.canonical || !m.canonical.startsWith(SITE_URL)) issues.push(`canonical not absolute or wrong origin: ${m.canonical}`);
  const expectedCanon = (SITE_URL + route).replace(/(?<!^)\/+$/,""); // strip trailing slash except root
  const canonNorm = m.canonical.replace(/(?<!^)\/+$/,"");
  if(m.canonical && canonNorm !== expectedCanon) issues.push(`canonical path mismatch: got ${m.canonical} expected ${expectedCanon}`);

  // 3) title/description present
  if(!m.title) issues.push("missing <title>");
  if(!m.desc) issues.push('missing <meta name="description">');

  // 4) OG required
  if(!m.ogTitle) issues.push('missing og:title');
  if(!m.ogDesc) issues.push('missing og:description');
  if(!m.ogUrl) issues.push('missing og:url');
  if(!m.ogImage || !/^https?:\/\//.test(m.ogImage)) issues.push('og:image missing or not absolute');

  // 5) twitter optional but recommended
  if(!m.twTitle) issues.push('missing twitter:title');
  if(!m.twDesc) issues.push('missing twitter:description');

  // 6) noindex should not be present
  if(m.robotsNoindex) issues.push('robots noindex present');

  return {
    route,
    seo_tags_verified: issues.length === 0,
    canonical_ok: m.canonCount === 1 && canonNorm === expectedCanon,
    issues
  };
}

function readSitemapUrls(){
  const sm = read(path.join(DIST, "sitemap.xml"));
  if(!sm) return null;
  const locs = Array.from(sm.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m=>m[1]);
  return locs;
}

(function main(){
  if(!fs.existsSync(DIST)){
    console.log(JSON.stringify({ error: "dist_not_found" }));
    return;
  }

  const sitemapUrls = readSitemapUrls();
  const htmlFiles = listDistHtmlFiles(DIST);
  const routes = htmlFiles.map(extractRouteFromPath);

  const results = [];
  for(const file of htmlFiles){
    const route = extractRouteFromPath(file);
    const html = read(file) || "";
    const meta = parseMeta(html);
    results.push(validate(route, meta));
  }

  const summary = {
    static_routes_verified: routes.slice().sort(),
    seo_tags_verified: results.every(r=>r.seo_tags_verified),
    canonical_ok: results.every(r=>r.canonical_ok),
    sitemap_found: !!sitemapUrls,
    robots_txt_valid: !!read(path.join(DIST,"robots.txt")) && /Sitemap:\s*https?:\/\/.+\/sitemap\.xml/i.test(read(path.join(DIST,"robots.txt"))),
    og_images_ok: results.every(r=>!r.issues.find(i=>i.includes("og:image"))),
    issues: results.filter(r=>!r.seo_tags_verified)
  };

  // If sitemap exists, also confirm every sitemap URL exists in dist
  if(sitemapUrls){
    const missing = [];
    for(const url of sitemapUrls){
      const route = url.replace(SITE_URL,"");
      const file = path.join(DIST, route.replace(/^\/+/,""), "index.html");
      if(!fs.existsSync(file)) missing.push(url);
    }
    summary.sitemap_urls_missing_in_dist = missing;
  }

  console.log(JSON.stringify(summary, null, 2));
})();
