---
name: webgl-name-fx
description: Use Three.js + React Three Fiber (WebGL) for premium, realistic-feeling text/name animations on barskydesign.pro (header name, hero titles, badges). Apply when the user asks for richer, smoother, or more "real" motion than CSS keyframes can deliver. Covers the AnimatedName/WebGLNameFx pattern, dependency pins, performance rules, and a11y.
---

# WebGL Name FX (Three.js + R3F)

Premium text/name animations on barskydesign.pro use **WebGL shaders via React Three Fiber**, not CSS keyframes. CSS is fine for micro-interactions; for anything that should feel "alive" (header name, hero title, identity badge) use the pattern below.

## Pinned versions (do not bump)

```
three@^0.160.0
@react-three/fiber@^8.18.0
@react-three/drei@^9.122.0   # only if needed; drei isn't required for shader-only FX
```

R3F v9 / drei v10 require React 19. This project is React 18 — never upgrade past these.

## Architecture

Crisp HTML text on top, WebGL canvas overlay behind. Never render the actual text inside the canvas — typography stays sharp, accessible, and SEO-readable.

```
<span class="relative inline-block">
  <span class="relative z-10">Hiram Barsky</span>   {/* real text */}
  <Suspense fallback={null}>
    <WebGLNameFx effect={n} active={bool} />        {/* absolute, pointer-events-none */}
  </Suspense>
</span>
```

Reference implementation:
- `src/components/shared/AnimatedName.tsx` — cycles `effect` 0..5 every 15s, `active=true` for 2.5s
- `src/components/shared/WebGLNameFx.tsx` — R3F `<Canvas>` + single shader plane, 6 effects (aurora, particles, shimmer, ripple, glow, prism), additive blending, `mix-blend-mode: screen`

## Rules

1. **HTML text on top, WebGL behind.** Never draw the name with `drei/Text` for the name itself — kills SEO/crispness/a11y. The shader is decorative only.
2. **One `<Canvas>` per FX layer, lazy-imported.** Use `React.lazy` + `Suspense` so three.js (~150KB gz) doesn't block first paint.
3. **`pointer-events: none` + `aria-hidden`** on the FX wrapper. The text underneath handles all interaction and screen-reader output.
4. **Respect `prefers-reduced-motion`** — skip mounting `<WebGLNameFx>` entirely when the user prefers reduced motion.
5. **Cap dpr** at `[1, 2]` and use `orthographic` camera for 2D FX — cheap on mobile.
6. **Additive blending + transparent material** so the FX layer composites cleanly over any background (light/dark).
7. **Honor existing token colors** — pull from `--primary` / brand blues, don't hardcode arbitrary palettes.
8. **Effect duration ≤ 2.5s, idle ≥ 12s.** A constantly-animated name is noise, not premium.
9. **No new heavy meshes for text FX.** Single fullscreen plane + shader is enough. Don't pull in postprocessing/EffectComposer for this use case.

## When to use this skill

- "Make the name animation feel more real / premium / smoother"
- "Add a glow / aurora / shimmer / particle effect to [name|title|logo]"
- "Use WebGL / Three.js / shaders for [text effect]"
- Any request to upgrade `AnimatedName` or add a sibling animated-text component

## When NOT to use

- Button hovers, accordion expands, toast slide-ins → plain CSS / Tailwind animations
- Body copy or long paragraphs → never
- Hero background scenes with 3D geometry → that's a different pattern, build a dedicated R3F scene component under `src/components/3d/`

## Extending with a new effect

1. Add a new branch in the fragment shader inside `WebGLNameFx.tsx` (`else if (uEffect == 6) col = myEffect(vUv);`).
2. Bump `EFFECT_COUNT` in `AnimatedName.tsx`.
3. Keep the `env()` envelope so all effects fade in/out consistently.
4. Test on mobile (892x667 dpr=2 and 360x701 dpr=3) — if it drops below 50fps, simplify.

## Anti-patterns

- Rendering text inside a `<Canvas>` for SEO/visible page text.
- Multiple `<Canvas>` instances per page just for text FX — composite into one if needed.
- Forgetting `Suspense` / lazy load — bundles three.js into the critical path.
- Animating every 1–2s — feels jittery and steals attention from content.
- Removing `prefers-reduced-motion` handling.
