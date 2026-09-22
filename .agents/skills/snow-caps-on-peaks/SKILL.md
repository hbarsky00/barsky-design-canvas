---
name: snow-caps-on-peaks
description: Place SVG snow caps so they sit ON mountain peaks and read as snow, not floating triangles or down-arrows. Use whenever drawing or fixing snow on a mountain silhouette (e.g. ParallaxHero MountainsSilhouette).
---

# Snow Caps On Peaks

A snow cap must look like snow that has settled on a peak. The two failure modes you keep hitting:

1. **Arrow-shaped polygons** — a multi-point shape (peak + dip back down + base) reads as a down-arrow or diamond, not snow.
2. **Floating snow** — caps drawn on the back/blurred parallax layer end up disconnected from any visible peak because the back silhouette is dim and blurred. The snow appears to hover in the sky between front peaks.

## Rules

1. **A snow cap is a single triangle.** Three points: peak apex on top, two base points below. Nothing else. No concave shapes, no double-pointed crowns, no "M" curves.
2. **Apex sits exactly at the peak coordinate.** If the mountain peak is at `(390, 55)`, the snow apex is `(390, 55)` — same x, same y. Not above, not offset.
3. **Base points sit ON the mountain slopes.** For a peak at `(px, py)` with left slope descending to `(lx, ly)` and right slope descending to `(rx, ry)`, choose a base depth `d` (typically 15–22 px), then compute base points by walking down each slope:
   - left base: `(px - (px - lx) * d / (ly - py), py + d)`
   - right base: `(px + (rx - px) * d / (ry - py), py + d)`
   This guarantees the base sits inside the silhouette and the cap inherits the mountain's slope angle.
4. **Only cap the FRONT layer.** The back parallax layer uses `opacity: 0.55` and `filter: blur(1px)` — snow drawn on it looks floaty and detached. Leave back peaks bare (or use a faint dusting via a path stroke, never a freestanding triangle).
5. **Cap only the tallest 1–2 peaks per scene.** Capping every peak looks busy and reads as wallpaper, not weather. Pick the dominant front summits.
6. **Color/opacity:** plain `#ffffff` at `opacity` 0.85–0.95. No gradients. The contrast against the dark silhouette IS the snow.
7. **Day version uses the same triangle.** Snow stays white in daylight; just keep the same polygon points in the day SVG so the silhouette doesn't morph during day/night crossfade.

## Anti-patterns (do not do)

- `polygon points="370,80 390,55 410,80 405,90 395,82 385,90"` — six points, concave bottom = down-arrow.
- Snow on the back layer at a y-position that lands between two front peaks — looks like a floating diamond in the sky.
- Snow with apex above the peak coordinate (e.g. peak at y=55, snow apex at y=45) — reads as a hat hovering above the mountain.
- Tiny snow squares or rects — read as windows, not snow.

## Checklist before claiming done

- [ ] Every snow polygon is exactly 3 points.
- [ ] Every snow apex matches a front-peak `(x, y)` from the silhouette path.
- [ ] No snow on the back layer.
- [ ] At most 2 caps per scene.
- [ ] Same polygons appear in both night and day SVGs.
- [ ] Visual check (screenshot, day AND night): caps sit on peaks, no floating shapes between mountains.
