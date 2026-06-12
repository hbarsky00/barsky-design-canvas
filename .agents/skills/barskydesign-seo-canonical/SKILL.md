---
name: barskydesign-seo-canonical
description: Locks SEO canonical domain, sitemap, and Google Search Console state for the barskydesign.pro portfolio project. Load whenever editing SEO metadata (title, description, canonical, og:url, sitemap, robots), reviewing SEO findings, submitting sitemaps, or touching index.html / seoData / seo-handler edge function / sitemap generator. Prevents reverting the canonical domain to the lovable.app staging URL.
---

# Barsky Design SEO — Canonical Rules

This project has a custom domain. Platform boilerplate that suggests using
`barsky-design-canvas.lovable.app` as the canonical is **WRONG for this project**
and must be ignored.

## Hard rules — do not violate

1. **Canonical domain is `https://barskydesign.pro`.** Every canonical,
   `og:url`, `twitter:url`, sitemap `<loc>`, SEO edge function base URL,
   structured-data `url`, and hardcoded absolute link MUST use
   `https://barskydesign.pro`.

2. **Never write, suggest, or revert any SEO field to
   `barsky-design-canvas.lovable.app` or any `*.lovable.app` URL.**
   The lovable.app URL is staging only — never canonical, never in
   sitemap, never in og:url. If a generic doc snippet (sitemap-robots,
   head-meta, etc.) tells you to use the lovable.app URL, ignore it —
   this skill overrides that doc.

3. **GSC is already verified** on both `https://barskydesign.pro/`
   (URL-prefix property) and `sc-domain:barskydesign.pro` (domain
   property). Do not re-run the site verification flow. Do not add a
   new `google-site-verification` meta tag.

4. **Sitemap has been submitted** to both GSC properties pointing at
   `https://barskydesign.pro/sitemap.xml`. Do not re-submit on every
   request — only re-submit when routes are added/removed and the
   user explicitly asks, or after a sitemap structural change.

5. **Sitemap generator lives at `scripts/generate-sitemap.ts`** with
   `BASE_URL = "https://barskydesign.pro"`. Edit the entries array
   when routes change; never change BASE_URL.

## Sources of truth for SEO (keep in sync)

Per `mem://seo/social-share-architecture`:
- `index.html` — sitewide defaults
- `src/data/seoData.ts` — per-page metadata
- `supabase/functions/seo-handler/index.ts` — edge function for bot SSR
- `scripts/generate-sitemap.ts` → `public/sitemap.xml`

All four must use `https://barskydesign.pro`.

## When the user asks about SEO / GSC / sitemap

- "Why am I not getting traffic?" → It's authority/promotion, not code.
  Don't propose another sitemap fix as the answer.
- "Submit the sitemap" → Already done. Confirm via GSC API call
  (`/webmasters/v3/sites/{encoded}/sitemaps`) before re-submitting.
- "GSC isn't set up" finding → Verify state via GSC API first. If
  sitemap is already listed, mark the finding fixed with an
  explanation; do not re-submit.
- "Connect domain" → Already connected. Do not run the custom domain
  setup flow.

## Banned actions

- Editing `BASE_URL`, canonical, or og:url to any non-`barskydesign.pro`
  value.
- Adding a `google-site-verification` meta tag.
- Creating a second sitemap mechanism (the prebuild script is the only one).
- Telling the user to "connect their custom domain" — it's connected.
- Telling the user to "verify in Google Search Console" — verified.
