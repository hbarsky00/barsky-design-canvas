# Project & Infrastructure Record

> Persistent notes for any Claude Code session working in this repo.
> Since sessions have no cross-session memory, durable facts live here.
> Owner: Hiram Barsky (GitHub `hbarsky00`, hbarsky01@gmail.com).

## Domains & Netlify projects

Hiram's Netlify team is `hbarsky00` (team id `688f5be576be918edb0982d7`, 11 sites total).
The Barsky-related projects are:

| Netlify project name | Live URL | Notes |
|----------------------|----------|-------|
| `barskydesign` | https://barsky.design | Live, deploy ready, **forms enabled**. Site id `012bdb7d-13c4-457b-a1a6-585d60dfa87a`. |
| `incredible-griffin-66e664` | https://barskydesign.pro | Live, deploy ready. Site id `1a3a5e25-aa10-440e-857c-37be082d4020`. |
| `soft-conkies-1cf4bd` | http://hiram-barsky.com | Live, deploy ready, forms enabled. Site id `e762d5ff-2649-450a-9b98-1260a3174a83`. |

### Important distinction

- **This repo (`barsky-design-canvas`) is configured to deploy to `barskydesign.pro`.**
  All SEO/canonical config in this codebase points at `https://barskydesign.pro`
  (see `netlify.toml`, `supabase/functions/seo-handler/index.ts`, `scripts/seo-routes.ts`,
  and the `.agents/skills/barskydesign-seo-canonical` skill). A secondary/legacy
  domain `https://barskyux.com` also appears in the SEO handler.
- **`barsky.design` is a SEPARATE Netlify project** (named `barskydesign`). Nothing
  in this checkout references the `barsky.design` domain. Whether it builds from this
  same GitHub repo or a different source is **not yet confirmed** — verify in the
  Netlify dashboard before assuming.

### TODO / open questions to resolve with Hiram
- Confirm which GitHub repo (if any) the `barsky.design` Netlify project builds from.
- Decide the intended relationship between `barsky.design` and `barskydesign.pro`
  (separate sites? consolidate? redirect one to the other?).

## How to inspect Netlify from a session
Netlify MCP tools are connected. Load them via ToolSearch, e.g.:
`select:mcp__Netlify__netlify-project-services-reader`, then use the
`get-projects` / `get-project` operations with the site ids above.
