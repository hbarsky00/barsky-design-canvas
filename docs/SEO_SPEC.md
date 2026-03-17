# SEO Specification

> **Authority**: Complete SEO strategy, implementation, and ongoing optimization for barskydesign.pro.  
> **Goal**: Achieve consistent Google indexing, organic traffic growth, and social sharing fidelity.

---

## 1. Current SEO Architecture

### 1.1 Meta Tag Pipeline

```
UnifiedSEO.tsx (single source of truth)
  ├── Static data: seoData.ts (per-route titles, descriptions, images)
  ├── Dynamic data: seo_meta table (database overrides, highest priority)
  ├── Builder: seoBuilder.ts (normalizes, fills defaults)
  └── Output: <Helmet> renders all meta tags
```

**Rule**: `UnifiedSEO.tsx` is the ONLY component that renders `<title>`, `<meta>`, `<link rel="canonical">`. No other component may create these tags.

### 1.2 Canonical URL Strategy

| Page Type | Canonical URL |
|-----------|--------------|
| Homepage | `https://barskydesign.pro/` (with trailing slash) |
| All other pages | `https://barskydesign.pro/path` (no trailing slash) |
| Redirected pages | Points to final destination |
| Query params | Stripped from canonical |

**Implementation**: `seoBuilder.ts` → `buildSEO()` normalizes all canonicals.

---

## 2. Per-Page SEO Requirements

### 2.1 Every Page MUST Have

| Element | Requirement | Max Length |
|---------|-------------|-----------|
| `<title>` | Unique, keyword-rich, ends with ` — Barsky Design` | 60 chars |
| `<meta name="description">` | Unique, compelling, includes target keyword | 160 chars |
| `<link rel="canonical">` | Absolute URL, normalized | — |
| `<meta property="og:title">` | Same as `<title>` | 60 chars |
| `<meta property="og:description">` | Same as meta description | 160 chars |
| `<meta property="og:image">` | Absolute URL, unique per page | — |
| `<meta property="og:image:alt">` | Descriptive alt text | — |
| `<meta property="og:url">` | Same as canonical | — |
| `<meta property="og:type">` | `website` or `article` | — |
| `<meta name="twitter:card">` | `summary_large_image` | — |
| `<meta name="twitter:image">` | Same as og:image | — |
| Single `<h1>` | Contains primary keyword, matches page intent | — |

### 2.2 Article Pages (Projects + Blog) MUST Also Have

| Element | Requirement |
|---------|-------------|
| `<meta property="article:published_time">` | ISO 8601 date |
| `<meta property="article:modified_time">` | If updated |
| `<meta property="article:author">` | Author name |
| `og:type` set to `article` | Not `website` |

### 2.3 Structured Data (JSON-LD)

Every page includes structured data via `generateStructuredData()`:

| Page Type | Schema Type |
|-----------|-------------|
| Homepage | `Person` + `WebSite` + `Organization` |
| Project pages | `Article` or `CreativeWork` |
| Blog posts | `BlogPosting` |
| Service pages | `Service` or `ProfessionalService` |
| Contact | `ContactPage` |
| Store | `Product` (per item) |

---

## 3. Image SEO

### 3.1 Rules

- **Every image** must have a descriptive `alt` attribute containing relevant keywords
- **Each page** must use its own unique og:image — never share the same image across pages
- **Format**: Prefer WebP, fallback to JPEG
- **OG image dimensions**: 1200×630px (minimum)
- **Sitemap**: Include `<image:image>` entries for primary images

### 3.2 Image Naming

- Use descriptive filenames: `herbalink-desktop-dashboard.webp` (not `img-001.webp`)
- Include project/topic name in the filename

---

## 4. URL Architecture

### 4.1 URL Rules

- **Lowercase only**: No uppercase characters in URLs
- **Hyphens for separators**: Never underscores
- **No trailing slashes** (except homepage `/`)
- **No query parameters** in indexed URLs
- **Descriptive slugs**: `/project/herbalink` not `/project/123`

### 4.2 URL Hierarchy

```
barskydesign.pro/
├── /about
├── /contact
├── /services
├── /store
├── /blog
│   └── /blog/:slug
├── /project
│   └── /project/:projectId
└── /design-services
    ├── /design-services/ux-ui-design
    ├── /design-services/mobile-app-design
    └── /design-services/web-development
```

---

## 5. Indexing Strategy

### 5.1 Prerendering (Critical for SPA)

Since this is a React SPA, Google may not execute JavaScript reliably. Solution:

1. **Build-time prerendering**: `prerender.js` generates static HTML for every known route
2. **Explicit slug lists**: `knownSlugs` and `knownBlogSlugs` — manually maintained (100% reliable)
3. **Server routing**: Netlify serves prerendered HTML → falls back to SPA `index.html`

### 5.2 Sitemap

