---
name: daytime-contrast-wash
description: Use when a day/night hero reads great at night but white text washes out in day (light-mode contrast failure). Adds a full-bleed soft gradient darkening behind hero content — a wash, not a card — to hit WCAG AA against the brightest day sky without reintroducing per-theme color swapping. Day-mode completion of the cardless-hero-text approach.
---

# Daytime Contrast Wash (Light-Mode Legibility)

**Use when:** A day/night hero reads great at night but white text washes out in day. Goal: make the light/day theme accessible WITHOUT reintroducing a card or per-theme color swapping.

**Pairs with** `cardless-hero-text` (white text + text-shadow) and `scope-lock`. This is the day-mode completion of the cardless approach.

## Why day fails when night is perfect

Light text is trivially readable on a DARK background and the hardest case in UI on a LIGHT one. Night (dark sky + white text) basically can't fail. Day (bright sky + white text) almost always does, especially thin/light lines and small body text near the sun. So "great at night, bad in day" is the expected result of one white text color — not a mistake.

## The fix: a wash, not a card

Add a single **full-bleed soft gradient darkening** behind the content — edge to edge, no box, no border, no rounded corners, no hard edges. Concentrate it behind the content band, fade it to transparent toward the top and outer edges so the bright sky still shows at the margins. Tune its opacity so white text hits **WCAG AA (4.5:1)** against the brightest part of the day sky. White text stays the only text color in both themes; the wash supplies the contrast.

A wash differs from a card: no edges, no fill rectangle, no border — it's atmospheric darkening, not a surface.

---

## Ready-to-paste Lovable prompt (scope-locked)

> ## SCOPE LOCK
>
> **TASK:** Daytime accessibility is failing — white text on the bright day sky is low-contrast (especially "Hey there! I am" and the subtitle), and a frosted card is still showing in day mode. Night is fine and must NOT change. Make day readable, cardless, to match night.
>
> 1. Remove any remaining card/panel/frosted background behind the content in DAY mode. Night is already cardless — keep it that way.
> 2. Add a single FULL-BLEED soft vertical gradient darkening behind the hero content — edge to edge, no box, no border, no rounded corners, no hard edges (a wash, not a card). Concentrate it behind the content band and fade it to transparent toward the top and outer edges so the bright sky still shows at the margins.
> 3. Tune the wash opacity so white text meets WCAG AA (4.5:1) against the BRIGHTEST part of the day sky, including near the sun. Keep all text white in both themes — do not reintroduce per-theme color swapping. The wash provides the contrast.
> 4. Confirm the night theme is visually unchanged and still passes.
> 5. Do NOT change the gradient colors, the sun/moon, the mountains, or the layout — only remove the day card and add the full-bleed wash.
>
> **RULES:** smallest diff, touch only the hero component, restate the task and list files before editing, stop and ask if ambiguous, list every file and class you changed.

---

## Verify after

- **Day, brightest sky + near the sun:** read "Hey there! I am", the subtitle, and the smallest descriptions. All must be clearly legible.
- **Night:** unchanged — the wash should be invisible/irrelevant against the dark sky.
- Check mobile, tablet, desktop — the wash scales with the content.

## Tradeoff to expect

The wash mutes the bright-blue day slightly where text sits. The fade-to-transparent edges are what keep it reading as daytime. Tune until the text is AA-legible with the least darkening that achieves it — start subtle, increase only until it passes.

## Pairs with

- `cardless-hero-text` — prerequisite; this skill fills the day-mode gap of that approach.
- `scope-lock` — embedded in the prompt (restate, list files, smallest diff, stop on ambiguity).
