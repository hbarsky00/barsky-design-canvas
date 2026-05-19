# Case Study Share Feature

Documentation for the share controls that appear in every case-study hero, next to the **Visit Live Site** button.

---

## Overview

Each case study hero renders three actions via `ProjectActionsCompact`
(`src/components/project/ProjectActionsCompact.tsx`):

| Control | Icon | Action | Target URL |
|---|---|---|---|
| **Visit Live Site** | `ExternalLink` | Opens the live product in a new tab | `caseStudyData.projectLink` (e.g. `https://catchbuddy.me`) |
| **Share on LinkedIn** | `Linkedin` | Opens LinkedIn's share composer in a new tab | `projectPageUrl` (the case-study page, e.g. `https://barskydesign.pro/project/catchbuddy`) |
| **Copy Link** | `Link` | Copies the live product URL to clipboard + shows toast | `liveUrl` (same as Visit Live Site) |

---

## Props

```ts
interface ProjectActionsCompactProps {
  liveUrl: string;            // Live product URL (Visit + Copy)
  projectTitle?: string;
  projectDescription?: string;
  projectPageUrl?: string;    // Case-study page URL (LinkedIn share)
  onShare?: () => void;       // Optional analytics hook
  onCopy?: () => void;        // Optional analytics hook
}
```

If `liveUrl` is empty, the entire component returns `null`.

---

## LinkedIn Share

Built as a plain `<a>` tag pointing at LinkedIn's official share-offsite endpoint:

```ts
const shareUrl = projectPageUrl || liveUrl || '';
const linkedinUrl =
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
```

Rendered as:

```tsx
<a
  href={linkedinUrl}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => onShare?.()}
>
  <Linkedin />
</a>
```

### Why an `<a>` and not `window.open()`?

LinkedIn refuses to render inside an iframe (`X-Frame-Options: DENY`), and
`window.open()` from a sandboxed iframe is often blocked. A native anchor with
`target="_blank"` is the most reliable way to escape the frame.

### What LinkedIn does with the URL

LinkedIn fetches the shared URL server-side and reads its Open Graph tags
(`og:title`, `og:description`, `og:image`) to build the preview card. The
case-study page's `UnifiedSEO` component renders those tags per route, so the
preview reflects that specific project.

---

## Copy Link

Uses the async Clipboard API with a toast confirmation:

```ts
await navigator.clipboard.writeText(liveUrl);
toast({ title: "Link copied!", description: "Project URL copied to clipboard" });
```

Falls back to a destructive toast on failure (permissions denied, insecure
context, etc.). Copies the **live product URL**, not the case-study page —
this is intentional so visitors land on the actual product.

---

## Where it's mounted

`ProjectActionsCompact` is used in:

- `src/components/case-study/structured/UnifiedCaseStudyHero.tsx` (mobile, tablet, desktop variants)
- `src/components/case-study/structured/StructuredCaseStudyHero.tsx`
- `src/components/case-study/OriginalCaseStudyLayout.tsx`

The `projectPageUrl` is built from `location.pathname` so the LinkedIn share
always reflects the current case-study route.

---

## Known limitation: Lovable preview iframe

Inside the Lovable preview, the iframe sandbox blocks new tabs from opening,
so clicking **Share on LinkedIn** appears to do nothing. This is **not a bug**
— the button works correctly on:

- The published Lovable URL (`barskydesign.lovable.app`)
- The production domain (`barskydesign.pro`)
- Any standalone browser tab

To verify during development, open the preview URL in a new tab outside the
Lovable editor.

---

## Extending

To add another network (X/Twitter, Facebook, email, etc.):

1. Add an icon import from `lucide-react`.
2. Build the share URL with `encodeURIComponent(shareUrl)`.
3. Render another `<a target="_blank" rel="noopener noreferrer">` in the icon
   row of `ProjectActionsCompact`.
4. Optionally fire `onShare?.()` for analytics parity.

Keep the row to a maximum of 3–4 icons to preserve the hero's visual rhythm.
