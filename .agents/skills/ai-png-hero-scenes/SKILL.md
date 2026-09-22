---
name: ai-png-hero-scenes
description: When the user asks to add, replace, or fix a hero parallax scene (mountains, city, ocean, etc.) with an AI-generated image. Covers transparent-bg silhouettes (live drift layers) and full-bleed flat scenes. Use whenever the user says "make a scene like this", "swap this silhouette", "the image is cut", "the image has a background", "make it move", or asks for a new live silhouette or new flat scene.
---

# AI PNG Hero Scenes

ParallaxHero supports two kinds of AI-generated scenes. Picking the wrong one is the #1 cause of "blank image", "cut image", or "still image" complaints.

## Decision tree (read first)

Does the subject have a clear silhouette against a sky?

- **Yes — distinct dark shape against negative space** (mountains, city skyline, forest treeline, dunes): build it as a **LIVE SILHOUETTE** (transparent PNG, drifts, day/night crossfade). Sky/sun/moon/stars/weather render behind it.
- **No — full atmospheric scene** (ocean horizon, beach, snowfield, desert, aurora, fog): build it as a **FLAT SCENE** (full-bleed JPG, no transparency, no drift). It replaces the entire hero backdrop.

**Anti-pattern:** trying to make ocean / sky / fog / pale subjects transparent. The bg-removal pipeline strips white/light areas — wave foam, mist, pale water all get deleted, leaving a blank PNG. If the subject is light, use a flat JPG.

---

## Pattern A — LIVE SILHOUETTE (transparent PNG, drifts)

### How

1. Generate two transparent PNGs (night + day) at `1920×704`, `model: "standard"`, `transparent_background: true`. Prompt MUST:
   - Describe a wide panoramic silhouette
   - Use a DARK or SATURATED subject (light subjects vanish in bg removal)
   - Say "on a solid white background"
   - Say "edge-to-edge composition, [subject] NOT touching the top or side edges" (prevents cuts)
   - Say "no sky, no foreground, no text"
2. Save to `src/assets/hero-<scene>-night.png` and `src/assets/hero-<scene>-day.png`.
3. Create `src/components/hero/silhouettes/<Scene>Silhouette.tsx` modeled exactly on `MountainsSilhouette.tsx` — two `.parallax-mountains` wrappers (night + day with `.parallax-mountains-day`), each with `.parallax-mountains-back` and `.parallax-mountains-front` drift containers, each containing `renderTiles()` with the SAME image tile twice (second one has `className="is-mirrored"` for seamless wrap).
4. Wire the slot in `ParallaxHero.tsx` (`<div className="parallax-silhouette-slot" data-silhouette="<id>">`) and add the id to `LIVE_SCENE_IDS` in `scenes.ts` with `image: null`.

### Critical CSS contract (already in `src/styles/themes.css`)
- `.parallax-mountains-drift > img { flex: 0 0 50%; width: 50%; height: 100%; object-fit: fill; }` — `fill` (not `cover`) is what stops the image getting cropped. Do NOT change to `cover`.
- `.is-mirrored { transform: scaleX(-1); }` — second tile mirrored so the loop seam is invisible.
- Back drift: 25s, blurred, 55% opacity. Front drift: 40s. If user says "doesn't look like it's moving", lower these.

### Verification
Look at the returned image. If it's mostly white/blank, bg-removal stripped the subject — regenerate with a DARKER prompt, or switch to Pattern B.

---

## Pattern B — FLAT SCENE (full-bleed JPG)

### How

1. Generate one JPG per time-of-day at `1920×1088`, `model: "standard"`, omit `transparent_background`. Prompt freely — full sky, full subject, photographic, cinematic.
2. Save to `src/assets/scenes/<name>.jpg`.
3. Add to `SCENES` in `src/components/hero/scenes.ts`:
   ```ts
   { id: "<name>", label: "<Label>", image: <importedJpg>, textMode: "light" | "dark" }
   ```
   `textMode: "dark"` for bright scenes (hero text becomes dark), `"light"` for dark scenes.
4. Do NOT add to `LIVE_SCENE_IDS`. Flat scenes auto-render via `.parallax-scene-stack` crossfade.

### Critical
- Flat scenes do not drift and do NOT show sky/sun/moon/stars/weather — they bake their own sky. Intentional.
- One JPG = one scene. Day + night = two scene entries.

---

## Out of scope
- Sky gradient, sun/moon arc, stars, clouds, weather FX, hero text — owned by `SkyEffects`, `WeatherFX`, `HeroContent`, `themes.css`. Don't touch for a scene swap.
- Scene rotation timer in `ParallaxHero.tsx`. Don't change durations as part of a scene swap.

## Common failures and the fix
- **"White box / background around it"** → wrong pattern (flat JPG where silhouette PNG was needed) OR forgot `transparent_background: true`.
- **"Image is cut / half cut"** → CSS `object-fit` is `cover` instead of `fill`, OR prompt didn't include "NOT touching the top or side edges".
- **"PNG came back blank"** → subject was too light; bg-removal stripped it. Switch to Pattern B or rewrite prompt much darker/more saturated.
- **"Looks like a still image, not moving"** → drift `animation-duration` too high. Back 25s, front 40s, or less.
- **"Day looks broken / blank"** → only built night and forgot day. Pattern A needs BOTH `parallax-mountains` wrappers.
