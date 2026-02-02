

## Fix "Crawled - Currently Not Indexed" Pages

### Problem Analysis

Google crawled these 8 pages but chose not to index them. Based on my analysis, there are several issues:

| URL | Issue | Last Crawled |
|-----|-------|--------------|
| `/project/investor-loan-app` | 301 redirect to `/` - should NOT be in sitemap | Jun 2025 |
| `/store` | No internal links from navigation | Aug 2025 |
| `/design-services/ux-ui-design` | Not in main nav, weak internal linking | Nov 2025 |
| `/design-services/mobile-app-design` | Not in main nav, weak internal linking | Nov 2025 |
| `/blog/finding-first-ux-job-guide` | Blog post - needs more internal links | Dec 2025 |
| `/blog/ai-enhanced-ux-designer-future` | Blog post - needs more internal links | Nov 2025 |
| `/blog/built-product-without-real-data` | Blog post - needs more internal links | Unknown |
| `/project/dae-search` | Recently fixed, needs reindex | Jan 30, 2026 |

### Root Causes

1. **Orphan pages**: Store and design-services sub-pages have no links from main navigation
2. **Weak internal linking**: Blog posts don't link to each other
3. **Redirect in sitemap**: `/project/investor-loan-app` is already removed but GSC still tracking
4. **Recent fixes not yet recrawled**: Changes made need time to be processed by Google

---

### Implementation Plan

#### Step 1: Add Store and Design Services to Navigation
**File:** `src/components/header/useHeaderNavigation.tsx`

Update the `NAV_LINKS` array:
```typescript
const NAV_LINKS = [
  { name: "Case Studies", href: "#case-studies" },
  { name: "Services", href: "/design-services" },
  { name: "Store", href: "/store" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact Me", href: "/contact" },
];
```

This adds internal links to the orphan pages from every page on the site.

#### Step 2: Add Store and Design Services to Footer
**File:** `src/components/Footer.tsx`

Add links to the Footer navigation:
```tsx
<li>
  <Link to="/design-services">Design Services</Link>
</li>
<li>
  <Link to="/store">Store</Link>
</li>
```

#### Step 3: Add Related Posts Section to Blog Posts
**File:** `src/components/blog/BlogPostContent.tsx` or similar

Add a "Related Articles" section at the bottom of each blog post that links to 2-3 other blog posts. This creates internal linking between blog posts.

#### Step 4: Add Design Services Sub-pages to Parent Page
**File:** `src/pages/DesignServices.tsx` or similar

Ensure the `/design-services` page has clear links to all sub-pages:
- `/design-services/ux-ui-design`
- `/design-services/mobile-app-design`
- `/design-services/web-development`

#### Step 5: Update Sitemap - Remove Redirect URL
**File:** `scripts/generateSitemaps.js`

Ensure `/project/investor-loan-app` is in the `REDIRECT_URLS` exclusion list (already done in previous fix).

---

### Files to Modify

| File | Change |
|------|--------|
| `src/components/header/useHeaderNavigation.tsx` | Add Store and Design Services to NAV_LINKS |
| `src/components/Footer.tsx` | Add Store and Design Services links |
| `src/components/blog/BlogPostContent.tsx` | Add Related Articles section |
| `src/pages/DesignServices.tsx` | Verify links to sub-pages exist |

### Expected Results

After publishing these changes:
1. Store page will have links from every page (header + footer)
2. Design services pages will have proper internal linking hierarchy
3. Blog posts will link to each other, improving crawlability
4. Google should recrawl and index these pages within 2-4 weeks

### Technical Notes

- The prerendering system is working correctly
- Netlify redirects are properly configured
- The recent fix for `/project/dae-search` was just crawled on Jan 30, showing Google is seeing the updates
- Request indexing in GSC for priority pages after publishing

