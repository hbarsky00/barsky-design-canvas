## Goal

Make the hero airplane react to its environment: dodge AI-generated alien spaceships that fly toward it from the opposite direction, and kill the dot/light that currently floats in front of the plane and looks like a glitch.

## What's wrong today (in `SkyEffects.tsx` + `themes.css`)

- The plane is a CSS-only `translateX` animation from one edge to the other — no vertical movement, no awareness of anything else.
- A `.sky-airplane-light` blinking dot is appended as a sibling of the plane body. With the body rotated 90°, the dot lands visually in front of the nose instead of at the tail — that's the "stupid dot."
- UFOs exist (`spawnUfo`, emoji 🛸) but they fly the same direction as nothing in particular and don't interact with the plane.

## Plan

### 1. Remove the front-of-plane dot
In `spawnAirplane`, stop appending `sky-airplane-light`. Delete the now-unused `.sky-airplane-light` CSS block in `themes.css`. Nothing else uses it.

### 2. Generate the alien spaceship asset (Pattern A — transparent PNG)
Use `imagegen` at `model: "standard"`, `transparent_background: true`, prompt for a **dark, saturated** classic flying saucer — chrome/obsidian hull, neon underglow, side view, nose pointing LEFT (so when it flies right-to-left toward a left-to-right plane it's "facing" the plane). Save to `src/assets/hero-alien-ship.png`. One asset, mirror via CSS `scaleX(-1)` for the opposite direction. (Per the AI PNG Hero Scenes skill: dark subject so background-removal doesn't strip it.)

### 3. Spawn spaceships that target the plane
Refactor `spawnAirplane` so each plane gets its own controller object:

```text
plane = {
  el, dirX (+1 or -1), x, y, vx, vy, lane (top%)
}
```

Drive the plane with `requestAnimationFrame` instead of a CSS keyframe:
- `x` advances by `vx` each frame (constant horizontal speed, same total crossing time as today: 8–18s).
- `y` eases toward `targetY`. `targetY` defaults to its spawn lane.

When the plane spawns, schedule 1–2 spaceships to appear from the **opposite** edge during its flight. Each ship:
- Same rAF loop, constant horizontal velocity toward the plane.
- Lane chosen close to the plane's current lane so a collision is plausible.
- Rendered as the alien PNG, mirrored to face the plane.

### 4. Dodge logic
Every frame, for each ship, compute predicted distance between the plane and the ship a short time ahead (e.g. 0.4s). If the bounding boxes would overlap horizontally AND vertically within that window:
- Set the plane's `targetY` to ship lane ± a dodge offset (whichever side is further from screen edges, clamped to 5%–60% top).
- Plane tilts: apply a CSS variable `--plane-tilt` (e.g. ±12°) based on sign of `vy`, applied to the inner body so it pitches up/down while still rotated to face travel direction.

Once the ship has passed the plane horizontally, `targetY` eases back to the original cruising lane. Tilt returns to 0.

### 5. Cleanup
- When the plane reaches the far edge, cancel its rAF and remove it + any associated ships still alive.
- Reduced-motion path stays as-is (effect short-circuits, nothing spawns).
- Keep existing star/meteor/heli/ufo loops untouched.

## Files touched

- `src/components/hero/SkyEffects.tsx` — rewrite plane spawn + add ship spawn + rAF loop + dodge logic; remove light dot.
- `src/styles/themes.css` — delete `.sky-airplane-light` rule; add `.sky-alien-ship` (positioning, size ~36px, optional drop-shadow glow) and a `--plane-tilt` rule on `.sky-airplane-body`.
- `src/assets/hero-alien-ship.png` — new AI-generated transparent PNG.

## Out of scope

- No changes to silhouettes, sky gradient, weather, UFO emoji, helicopter, meteors, stars, or scene rotation.
- No collision-explosion FX — just avoidance.
- No sound.

## Open question

Should the plane sometimes **fail** to dodge (the ship grazes/passes through) for variety, or always succeed? Default in this plan: always succeeds — easier to tune, looks intentional rather than buggy.
