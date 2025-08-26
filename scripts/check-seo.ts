// scripts/check-seo.ts
/**
 * Live SEO Validation
 * Fetches your live pages and validates canonical/OG/Twitter/JSON-LD.
 */

const SITE = "https://barskydesign.pro";

// Hard-coded pages for now. (You can switch to sitemap-driven later.)
const pages = [
  "/",
  "/projects",
  "/project/herbalink",
  "/blog",
  "/blog/finding-first-ux-job-guide",
  "/about",
  "/contact",
];

const ARTICLE_PREFIXES = ["/project/", "/blog/"];
const UA = "Mozilla/5.0 (compatible; SEO-Checker/1.0; +https://barskydesign.pro)";
const TIMEOUT_MS = 12000;

type Result = { path: string; ok: boolean; messages: string[] };

function isArticle(path: string) {
  return ARTICLE_PREFIXES.some(p => path.startsWith(p));
}

function normHead(html: string) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return (m?.[1] ?? "").replace(/\s+/g, " ").trim();
}

function mustAbsHttps(u?: string) {
  return !!u && /^https:\/\/[^"']+$/i.test(u);
}

function getAttr(tag: string, attr: string) {
  const m = tag.match(new RegExp(`\\b${attr}\\s*=\\s*["']([^"']+)["']`, "i"));
  return m?.[1] ?? "";
}

async function fetchWithTimeout(url: string) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": UA },
    });
    return res;
  } finally {
    clearTimeout(to);
  }
}

function assertMatch(head: string, re: RegExp, msg: string, out: string[]) {
  if (!re.test(head)) out.push(`❌ ${msg}`);
}

function softMatch(head: string, re: RegExp, msg: string, out: string[]) {
  if (!re.test(head)) out.push(`⚠️  ${msg}`);
}

async function checkPage(path: string): Promise<Result> {
  const messages: string[] = [];
  const url = SITE + path;

  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      messages.push(`❌ HTTP ${res.status}`);
      return { path, ok: false, messages };
    }
    // Fail if redirect went off-domain
    const finalUrl = res.url;
    if (!finalUrl.startsWith(SITE)) {
      messages.push(`❌ redirected off-domain to: ${finalUrl}`);
      return { path, ok: false, messages };
    }

    const html = await res.text();
    const head = normHead(html);
    if (!head) {
      messages.push("❌ <head> not found");
      return { path, ok: false, messages };
    }

    // Canonical
    const canonTag = head.match(/<link[^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
    if (!canonTag) {
      messages.push("❌ canonical link missing");
    } else {
      const href = getAttr(canonTag, "href");
      if (!href) messages.push("❌ canonical has no href");
      else {
        if (!mustAbsHttps(href)) messages.push(`❌ canonical must be absolute HTTPS: ${href}`);
        if (!href.startsWith(SITE)) messages.push(`❌ canonical wrong domain: ${href}`);
        if (path === "/" && !href.endsWith("/")) messages.push(`❌ root canonical should end with '/': ${href}`);
        if (path !== "/" && href.endsWith("/")) messages.push(`❌ non-root canonical should not end with '/': ${href}`);

        // og:url should match canonical exactly (recommended)
        const ogUrlTag = head.match(/<meta[^>]*\bproperty=["']og:url["'][^>]*>/i)?.[0];
        const ogUrl = ogUrlTag ? getAttr(ogUrlTag, "content") : "";
        if (ogUrl && href && ogUrl !== href) {
          messages.push(`⚠️  og:url (${ogUrl}) != canonical (${href})`);
        }
      }
    }

    // Required basics
    assertMatch(head, /<title>[^<]+<\/title>/i, "title tag missing", messages);
    assertMatch(head, /<meta[^>]+name=["']description["'][^>]+>/i, "meta description missing", messages);

    // OG
    assertMatch(head, /<meta[^>]+property=["']og:title["'][^>]+>/i, "og:title missing", messages);
    assertMatch(head, /<meta[^>]+property=["']og:description["'][^>]+>/i, "og:description missing", messages);
    const ogImage = head.match(/<meta[^>]+property=["']og:image["'][^>]+>/i)?.[0];
    if (!ogImage) {
      messages.push("❌ og:image missing");
    } else {
      const src = getAttr(ogImage, "content");
      if (!mustAbsHttps(src)) messages.push(`❌ og:image must be absolute HTTPS: ${src || "(empty)"}`);
    }

    // Twitter
    const twCard = head.match(/<meta[^>]+name=["']twitter:card["'][^>]+>/i)?.[0];
    if (!twCard) messages.push("❌ twitter:card missing");
    else {
      const v = getAttr(twCard, "content");
      if (!/summary_large_image/i.test(v)) messages.push(`⚠️  twitter:card should be 'summary_large_image' (got '${v || "(empty)"}')`);
    }
    const twImage = head.match(/<meta[^>]+name=["']twitter:image["'][^>]+>/i)?.[0];
    if (twImage) {
      const v = getAttr(twImage, "content");
      if (v && !mustAbsHttps(v)) messages.push(`❌ twitter:image must be absolute HTTPS: ${v}`);
    }

    // og:type
    if (isArticle(path)) {
      assertMatch(head, /<meta[^>]+property=["']og:type["'][^>]*content=["']article["']/i, "og:type=article missing", messages);
      softMatch(head, /<meta[^>]+property=["']article:published_time["']/i, "article:published_time missing", messages);
      softMatch(head, /<meta[^>]+property=["']article:author["']/i, "article:author missing", messages);
    } else {
      assertMatch(head, /<meta[^>]+property=["']og:type["'][^>]*content=["']website["']/i, "og:type=website missing", messages);
    }

    // JSON-LD
    const ld = head.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (!ld) {
      messages.push("⚠️  structured data (JSON-LD) missing");
    } else {
      const json = ld[1]?.trim();
      try {
        const obj = JSON.parse(json);
        // Minimal sanity checks
        const type = Array.isArray(obj) ? obj[0]?.["@type"] : obj?.["@type"];
        if (!type) messages.push("⚠️  JSON-LD missing @type");
      } catch (e) {
        messages.push("❌ JSON-LD not valid JSON");
      }
    }
  } catch (e: any) {
    messages.push(`❌ fetch failed: ${e?.message || e}`);
  }

  const ok = messages.every(m => !m.startsWith("❌"));
  return { path, ok, messages };
}

async function main() {
  console.log(`🚀 Checking ${pages.length} pages at ${SITE}...\n`);
  const results: Result[] = [];
  for (const p of pages) {
    const r = await checkPage(p);
    console.log(`\n🔎 ${p}`);
    r.messages.forEach(m => console.log("  " + m));
    if (r.messages.length === 0) console.log("  ✅ all good");
    results.push(r);
  }

  const fails = results.filter(r => !r.ok).length;
  const warns = results.reduce((n, r) => n + r.messages.filter(m => m.startsWith("⚠️")).length, 0);

  console.log(`\n—— Summary ——`);
  console.log(`Pages checked: ${results.length}`);
  console.log(`Failures: ${fails}`);
  console.log(`Warnings: ${warns}`);

  if (fails > 0) process.exit(1);
}

if (import.meta.main) {
  main().catch(err => {
    console.error("💥 SEO check script failed:", err);
    process.exit(1);
  });
}
