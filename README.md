# barskydesign.pro

Portfolio of Hiram Barsky — Lead Product & AI Designer. Case studies, product
promo pages, blog, and store, served as a prerendered React SPA.

**Live:** https://barskydesign.pro

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix)
- React Router (SPA) with per-route prerendered HTML for SEO
- Supabase (storage for some published images)
- Netlify (hosting + redirects; deploys automatically on push to `main`)

## Develop

```sh
npm install
npm run dev        # dev server on :8080
```

## Build

```sh
npm run build      # sitemap -> vite build -> per-route SEO prerender into dist/
npm run preview    # serve the production build locally
```

The build pipeline matters: plain `vite build` skips the sitemap and the
prerendered per-route HTML that search and social crawlers rely on. Always go
through `npm run build` (Netlify does — see `netlify.toml`).

## SEO architecture

- `scripts/seo-routes.ts` — single source of truth for every indexable route;
  feeds both the sitemap generator and the prerenderer so they can't drift.
- `scripts/generate-sitemap.ts` — writes `public/sitemap.xml` before the build.
- `scripts/prerender-seo.ts` — after the build, writes `dist/<route>.html` for
  every indexable route with per-page title/description/canonical/OG tags.
- `src/components/seo/UnifiedSEO.tsx` — runtime tags via react-helmet-async
  (`defer={false}` everywhere; head tags in HTML carry `data-rh="true"` so
  helmet replaces them at hydration instead of duplicating).
- `src/data/seoData.ts` — per-page titles, descriptions, and OG images.

## Deploying

Push to `main` → Netlify builds and publishes to barskydesign.pro.
