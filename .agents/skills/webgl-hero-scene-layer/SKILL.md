---
name: webgl-hero-scene-layer
description: Procedural WebGL (R3F) scenes for the hero silhouette slot — city, beach, etc. ONE canvas per scene; day/night blended inside the scene via body[data-daytime].
type: feature
---

# WebGL Hero Scene Layer

Hero silhouettes (city, beach) are rendered via R3F, not transparent PNGs. Pattern lives in `src/components/hero/silhouettes/WebGL<Scene>Layer.tsx`, mounted by a thin `<Scene>Silhouette.tsx` wrapper inside a single `.parallax-mountains` div.

## HARD RULE: one WebGL canvas per scene

Mounting a night canvas + a day canvas per scene (the old two-wrapper crossfade) doubles WebGL contexts. With two scenes that was 4 contexts and the browser fired `THREE.WebGLRenderer: Context Lost` on a loop — layers went **blank** (this was the "nothing is showing" bug).

- Each scene mounts exactly ONE `<Canvas>`.
- Day/night is blended **inside** the scene: a `useDayTarget()` hook watches `body[data-daytime]` with a MutationObserver, and `useFrame` damps a `day` value (0→1) toward it (`THREE.MathUtils.damp(day, target, 1.6, delta)` ≈ the 2.5s sky crossfade). All colors/lights lerp on `day`.
- The wrapper div keeps `className="parallax-mountains"` for positioning but sets inline `style={{ opacity: 1 }}` so the `.is-day .parallax-mountains { opacity: 0 }` CSS can't hide the single canvas in day mode.
- Scene-to-scene crossfade still works via the parent `.parallax-silhouette-slot` opacity.

## Anatomy
- **Flat shader scene (city)**: `<Canvas orthographic dpr={[1,1.5]} alpha>` with one `<mesh scale={[viewport.width, viewport.height, 1]}>`, `<planeGeometry args={[1,1]} />`, `shaderMaterial` (transparent, depthWrite=false). Uniforms: `uTime`, `uDay` (damped per frame), `uAspect` (size.width/size.height).
- **True 3D scene (beach)**: perspective `<Canvas camera={{ position:[0,2.2,13], fov:38 }} onCreated={({camera}) => camera.lookAt(0,0.4,-18)}>`. Water = displaced plane with wave vertex shader + foam bands; sand = standard-material plane in front (no overlap with water → no z-fighting); people = low-poly capsule/sphere rigs animated in `useFrame`, colors lerped on `day` via `group.traverse`.
- `<Scene>Silhouette.tsx`: ONE `.parallax-mountains` div (inline opacity 1), lazy-loads the layer in `<Suspense fallback={null}>`.

## Critical gotchas
- ONE canvas per scene (see hard rule). Never mount day+night duplicates.
- Orthographic plane MUST be scaled `[viewport.width, viewport.height, 1]` with `1x1` geometry — a raw `2x2` plane renders as 2 pixels.
- Keep `alpha: true` and never render sky inside the scene — the page sky (`SkyEffects` / `themes.css`) shows through above the horizon.
- Don't place 3D people too close to a low-fov camera — they read as blobs. Keep figures at z ≤ ~5 with camera at z=13.
- Coplanar sand+water planes z-fight; give them separate, non-overlapping footprints.
- `LIVE_SCENE_IDS` in `src/components/hero/scenes.ts` must include the scene id with `image: null`.

## Scenes built
- **City** (`WebGLCityLayer`): back + front skylines in one fragment shader, sparse flickering windows, building count scales by `uAspect`.
- **Beach** (`WebGLBeachLayer`): true 3D — animated water plane with crest sparkle + rolling foam + surf line, sand strip, 5 dancing + 2 reclining low-poly figures, day/night lighting lerp.

## When adding a new scene
1. Pick flat-shader (city template) or true-3D (beach template).
2. Use the `useDayTarget()` + damped `day` pattern — never a `day` prop with two canvases.
3. Animate with `uTime`/`useFrame`; theme everything by lerping on `day`.
4. Wrap in a single-div `<Scene>Silhouette.tsx` (inline opacity 1).
5. Register in `scenes.ts` `SCENES` + `LIVE_SCENE_IDS`.
