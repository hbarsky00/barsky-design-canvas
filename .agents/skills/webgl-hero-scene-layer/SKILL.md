---
name: WebGL Hero Scene Layer
description: Procedural WebGL (R3F + shader) scenes for the hero silhouette slot — city, beach, etc. Single fragment shader per day/night, slots into .parallax-mountains.
type: feature
---

# WebGL Hero Scene Layer

Hero silhouettes (city, beach) are now rendered via R3F shader, not transparent PNGs. Pattern lives in `src/components/hero/silhouettes/WebGL<Scene>Layer.tsx` and is mounted by a thin `<Scene>Silhouette.tsx` wrapper that keeps the `.parallax-mountains` + `.parallax-mountains-day` two-wrapper crossfade contract.

## Anatomy
- `WebGL<Scene>Layer.tsx`: `<Canvas orthographic dpr={[1,1.5]} alpha>` containing one `<mesh scale={[viewport.width, viewport.height, 1]}>` with `<planeGeometry args={[1,1]} />` and a `shaderMaterial` (transparent, depthWrite=false). Uniforms: `uTime`, `uDay` (0 night, 1 day), `uAspect` (size.width/size.height, updated per frame).
- `<Scene>Silhouette.tsx`: two `.parallax-mountains` divs (night + `.parallax-mountains-day`), each lazy-loads `<WebGLLayer day={0|1} />` inside `<Suspense fallback={null}>`. CSS opacity-crossfades the two via `.is-day` on parent.

## Critical gotchas
- Plane MUST be scaled to `[viewport.width, viewport.height, 1]` with `1x1` geometry. A raw `2x2` plane in an orthographic camera renders as 2 pixels (the camera frustum is in pixel units after R3F's default sizing). This was the "blank" bug.
- Use HSL-free direct `vec3` colors inside the shader — fine here since the layer composites under the page sky which provides the theme.
- Sky/sun/moon/stars/weather stay owned by `SkyEffects` / `WeatherFX` / `themes.css`. Never render sky inside the shader; keep `transparent: true` and let the page sky show through above the scene's horizon.
- `LIVE_SCENE_IDS` in `src/components/hero/scenes.ts` must include the scene id with `image: null`.

## Scenes built
- **City** (`WebGLCityLayer`): two skyline layers (back denser/shorter, front taller/sharper) drawn in one shader. Sparse lit windows with flicker. Building count scales by `uAspect` so towers stay narrow on wide screens.
- **Beach** (`WebGLBeachLayer`): horizon band + animated wave ripples + foam line + sand with grain noise + people silhouettes via SDF capsules/circles (4 dancers with sin-driven arms/legs, 2 reclining relaxers). Replaced the previous failed ocean PNGs.

## When adding a new scene
1. Copy `WebGLCityLayer.tsx` as a template, rewrite the fragment shader's `main()`.
2. Build silhouettes with SDF primitives (`sdCapsule`, `sdCircle`) + `smoothstep` for anti-aliasing.
3. Animate with `uTime`; theme with `mix(nightCol, dayCol, uDay)`.
4. Wrap in a `<Scene>Silhouette.tsx` matching the two-wrapper contract.
5. Register in `scenes.ts` `SCENES` + `LIVE_SCENE_IDS`.
