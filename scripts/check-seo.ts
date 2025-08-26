/**
 * SEO Validation Script
 * Checks live site for proper meta tags and canonical URLs
 */

const pages = [
  "/",
  "/projects",
  "/project/herbalink",
  "/blog",
  "/blog/finding-first-ux-job-guide",
  "/about",
  "/contact"
];

const SITE = "https://barskydesign.pro";

async function getHead(path: string): Promise<string> {
  try {
    const response = await fetch(`${SITE}${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0)',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    return head.replace(/\s+/g, " ");
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    throw error;
  }
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertMatch(text: string, pattern: RegExp, message: string): void {
  if (!pattern.test(text)) {
    throw new Error(`Pattern not found: ${message}\nPattern: ${pattern}\nText preview: ${text.substring(0, 200)}...`);
  }
}

async function checkPage(path: string): Promise<void> {
  console.log(`🔍 Checking ${path}...`);
  
  const head = await getHead(path);
  
  // Required meta tags
  assertMatch(head, /<link[^>]+rel=["']canonical["'][^>]+>/i, "canonical link missing");
  assertMatch(head, /<meta[^>]+property=["']og:image["'][^>]+>/i, "og:image missing");
  assertMatch(head, /<meta[^>]+name=["']twitter:card["'][^>]+>/i, "twitter card missing");
  assertMatch(head, /<meta[^>]+name=["']description["'][^>]+>/i, "meta description missing");
  assertMatch(head, /<title>/i, "title tag missing");
  
  // Validate canonical URL format
  const canonicalMatch = head.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (canonicalMatch) {
    const canonicalUrl = canonicalMatch[1];
    assert(canonicalUrl.startsWith('https://barskydesign.pro'), `Invalid canonical domain: ${canonicalUrl}`);
    
    // Check for trailing slash consistency
    if (path === '/') {
      assert(canonicalUrl.endsWith('/'), `Root canonical should end with /: ${canonicalUrl}`);
    } else {
      assert(!canonicalUrl.endsWith('/'), `Non-root canonical should not end with /: ${canonicalUrl}`);
    }
  }
  
  // Article-specific checks
  if (path.startsWith("/project/") || path.startsWith("/blog/")) {
    assertMatch(head, /<meta[^>]+property=["']og:type["'][^>]*content=["']article["']/i, "og:type article missing");
    assertMatch(head, /<meta[^>]+property=["']article:published_time["']/i, "article:published_time missing");
  } else {
    assertMatch(head, /<meta[^>]+property=["']og:type["'][^>]*content=["']website["']/i, "og:type website missing");
  }
  
  // Structured data check
  assertMatch(head, /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i, "structured data missing");
  
  console.log(`✅ ${path} - All checks passed`);
}

async function main(): Promise<void> {
  console.log(`🚀 Starting SEO validation for ${pages.length} pages...`);
  
  for (const page of pages) {
    try {
      await checkPage(page);
    } catch (error) {
      console.error(`❌ ${page} - ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  }
  
  console.log("🎉 All SEO checks passed!");
}

if (import.meta.main) {
  main().catch((error) => {
    console.error('💥 SEO check script failed:', error);
    process.exit(1);
  });
}