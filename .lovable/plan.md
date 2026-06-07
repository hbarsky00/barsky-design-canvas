# Fix transition pill flash + hero bottom cutoff

Two surgical fixes to the parallax hero. No structural changes, no new components.

## Issue 1 — Pills go dark/gray mid-transition (day ↔ night)

In screenshot 1 (mid-transition to night), the product pills are dark gray with washed-out text. That's because:

- During the transition there's a window where `data-text-mode` is `light` (night text color taking over) but the background is still the bright day sky.
- The `body[data-text-mode="light"] .product-pill` rule paints the pills `rgba(15,23,42,0.7)` (dark) → reads as ugly gray slabs against the bright sky.
- Text color is also mid-fade between dark and white, so labels go low-contrast gray.

Fix: make the pill background follow the **scene** (day vs night) instead of the text mode, so the white-pill day style stays locked until the sky is actually dark.

- Use `.parallax-hero.is-day .product-pill` (and its hover variant) for the solid white pill + dark label + soft shadow.
- Use `.parallax-hero:not(.is-day):not(.has-flat-scene) .product-pill` (night mountains) for the existing dark semi-opaque pill + light label.
- Flat scenes keep their current `[data-text-mode]`-driven pill rule.
- Force the pill **label color** explicitly inside the day and night rules so it doesn't mid-fade with the rest of the hero text.

Result: pills swap appearance only once, exactly when the sky swaps — no awkward gray middle frame.

## Issue 2 — Social icons clipped at the bottom

In screenshot 1 the email / LinkedIn / GitHub / calendar row sits behind the mountain silhouette and is half-cut. The hero content needs a hair more breathing room at the bottom on mobile so the icon row clears the mountains.

Fix (mobile only, ≤ 640px):

- Add ~24px additional bottom padding to `.parallax-content` on mobile, OR shift the content block up by reducing the top padding by the same amount. Going with **extra bottom padding** so the headline keeps its current vertical position — only the icon row moves into safer territory.
- Verify on 390×844 and 360×800 that the icons sit fully above the bottom mountain line in both day and night.

Desktop is unaffected.

## Files touched

- `src/styles/themes.css` — only the pill-state selectors (~10 lines) and one mobile padding tweak inside an existing media query (or add a small `@media (max-width: 640px)` block if none exists for `.parallax-content`).

## Out of scope

- No changes to copy, fonts, sun/moon, mountains, transition timing, or any other component.
- No changes to the theme picker button position.
- No tweaks to icon size or spacing between icons.
