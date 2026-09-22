# Functional Specification

> **Authority**: Feature inventory and data flow for barskydesign.pro.  
> **Domain**: `https://barskydesign.pro`

---

## 1. Site Purpose

Personal portfolio and design consultancy site for Hiram Barsky, Lead Product Designer. Serves as:
- Portfolio showcase (case studies)
- Service offering hub
- Blog / thought leadership
- Lead capture / contact funnel
- Digital product store

---

## 2. Route Map

### 2.1 Public Routes

| Route | Page | Component | Purpose |
|-------|------|-----------|---------|
| `/` | Home | `Index.tsx` | Hero, projects, services, CTA |
| `/about` | About | `About.tsx` | Bio, experience, skills |
| `/services` | Services | `Services.tsx` | Service categories overview |
| `/design-services/ux-ui-design` | UX/UI Design | `UxUiDesign.tsx` | Service detail page |
| `/design-services/mobile-app-design` | Mobile Design | `MobileAppDesign.tsx` | Service detail page |
| `/design-services/web-development` | Web Dev | `WebDevelopment.tsx` | Service detail page |
| `/contact` | Contact | `Contact.tsx` | Contact form, lead capture |
| `/store` | Store | `Store.tsx` | Digital products |
| `/store/success` | Purchase Success | `StoreSuccess.tsx` | Post-purchase confirmation |
| `/blog` | Blog | `Blog.tsx` | Blog listing |
| `/blog/:slug` | Blog Post | `BlogPost.tsx` | Individual article |

### 2.2 Project Routes

| Route | Type | Component |
|-------|------|-----------|
| `/project/herbalink` | Structured case study | `StructuredHerbalinkCaseStudy.tsx` |
| `/project/business-management` | Structured case study | `StructuredBusinessManagementCaseStudy.tsx` |
| `/project/barskyjoint` | Structured case study | `StructuredBarskyJointCaseStudy.tsx` |
| `/project/:projectId` | Generic project | `ProjectDetail.tsx` |

### 2.3 Redirects

| From | To | Type |
|------|----|------|
| `/project/investor-loan-app` | `/` | 301 (hidden) |
| `/project/wholesale-distribution` | `/project/business-management` | 301 |
| `/projects` | `/#projects` | Replace |
| `/web-development` | `/design-services/web-development` | 301 (server) |
| `www.*` | non-www | 301 (server) |
| Trailing slashes | Without trailing slash | 301 (server) |

### 2.4 Internal/Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin/content-export-2024` | Content export utility |
| `/__seo-check` | SEO verification runner |

---

## 3. Data Sources

### 3.1 Static Data (Code)

| File | Content |
|------|---------|
| `src/data/blogData.ts` | Blog post metadata, content |
| `src/data/seoData.ts` | Per-page SEO metadata |
| `src/data/structuredCaseStudies.ts` | Case study structured data |

### 3.2 Database (Lovable Cloud)

| Table | Purpose | RLS |
|-------|---------|-----|
| `seo_meta` | SEO overrides per page | Public read |
| `blog_posts` | Blog content (DB-backed) | Public read |
| `leads` | Contact form submissions | Insert-only |
| `editable_content` | CMS-editable content blocks | Public read |
| `page_metadata` | Page-level metadata | Public read |
| `published_projects` | Published project data | Public read |
| `dev_mode_changes` | Dev mode change tracking | Internal |

### 3.3 Data Flow Priority

For SEO metadata:
```
1. Database (seo_meta table) — highest priority
2. Static data (seoData.ts) — fallback
3. Computed defaults (seoBuilder.ts) — last resort
```

---

## 4. Core Features

### 4.1 Homepage

- **Hero Section**: Profile image → name → role → link → location → social icons → scroll arrow
- **Projects Grid**: Case study cards with hover effects
- **Services Overview**: Service category cards
- **CTA Section**: Contact prompt on gradient background

### 4.2 Case Studies

- **Structured format**: Problem → Research → Insights → Solution → Results
- **Image system**: Hero (16:9, 1200px max) → Standard (900px max) → Small (600px max)
- **Captions**: One sentence max, sourced from database, never regenerated once saved
- **Individual images**: Each project/post uses its own unique images (no shared generic images)

### 4.3 Blog

- **Listing**: Card grid with cover image, title, excerpt, date, tags
- **Detail**: Full article with related posts (internal linking for SEO)
- **Static data**: Blog posts defined in `blogData.ts`

### 4.4 Contact / Lead Capture

- **Form fields**: Name, email, company, phone, project type, budget, description
- **Storage**: Inserts to `leads` table
- **No authentication required** for form submission

### 4.5 Store

- **Digital products**: Design resources, templates, UX tools
- **Purchase flow**: Product selection → checkout → `/store/success` confirmation

### 4.6 Services

- **Hub page**: `/services` — overview of all service categories
- **Sub-pages**: Individual service detail pages under `/design-services/*`
- **Internal linking**: Hub links to sub-pages for crawl depth

---

## 5. Authentication

- **Public site**: No user authentication required for viewing
- **Admin routes**: Hidden behind non-indexed URLs (no auth gate currently)
- **Lead form**: Unauthenticated insert to `leads` table via RLS policy

---

## 6. External Integrations

| Integration | Purpose |
|-------------|---------|
| Lovable Cloud (Supabase) | Database, edge functions, SEO verification |
| Google Search Console | Indexing monitoring (external) |
| Netlify | Hosting, server-side redirects, prerendering |
| Google Fonts | Space Grotesk + Inter |

---

## 7. Prerendering

- Static HTML generated at build time via `prerender.js`
- Explicit slug lists (`knownSlugs`, `knownBlogSlugs`) — no dynamic discovery
- Each page gets unique `<title>`, `<meta>`, and structured data in its HTML
- SPA fallback to `index.html` for unprerendered routes
