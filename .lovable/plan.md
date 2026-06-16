## What the GSC screenshot is telling you

These are **indexing reports**, not site-wide errors. Each row is "URLs Google tried but didn't index, for this reason." The "Pages" column is tiny (1–6 URLs each), so this is not a sitewide problem. Here's what each one means for your site specifically, and what to do.

### 1. Blocked by robots.txt — 1 page
**Likely intentional.** Your `public/robots.txt` explicitly disallows the old/delisted project routes:
`/project/splittime`, `/project/crypto`, `/project/smarterhealth`, `/project/medication-app`, `/project/gold2crypto`, `/project/dae-search`, `/project/business-management`, `/project/investor-loan-app`, `/project/qr-code-builder`, `/project/email-creation-ai`, `/project/barskyjoint`, `/project/wholesale-distribution`, `/project/roi-design-builder`, `/projects`.

Google found a link to one of those and respected the block. **No fix needed** — that's the point of the disallow.

→ Action: confirm in GSC which exact URL it is. If it's one of the delisted projects above, mark "Validate fix" in GSC isn't applicable; just leave it. If it's a URL that *should* be indexed, we remove that line from robots.txt.

### 2. Server error (5xx) — 2 pages
Google hit a 5xx when crawling 2 URLs. Could be a transient hosting blip, the SEO edge function timing out, or a real broken route. Need the URLs to know.

→ Action: get the 2 URLs from GSC, then curl them to see if they 5xx now. Fix only if reproducible.

### 3. Page with redirect — 1 page
Google found a URL that 301s to another URL. This is **normal and not a bug** — it just means the redirected URL itself doesn't get indexed (the target does). Only worth fixing if it's a URL we're linking to internally or that's in the sitemap.

→ Action: get the URL, remove any internal link/sitemap entry pointing to it.

### 4. Crawled – currently not indexed — 6 pages
Google crawled the page, decided not to index it (usually thin content, duplicate, or low authority signal). **Not an error** — Google's editorial call. Common fix is improving content quality or internal linking, not a code change.

→ Action: get the 6 URLs to judge whether they're worth pushing for indexing or fine to leave.

## What I need from you

GSC's bulk URL export isn't reachable through the API I have. Two options:

**Option A (fastest):** In Search Console → Indexing → Pages, click into each of the 4 rows and copy the URLs (or hit "Export" → CSV). Paste them here and I'll diagnose + fix per row.

**Option B:** I can mark the robots.txt finding as expected (since the disallows are intentional) and wait for you to investigate the other 3 manually.

Which do you want?
