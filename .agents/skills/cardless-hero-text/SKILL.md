---
name: cardless-hero-text
description: Use when hero text sits over an animated/parallax day-night gradient and a frosted card/scrim looks muddy. Two sequential scope-locked prompts — (1) remove the card and rely on white text + layered text-shadow for legibility in both themes, (2) fix responsive centering and a tiling mountain background. Replaces the "one scrim, whole block" rule from theme-legibility-lock for this hero.
---

# Cardless Legible Hero Text Over a Gradient (Lovable)

**Use when:** Text sits over an animated/parallax day-night gradient and you do NOT want a card, scrim, or panel behind it. Goal: legible text in both themes with no background box.

**Replaces** the "one scrim, whole block" rule from the `theme-legibility-lock` skill *for this hero* — a frosted panel over a busy gradient looks muddy and forces a second text color.

---

## Why the card was the problem

A translucent card over a busy gradient + mountains desaturates everything behind it into gray mud, and it splits the page into two zones with two text colors (white on open sky, dark on the card). Removing the card and giving each letter its own micro-contrast via text-shadow fixes both at once.

## The rule (no card)

1. **No background panel.** No box, border, blur, or fill behind the content. Text sits directly on the sky.
2. **One text color: white** (or near-white). No per-theme color swapping.
3. **Layered text-shadow on every text element** so each glyph stays readable on the brightest part of the day sky AND the dark night sky.
4. **WCAG AA** target: 4.5:1 effective contrast. Over a bright sky, the shadow is what buys the contrast — small text needs a real shadow, not a faint one.

## Layout + background rules (cardless hero also needs these)

- **Centered at every breakpoint.** Hero content lives in one centered container (`mx-auto` + sensible `max-width`); headline/subtitle/tagline center-aligned; product rows form one consistent centered column. Must read centered at mobile (~390px), tablet (~768px), desktop (~1280px).
- **Mountains don't tile.** A repeated/tiled mountain layer shows obvious seams on wide screens. Use ONE seamless full-width shape per layer.
- **Keep the layer that looks good, fix or cut the one that doesn't.** Soft background mountains read well; hard foreground layer is usually the offender.

---

## Prompt 1 — Cardless text (scope-locked). Run FIRST.

> ## SCOPE LOCK
>
> **TASK:** Remove the frosted card/panel behind the hero content entirely. Keep all content. Make the text legible WITHOUT any card, using white text plus a layered text-shadow that works in both day and night themes.
>
> 1. Delete the scrim/card container behind the hero content — no background box, border, backdrop-blur, or fill. Content sits directly on the sky/gradient.
> 2. Set ALL hero and product text to white (or near-white, e.g. `#f8fafc`) and remove per-theme light/dark color swapping on this text.
> 3. Add a layered text-shadow to every text element — "Hey there! I am", the name, subtitle, tagline, "SHIPPED PRODUCTS" / "CONCEPT GAMES" labels, product names, and descriptions: `text-shadow: 0 1px 2px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35);`
> 4. KEEP the product-name pills (CatchBuddy, HerbaLink, etc.). Make their label white with the same shadow and keep a subtle border so they stay visible without a solid fill.
> 5. Do NOT change the gradient, sun, parallax, mountains, or layout. Only remove the card and restyle the text.
>
> **RULES:** smallest diff, touch only the hero component, restate the task and list files before editing, stop and ask if anything is ambiguous, list every file and class you changed when done.

---

## Prompt 2 — Responsive alignment + mountains (scope-locked). Run SECOND.

> ## SCOPE LOCK
>
> **TASK:** Fix the hero's responsive alignment and the mountain background. Two steps. Run AFTER the cardless-text change is in.
>
> **STEP 1 — Centering across breakpoints.** Hero content is not properly centered on mobile, tablet, or desktop. Put the entire hero content column in a horizontally centered container (`mx-auto` + sensible `max-width`), center-align headline/subtitle/tagline, keep product rows as one consistent centered column. Must read centered at mobile (~390px), tablet (~768px), desktop (~1280px).
>
> **STEP 2 — Mountains.** The mountain background visibly duplicates/tiles, especially on wider screens. The BACKGROUND mountain layer (light, snow-capped) looks good — keep it as-is. The FOREGROUND layer (dark front peaks) looks bad and is the one repeating. Replace the foreground layer with a single seamless full-width shape (one SVG path scaled to 100% width, no tiling) and soften it to match the background layer. If it can't be made to look good, remove the foreground layer and keep only the background mountains.
>
> **RULES:** smallest diff, touch only the hero/background components, do NOT change the text, gradient, or sun. Restate the task and list files before editing, stop and ask if anything is ambiguous, list every file and class you changed when done.

---

## Why split

Text color, centering, and a tiling SVG live in different parts of the code. One prompt touching all three is how the agent ends up "fixing" mountains and quietly undoing the text changes. Run Prompt 1, confirm text is clean, then fire Prompt 2. If the agent doesn't do the restate-and-list-files handshake on either, that's the cue it's about to overreach — stop it there.

## Verify after

- **Day theme, brightest sky:** read the smallest text (descriptions). If still hard, shadow isn't strong enough — use the fallback below.
- **Night theme:** confirm nothing washed out and shadow isn't too heavy.
- Scroll the full hero in both themes — contrast should hold top to bottom.
- After Prompt 2: resize through mobile/tablet/desktop and confirm no mountain seams and content stays centered.

## Honest tradeoff + fallback

Small white text over the lightest part of a day sky is the hardest case in UI — text-shadow gets most of the way, but the brightest patch can still run tight. If it fails AA after Prompt 1:
- Strengthen the shadow (raise alpha / add a third layer), **or**
- Add a subtle FULL-BLEED gradient darkening behind the content — edge to edge, no box, no border — a wash, not a card. The cardless way to guarantee contrast.

## Pairs with

- `scope-lock` — both prompts embed scope-lock discipline (restate, list files, smallest diff, stop on ambiguity).
- `theme-legibility-lock` — this skill **overrides** rule #2 (one scrim, whole block) for hero-over-gradient cases; the three-point rule still applies elsewhere.
