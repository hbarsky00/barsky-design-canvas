---
name: hero-scene-swap
description: Swap the ParallaxHero foreground scene (e.g. Double Mountains → City skyline) without breaking day/night, parallax, weather FX, or text legibility. Use whenever the user asks to replace, restyle, or theme the silhouette layer of the homepage hero.
---

# Hero Scene Swap

The homepage hero in `src/components/hero/ParallaxHero.tsx` paints a layered scene over a day/night sky. The silhouette layer (originally "Double Mountains", now a city skyline) is the ONLY thing you change for a scene swap. Everything else — sky gradient, sun/moon arc, stars, clouds, weather FX, hero text, scroll/mouse parallax — must keep working untouched.

## The four layers that must stay intact

1. `.parallax-sky` / `.parallax-sky-day` — gradient crossfade driven by `isDay`.
2. `.parallax-sun` / `.parallax-moon` — celestial bodies, positioned by CSS, synced to `isDay`.
3. `.parallax-stars` — random star field, parallax-transformed by `starsRef`.
4. `.parallax-mountains` (night) + `.parallax-mountains.parallax-mountains-day` (day) — **THIS is the silhouette layer you replace.** It is the only layer the scene swap touches.

Plus: `<SkyEffects />` and `<WeatherFX />` overlay on top — leave them alone.

## The contract a new scene must satisfy

A replacement silhouette MUST keep all of these or the hero breaks:

- **Two `.parallax-mountains` wrappers** — one default (night), one with the extra `parallax-mountains-day` class. The CSS opacity-crossfades them based on `is-day`. Remove either and one of the two modes goes blank.
- **Inside each, two `.parallax-mountains-drift` children** — `parallax-mountains-back` and `parallax-mountains-front`. These give the depth/parallax. Keep both even if your scene is "flat" — make `back` shorter/dimmer than `front`.
- **Inside each drift child, `{[0, 1].map((i) => …)}`** — the scene SVG is rendered TWICE side-by-side so the CSS drift animation can scroll seamlessly. If you render once, you get a hard cut when it loops.
- **`viewBox="0 0 1200 260"` and `preserveAspectRatio="none"`** on every SVG. Width stretches; height is the silhouette band. Don't change the viewBox without re-deriving every coordinate.
- **Unique gradient `id`s per copy** — use the loop index: `id={`mb-grad-${i}`}` / `mf-grad-${i}` for night, `mbd-grad-${i}` / `mfd-grad-${i}` for day. Duplicate ids across the two copies = the second copy renders with the wrong fill or invisible.
- **Day version uses the SAME path `d=` as night**, just a lighter gradient. Otherwise the silhouette "morphs" during the crossfade.
- **Both day AND night need detail parity** — if night has windows/snowcaps/lights, day needs the equivalent (sunlit windows, lit snow, etc.). A common bug: adding detail only to night, leaving day flat.
- **Detail elements (windows, antennas, snow) live INSIDE the same `<svg>`** as the silhouette path, so they parallax-drift with it. Don't lift them out to absolutely-positioned divs.

## How to do a scene swap

1. **Read the current `parallax-mountains` block first** (both night and day versions) so you know exactly which paths/details exist. Don't guess.
2. **Edit only the four SVG blocks** — night back, night front, day back, day front. Leave the wrappers, refs, classes, and surrounding sky/sun/moon/stars/clouds JSX alone.
3. **Design back-layer first, then front-layer.** Back should be shorter, lower contrast, more compressed peaks/buildings. Front is taller, sharper, the visual anchor.
4. **Mirror night → day.** Copy the night paths verbatim into the day SVGs, swap only the gradient stops and any color-dependent detail fills (e.g. `#ffd27a` glowing windows → `#fff8d6` sunlit reflective windows; window opacity around 0.85–0.9 so they read against a light sky).
5. **Keep the `[0, 1].map` tiling and the per-copy gradient `id` suffix.** This is the single most common breakage.
6. **Do not introduce a third silhouette layer or remove one.** The CSS expects exactly back+front per mode.
7. **Verify by screenshot** in both day and night before claiming done. Confirm: silhouette visible in both modes, no flat/blank layer, no seam at the tile loop boundary, no detail in night that's missing in day.

## Out of scope for this skill

- Sky colors, sun/moon positions, star count, cloud shapes, weather, hero text — those live in other components (`SkyEffects`, `WeatherFX`, `HeroContent`, `themes.css`) and the user did not ask to change them.
- The flat-image scenes (`SCENES` with `image: ...`). Those have their own crossfade stack and are not the silhouette layer.

If the user asks for "a whole new theme" or "different vibe of hero" rather than just a scene swap, stop and clarify — that's a different scope.
