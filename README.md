# barskydesign.pro

The source for [barskydesign.pro](https://barskydesign.pro) — Hiram Barsky's
portfolio. Vite + React + TypeScript + Tailwind, deployed on Netlify.

## Running it

```sh
npm install
npm run dev
```

## Building

```sh
npm run build           # sitemap + llms.txt, vite build, then per-route SEO HTML
npm run capture-bodies  # re-capture the prerendered bodies (real Chrome)
npm run build           # bake the captured bodies into dist/
```

`capture-bodies` is a manual step. It drives the built site in Chrome and saves
each route's rendered `#root` into `prerendered-bodies/`, which the second build
injects into the static HTML so crawlers get real content. Re-run it whenever
page content changes.

## Deploying

Netlify builds from `main`. Pushing to `main` deploys.

## Layout

- `src/` — the app
- `scripts/` — sitemap, llms.txt, per-route SEO HTML, prerender capture
- `netlify/functions/` — contact notification, CSP report collector
- `public/_redirects` — one 200 per prerendered route, then the SPA fallback