- Location: `/sitemap.xml`
- **Must include**: Every indexable page with `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
- **Must exclude**: Redirected URLs, admin pages, `__seo-check`
- **Image entries**: Primary image per page in `<image:image>`
- **Update frequency**: On every content change

### 5.3 Robots

- `robots.txt`: Allow all crawlers, point to sitemap
- Per-page: `<meta name="robots" content="index,follow">` (default)
- Noindex: Admin pages, utility routes

### 5.4 Server-Side Redirects

All redirects MUST be 301 (permanent) and handled server-side (Netlify/`_redirects`):

| Pattern | Purpose |
|---------|---------|
| `www` → non-www | Domain normalization |
| Trailing slash → no trailing slash | URL normalization |
| Old routes → new routes | Content migration |
| Duplicate slugs → canonical slug | Deduplication |

**Rule**: Redirected URLs must NOT appear in the sitemap.

---

## 6. Internal Linking Strategy

### 6.1 Hierarchy

```
Homepage
├── links to → /services (hub)
│   └── links to → /design-services/* (spokes)
├── links to → /blog (hub)
│   └── links to → /blog/:slug (posts)
│       └── Related Posts component links to other posts
├── links to → /project/:id (case studies)
└── links to → /contact, /store, /about
```

### 6.2 Rules

- **No orphan pages**: Every page must have at least one internal link pointing to it
- **Hub-and-spoke**: Service hub links to sub-services; blog listing links to posts
- **Related content**: Blog posts show "Related Posts" to cross-link
- **Navigation**: Global header/footer includes links to all major sections
- **Footer**: Includes Store and Services links (ensures crawl coverage)

### 6.3 Link Format

- Always use React Router `<Link>` for internal navigation (no `<a href>`)
- Never use `javascript:void(0)` or `#` as href
- External links: `target="_blank" rel="noopener noreferrer"`

---

## 7. Content SEO Guidelines

### 7.1 Title Tag Formula

| Page Type | Formula | Example |
|-----------|---------|---------|
| Homepage | `{Name} \| {Role} — {Brand}` | `Hiram Barsky \| Lead Product Designer & AI Innovator — Barsky Design` |
| Project | `{Project Name}: {Outcome} — {Brand}` | `HerbaLink: AI-Powered Cannabis Compliance Platform — Barsky Design` |
| Blog | `{Post Title} — {Brand}` | `Design Systems That Get Used — Barsky Design` |
| Service | `{Service} \| {Qualifier} — {Brand}` | `Expert UX/UI Design Services \| User-Centered Product Design — Barsky Design` |
| Static | `{Page Purpose} \| {Qualifier} — {Brand}` | `About Hiram Barsky \| 15+ Years Product Design Leadership — Barsky Design` |

### 7.2 Meta Description Formula

- **Lead with value/outcome** (not "Welcome to..." or "This page is about...")
- **Include primary keyword** naturally within first 100 chars
- **End with CTA or differentiator**
- Example: `Transform your product with expert UX/UI design. From user research to high-fidelity prototypes, I create intuitive experiences that drive results.`

### 7.3 Heading Structure

```html
<h1>Primary keyword + page intent</h1>      <!-- ONE per page -->
  <h2>Major section topic</h2>                <!-- Multiple allowed -->
    <h3>Sub-topic within section</h3>          <!-- As needed -->
```

- Never skip levels (no H1 → H3)
- Never use headings for styling purposes only

---

## 8. Technical SEO

### 8.1 Performance (Core Web Vitals)

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Prerender, optimize hero images, font preload |
| FID/INP | < 100ms | Code splitting, defer non-critical JS |
| CLS | < 0.1 | Set explicit image dimensions, font-display: swap |

### 8.2 Mobile-First

- Responsive viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- All content accessible on mobile — no desktop-only content
- Touch-friendly navigation (44px min targets)

### 8.3 Crawl Budget Optimization

- Clean URL structure (no parameter bloat)
- Server-side redirects (not client-side)
- `seo-handler` edge function serves static HTML to crawlers (no meta-refresh)
- Prerendered pages load instantly for bots

---

## 9. Social Sharing

### 9.1 Open Graph

- Every page has unique `og:image` (1200×630px)
- `og:type`: `website` for static pages, `article` for projects/blog
- `og:site_name`: `Hiram Barsky | Lead UX Designer | Driving Design Strategy`

### 9.2 Twitter Cards

- Card type: `summary_large_image` (all pages)
- `twitter:site`: `@hirambarsky`
- `twitter:creator`: `@hirambarsky`

### 9.3 Validation

Use these tools to verify:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 10. Monitoring & Maintenance

### 10.1 Regular Checks

| Task | Frequency | Tool |
|------|-----------|------|
| Index coverage | Weekly | Google Search Console |
| Core Web Vitals | Monthly | PageSpeed Insights |
| Broken links | Monthly | Manual or crawler |
| Sitemap accuracy | On content change | Manual review |
| Structured data | Monthly | Google Rich Results Test |

### 10.2 SEO Verification

- `/__seo-check` route: Internal SEO verification runner
- `seo-handler` edge function: Serves crawler-friendly HTML
- `seo_meta` table: Database source of truth for per-page SEO

### 10.3 Common Issues to Watch

| Issue | Solution |
|-------|----------|
| "Page with redirect" in GSC | Remove redirected URLs from sitemap |
| Duplicate content | Ensure canonical tags point to single URL |
| Soft 404 | Return proper 404 status for missing content |
| "Discovered – not indexed" | Improve internal linking, submit in GSC |
| JavaScript rendering issues | Verify prerendered HTML has correct meta tags |
| Image not showing in social | Check og:image is absolute URL and accessible |

---

## 11. SEO Data Flow Diagram

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  seoData.ts  │    │  seo_meta    │    │  blogData.ts │
│  (static)    │    │  (database)  │    │  (static)    │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       └──────────┬────────┘───────────────────┘
                  │
           ┌──────▼───────┐
           │ UnifiedSEO   │ ← Single source of truth
           │ buildSEO()   │
           └──────┬───────┘
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    <title>   <meta og:*>  JSON-LD
              <canonical>
```
