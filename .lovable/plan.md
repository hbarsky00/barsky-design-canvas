

## SEO Audit Results: Critical Failures Found

### Root Cause Discovery

**The site is hosted on Lovable**, which does NOT support:
- `_redirects` rules (Netlify-specific — all 40+ redirect rules are dead)
- Build-time `prerender.js` execution (prerendered HTML files never get generated)
- Static file routing for `/project/herbalink/index.html` etc.

This means **every page serves the same generic `index.html` head** to crawlers. React Helmet updates meta tags client-side via JavaScript, but many crawlers (and Google's initial pass) see only the fallback.

---

### Audit Findings

#### CRITICAL (Blocking indexing)

| # | Issue | Impact |
|---|-------|--------|
| 1 | **No prerendering on Lovable hosting** — `prerender.js` never runs, all routes serve identical `<head>` | Every page has the same title/description/canonical to Google |
| 2 | **`_redirects` file is ignored** — www→non-www, trailing slash, old URL redirects all dead | Duplicate content, broken canonical chains |
| 3 | **Google site verification placeholder** — `content="YOUR_VERIFICATION_CODE"` in index.html | Cannot verify site in Search Console |
| 4 | **`seo_meta` table is empty** — returns `[]` for every query | Database SEO overrides never apply |
| 5 | **Client-side sitemap pings fail** — CORS blocks `google.com/ping` and `bing.com/ping` from browser | Wasted network requests, console errors |
| 6 | **Homepage canonical/og:url hardcoded** to `https://barskydesign.pro/` in index.html but published URL is `barsky-design-canvas.lovable.app` | Canonical mismatch if custom domain not configured |

#### HIGH (SEO quality)

| # | Issue | Impact |
|---|-------|--------|
| 7 | **og:site_name inconsistency** — index.html says "Hiram Barsky - UX Designer", seoConstants says "Hiram Barsky \| Lead UX Designer \| Driving Design Strategy" | Mixed branding signals |
| 8 | **Image domain mix** — `barskyux.com`, `barskydesign.pro`, `ctqttomppgkjbjkckise.supabase.co` used interchangeably | Some og:images may 404 |
| 9 | **No structured data in static HTML** — JSON-LD only rendered by React client-side | Crawlers miss rich snippets |
| 10 | **Sitemap lastmod dates stale** — all set to `2026-02-02`, over a month old | Google deprioritizes stale sitemaps |

#### MEDIUM (Spec compliance)

| # | Issue | Details |
|---|-------|---------|
| 11 | Title spec violation — homepage title doesn't end with "— Barsky Design" | SEO_SPEC rule: all titles end with "— Barsky Design" |
| 12 | `/services` in sitemap but SEO_SPEC shows `/design-services` as the hub | Potential duplicate/competing pages |
| 13 | `portfolio-red-flags-no-interviews` and `ai-in-design` blog posts in BLOG_SEO_MAP but missing from sitemap and `_redirects` prerender list | Orphan pages |

---

### Recommended Fix Plan

#### Phase 1: Make SEO work on Lovable hosting (Critical)

1. **Replace prerender.js with an `seo-handler` edge function** that intercepts bot user-agents and serves complete HTML with correct per-page meta tags (title, description, canonical, og:*, twitter:*, JSON-LD). This is the only way to serve unique meta tags per route on Lovable hosting.

2. **Populate the `seo_meta` table** with data from `seoData.ts` — insert rows for all static pages, projects, and blog posts so the edge function has a database to query.

3. **Remove dead infrastructure** — delete `_redirects`, `prerender.js`, `run-seo-check.mjs`, and the client-side sitemap ping code that produces CORS errors.

4. **Fix `index.html`** — remove `YOUR_VERIFICATION_CODE` placeholder, align og:site_name with constants, ensure fallback meta tags are reasonable defaults.

#### Phase 2: Improve SEO signals

5. **Generate sitemap dynamically** via edge function (or update static sitemap with current dates and all pages including missing blog posts).

6. **Standardize all image URLs** to `barskydesign.pro` domain — replace `barskyux.com` and raw Supabase storage URLs.

7. **Align all titles** with the SEO_SPEC formula (ending with "— Barsky Design").

8. **Add Google Search Console verification** — get actual verification code or use DNS verification.

#### Phase 3: Monitoring

9. **Add a `/robots.txt`** route that dynamically points to the correct sitemap URL.

10. **Create a lightweight SEO smoke test** that checks the edge function returns correct meta tags for each route.

---

### Summary

The #1 reason the site isn't reaching anyone: **Lovable hosting serves the same generic HTML head for every route**. Crawlers see identical title/description/canonical on `/`, `/about`, `/project/herbalink`, etc. — Google treats this as duplicate content and deprioritizes indexing. The fix requires an edge function that serves unique, correct meta tags to crawlers per route.

