# UX & Interaction Review — barskydesign.pro (second pass)
**Date:** 2026-08-08
**Scope:** Pages beyond the first homepage-focused pass — contact form, blog index + post, services, store + product flow, case-study image lightbox, header/mobile nav. Desktop 1280×900 and mobile 375×812. All findings verified live in the browser; all fixes re-verified live after the change.

## Summary
The biggest discovery is that the store was completely non-functional: the product details page (the only place with a real Stripe checkout) had no route, so every product link silently redirected to the homepage — and the only working button, "Add to Cart," showed a success toast for a cart that doesn't exist. Both are fixed; the store now has a working end-to-end purchase path. The image lightbox got its full accessibility treatment (the piece deferred from the first pass), and the mobile menu gained the two dismissal affordances it was missing. The contact form was the strongest surface reviewed: proper zod validation with inline errors, `aria-invalid`, a disabled loading state, and distinct success/error toasts.

## Findings by priority

### Critical (all fixed)
- **Store product pages unreachable.** `ProductDetailsPage.tsx` existed but was never routed in `App.tsx`; product links (`/store/product/:id`) hit the catch-all and redirected to the homepage. The real Stripe checkout lives on that page, so no purchase was possible anywhere on the site. **Fixed:** route restored (lazy-loaded, consistent with the other routes). Verified: page loads at its own URL on desktop and mobile, checkout button present, no horizontal scroll.
- **Fake "Add to Cart" interaction.** Both `ProductCard.tsx` and `ProductDetails.tsx` fired `toast.success("Added ... to your cart!")` with no cart state, no cart UI, and no way to ever act on the "carted" item — success feedback for an action that does nothing (a direct violation of visibility-of-system-status, and functionally deceptive). **Fixed:** the card button is now "View Details" linking to the product page; the details page keeps the single real "Checkout" button and the fake secondary button is removed.

### High (all fixed)
- **Lightbox had no dialog semantics or focus management** (deferred from first pass as F5). **Fixed** in `ImageMaximizer.tsx`: `role="dialog"`, `aria-modal="true"`, accessible name from the image title, focus moves to the close button on open, Tab is trapped inside the dialog, and focus is restored to the triggering image on close (via effect cleanup — the provider unmounts the component on close, so a cleanup-based restore is required). Verified live: keyboard Enter on an image opens the dialog with focus on Close; Escape closes and returns focus to the image.
- **Lightbox arrow-key navigation used a stale index.** The keyboard-listener effect didn't include `currentIndex` in its deps, so in multi-image galleries ArrowRight/ArrowLeft acted on the index captured at open — navigation would bounce between the first two images instead of advancing. **Fixed** by correcting the dependency array.
- **Mobile menu had no Escape or outside-tap dismissal** — the two standard escape hatches for any panel. **Fixed** in `MobileMenu.tsx` (document-level keydown + pointerdown listeners scoped to the open state). Verified live: Escape closes it, tapping page content closes it, tapping inside it does not.
- **Dead internal link generated into blog posts.** `InternalLinkEnhancer.tsx`'s first rule linked the keywords "portfolio / case study" to `/blog/portfolio-red-flags-no-interviews`, a post that doesn't exist — every article matching those keywords shipped a link to a soft-404. **Fixed:** rule now targets the real `case-study-writing` post, and rules are defensively filtered against actual `blogData` slugs so a future deleted post can't silently reintroduce dead links.

### Medium (fixed, low-risk)
- **`role="menu"` misuse on the mobile nav panel** — ARIA menu semantics demand `menuitem` children and arrow-key behavior; a list of nav links should be plain nav semantics. Removed the role.
- **Hover-to-play card videos ignored `prefers-reduced-motion`.** Now gated: with reduced motion set, hover leaves the static poster in place (`VideoCaseStudiesSection.tsx`).
- **Odd-count 2-column image grids left a dangling last image** next to an empty cell (first-pass F9, e.g. Ring-Rival's 5-image "Then → Now"). The last image in an odd set now spans both columns (`SimpleCaseStudyPage.tsx`).
- **Debug `console.log`s in production paths** removed from `ImageMaximizer.tsx`, `ImageMaximizerContext.tsx`, and `VideoCaseStudiesSection.tsx`.

### Reported only (needs a decision or asset — not fixed)
- **Blue Sky case-study hero video is a dead URL** (`barskyux.com/.../businessmanagement.mp4` — domain no longer resolves; the poster image shows instead, and the request errors in the console). Needs a replacement asset from Hiram or removal of the `heroVideo` field. Already flagged in `structuredCaseStudies.ts`.
- **Case-study template inconsistency** (first-pass F2): Business Management still uses the older layout vs. Ring-Rival's newer one. Design decision.
- **Stale "Last Updated Friday September 19th, 2025" stamp** on the homepage "What I'm Working On Now" section (first-pass F8). Content decision — update the date or drop the literal stamp.
- **"AI Interaction Design" and "UX/UI Design" cards on /services both link to** `/design-services/ux-ui-design`. Possibly intentional consolidation; flagging in case the AI card deserves its own page.

## Interaction states verified good (no findings)
- **Contact form:** empty submit → all four fields get inline messages + `aria-invalid="true"`; submit button disables with "Sending…" label while in flight; success/destructive toasts on outcome. (Stopped at validation level — no live submission sent.)
- **Structural sweep** (`/services`, `/blog`, `/about`, `/store`, product page): exactly one `h1` per page, zero images missing alt, zero unnamed buttons/links, no horizontal overflow at 375px.
- **Case-study nav buttons** hide correctly for single images; keyboard-openable images (`tabIndex=0`, `role="button"`, Enter/Space handler, descriptive `aria-label`).

## Files changed
| File | Change |
|---|---|
| `src/App.tsx` | Restored `/store/product/:productId` route (lazy `ProductDetailsPage`) |
| `src/components/store/ProductCard.tsx` | "Add to Cart" (fake toast) → "View Details" link |
| `src/components/store/ProductDetails.tsx` | Removed fake "Add to Cart" button + unused import |
| `src/components/project/ImageMaximizer.tsx` | Dialog semantics, focus trap/restore, stale-index fix, debug logs removed |
| `src/context/ImageMaximizerContext.tsx` | Debug logs removed |
| `src/components/header/MobileMenu.tsx` | Escape + outside-tap dismissal; `role="menu"` removed |
| `src/components/blog/InternalLinkEnhancer.tsx` | Dead-slug rule retargeted; defensive slug-existence filter |
| `src/components/home/VideoCaseStudiesSection.tsx` | `prefers-reduced-motion` gate on hover-play; dead debug block removed |
| `src/components/case-study/SimpleCaseStudyPage.tsx` | Odd-count grid: last image spans both columns |

`npm run build` passes (30 routes).
