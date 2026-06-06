---
name: theme-legibility-lock
description: Apply when working on pages with day/night (light/dark) themes, contrast scrims, or fixing legibility/contrast bugs. Enforces theme-bound colors, full-block scrim coverage, and WCAG AA contrast in both themes.
---

# Theme Legibility Lock (Day/Night)

Use whenever editing themed pages (day/night, light/dark), adding text/icons over animated or gradient backgrounds, or fixing contrast/legibility issues. Especially relevant on the ParallaxHero and any page that swaps backgrounds.

## The three-point rule (non-negotiable)

1. **No fixed text/icon colors.** Every text element AND every interactive icon binds its color to the active theme: dark in day, light in night. Never hardcoded `text-white`, `text-white/60`, or a single gray for content that sits over a theme-swapping background.
2. **One scrim, whole block.** If a scrim/backdrop is used for legibility, it wraps the ENTIRE content block — every section and row — not just the top group. No content sits half-on, half-off the scrim.
3. **WCAG AA.** 4.5:1 for body text, 3:1 for large text and icons, in BOTH themes.

If a new element fails any of these three, the element is the bug — fix the element, don't re-tune the background.

## Workflow

- Before adding/editing any text or icon over a themed background, check it against the three-point rule.
- When fixing a contrast bug, prefer extending the existing scrim or binding color to a theme token over adding a second scrim or hardcoding a new color.
- Pair with the `scope-lock` skill: name the files, smallest diff, stop on ambiguity, report files touched.

## Verify after

- Toggle to **day** theme: every text element and icon in the affected block is readable; scrim covers the whole block.
- Toggle to **night** theme: nothing got darker or broken.
- Scroll the full section: contrast holds top to bottom in both themes.
