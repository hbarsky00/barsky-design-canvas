## Goal

Rebuild the `"3d"` theme's hero scene entirely in **React Three Fiber + Three.js**, keeping the existing behavior (auto-rotating mountains/city/ocean, day/night cycle, weather, sky FX, parallax) but rendered as real 3D meshes inside one `<Canvas>` — no more CSS drift / SVG paths / PNG silhouettes.

HTML hero text (`HeroContent`) stays as crisp DOM layered over the canvas — same pattern as `WebGLNameFx`.

## What changes

### New files
- `src/components/hero/r3f/ParallaxHero3D.tsx` — new top-level `<Canvas>` scene wrapper, replaces `ParallaxHero` for the `"3d"` theme.
- `src/components/hero/r3f/scenes/MountainsScene.tsx` — low-poly mountain ridges (back + front), procedurally generated geometry.
- `src/components/hero/r3f/scenes/CityScene.tsx` — instanced box buildings with lit windows, two depth layers.
- `src/components/hero/r3f/scenes/OceanScene.tsx` — animated low-poly plane with vertex-shader waves.
- `src/components/hero/r3f/sky/SkyDome.tsx` — gradient sky shader, day/night `uMix` uniform crossfade.
- `src/components/hero/r3f/sky/SunMoon.tsx` — sun + moon billboards on an arc, day/night mix.
- `src/components/hero/r3f/sky/Stars.tsx` — Points field, twinkle via shader, opacity ties to night.
- `src/components/hero/r3f/sky/Clouds.tsx` — sprite/plane puffs drifting, count from `clouds` density.
- `src/components/hero/r3f/fx/WeatherFX3D.tsx` — instanced rain/snow particles, GPU-driven fall.
- `src/components/hero/r3f/fx/SkyEffects3D.tsx` — shooting stars / meteors / planes / UFOs as 3D sprites.
- `src/components/hero/r3f/hooks/useDayNight.ts` — extracted 12s cycle.
- `src/components/hero/r3f/hooks/useSceneRotation.ts` — extracted 18s scene rotation for mountains/city/ocean.
- `src/components/hero/r3f/hooks/useParallax.ts` — mouse + scroll → shared camera/group transform.

### Edited files
- `src/components/hero/ThemedHero.tsx` — when `themeId === "3d"`, render `<ParallaxHero3D />` (lazy) instead of the old `<ParallaxHero />`.
- `src/styles/themes.css` — strip `.parallax-*` rules for sky/sun/moon/stars/mountains/clouds/weather/scene-stack/silhouette (they're replaced by canvas). Keep `.parallax-hero` shell + `.parallax-content` text overlay positioning.

### Deleted (after verification)
- `src/components/hero/ParallaxHero.tsx`
- `src/components/hero/SkyEffects.tsx`, `WeatherFX.tsx`
- `src/components/hero/silhouettes/*` (Mountains/City/Ocean)
- Flat scene JPEGs + live silhouette PNGs in `src/assets/` (once 3D versions look right)
- `src/components/hero/scenes.ts` (flat-scene system goes away; everything is real 3D)

## Architecture

```text
ThemedHero ("3d")
└── <ParallaxHero3D>                  // section, lazy-loaded
    ├── <Canvas dpr=[1,2]>            // single canvas
    │   ├── <SkyDome uMix>            // gradient sphere
    │   ├── <Stars />                 // points, hidden by day
    │   ├── <SunMoon uMix>            // arc billboards
    │   ├── <Clouds density>          // drifting planes
    │   ├── <group activeScene>       // mountains | city | ocean (crossfade)
    │   ├── <SkyEffects3D />          // meteors/planes/UFOs
    │   └── <WeatherFX3D mode>        // rain/snow particles
    └── <HeroContent />               // DOM overlay (z-index above canvas)
```

State (in `ParallaxHero3D`):
- `isDay` (12s toggle) → drives `uMix` uniforms 0..1 via lerp in `useFrame`.
- `sceneId ∈ {mountains,city,ocean}` (18s rotation) → group opacities crossfade.
- `weather` (rain | snow | clear, same cycle as today).
- `clouds` density (clear/few/scattered/overcast).
- Mouse + scroll → camera position offset (parallax via depth, not per-layer transforms).

## Stylized low-poly approach (cheap, on-brand)

- Mountains: procedural ridge using `PlaneGeometry(60, 8, 200, 8)` displaced by 1D FBM; flat shading; two layers at z=-30 (back, hazed) and z=-15 (front, sharp). Color from token palette via uniforms.
- City: ~80 instanced box meshes (`InstancedMesh`) with random heights, two depth bands. Windows = emissive UV checker pattern in shader, brighter at night.
- Ocean: `PlaneGeometry(80, 80, 80, 80)`, vertex shader animates sine waves; back-rim mountains as horizon line.
- Sky: inverted sphere with gradient shader, top→horizon colors interpolated between day/night palettes by `uMix`.
- Sun/Moon: two textured planes (procedural radial-gradient shader, no PNG needed) on a CSS-equivalent arc driven by `uMix`.
- Clouds: 6–14 soft alpha-blended sprites, density toggles count + opacity.
- Stars: `THREE.Points` with custom shader for twinkle; alpha = `1 - uMix`.
- Rain/Snow: `InstancedMesh` (rain = thin lines, snow = small flakes) with per-instance velocity uniform; reset Y in shader for infinite fall. ~600 particles for rain, ~300 for snow.
- Sky FX: keep current cadences but render as billboarded planes (shooting star = elongated additive plane, UFO = circular emissive disk + beam cone).

## Performance / quality

- Single `<Canvas dpr={[1, 2]}>`, perspective camera, no shadows.
- `frameloop="always"` only when in viewport; pause via IntersectionObserver.
- Mobile: cap dpr to 1.5, halve cloud + star + particle counts.
- Respect `prefers-reduced-motion`: disable mouse parallax, freeze cycles at current state.
- Lazy import the whole `ParallaxHero3D` so three.js isn't on the critical path for other themes.

## What stays untouched

- `HeroContent.tsx` (text, links, layout) — still DOM overlay.
- All other hero themes (terminal, llm-chat, win95, 8bit, md, structural, flash/brutalism/swiss/1990s) — unchanged.
- `AnimatedName` / `WebGLNameFx` — already done, unrelated.
- Header, footer, navigation — unchanged.

## Verification steps

1. Switch to the `"3d"` theme, watch a full 36s cycle (covers two day/night + two scene rotations). Each scene must be visibly different and 3D, day/night must crossfade smoothly.
2. Resize from 1440 → 360 — no jank, particle counts drop on mobile.
3. Toggle OS reduced-motion — animations freeze, no GPU spin.
4. Confirm hero text stays sharp and clickable.
5. Confirm no other theme regressed (terminal/win95/llm-chat still render).

## Scope guardrails

- I will NOT touch other hero themes, Header, Footer, or any case-study page.
- I will NOT delete the old `ParallaxHero` files until the new one is verified in preview.
- I will NOT introduce postprocessing/EffectComposer — keeps bundle slim.
- I will NOT add new dependencies; uses the already-pinned `three@^0.160`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`.

## Estimated size

~10 new component files (~80–180 lines each), 1 edit to `ThemedHero.tsx`, ~150 lines stripped from `themes.css`. Roughly a large single pass.
