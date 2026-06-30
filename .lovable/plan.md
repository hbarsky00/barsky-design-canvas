## Goal
Verify every case study page loads its images — no broken remote URLs, no missing local files.

## Steps

1. **Collect every image reference** across case study data and components:
   - `src/data/structuredCaseStudies.ts`
   - `src/data/caseStudies.ts`
   - `src/components/home/VideoCaseStudiesSection.tsx`
   - `src/components/home/FeaturedCaseStudiesSection.tsx`
   - Any other file under `src/data/` or `src/components/case-study/` referencing `.png/.jpg/.webp/.svg` or remote hosts.

2. **Classify each reference**:
   - Local (`/images/...`, `/lovable-uploads/...`, `src/assets/...`) → check the file exists on disk.
   - Remote (`barskyux.com`, `*.supabase.co`, `barskydesign.pro/images/...`, any other host) → run through `src/utils/imageResolver.ts` to confirm it maps to a local fallback; HEAD-check the original to record live/dead status.

3. **Run the resolver in isolation** against every collected URL via a small Node script, producing a report with: original URL → resolved path → file exists (yes/no).

4. **Render-check sample**: spin up Playwright headless against `/case-studies/<slug>` for ~3 representative slugs (including `email-creation-ai`, `dae-search`, one legacy) and capture failed image requests from the network log.

5. **Produce an audit report** at `/mnt/documents/case-study-image-audit.md` listing:
   - Total refs scanned
   - Refs resolved to existing local files ✓
   - Refs falling back to default OG (flag for replacement)
   - Any unresolved/broken references with file + line number

6. **Fix only what's broken**: for any reference not covered by the resolver, either add an explicit mapping in `src/utils/imageResolver.ts` or repoint the data file to an existing local image. No new image assets created.

## Technical Notes
- No new images generated or uploaded.
- Resolver changes stay in `src/utils/imageResolver.ts`.
- Playwright runs against the already-running dev server at `http://localhost:8080`.
- Report is deliverable; code edits only where the audit surfaces a real miss.