## Goal
The front mountain range in `src/assets/mountains-foreground.svg` currently reads as harsh zig-zag jagged edges with no snow. Redraw it so it looks like proper mountains and add snow caps to its tallest peaks (matching the style already used on the back range).

## Changes
**File:** `src/assets/mountains-foreground.svg` (front-range group only)

1. Replace the front-range `<path>` with a redrawn silhouette:
   - Fewer, more deliberate peaks with varied heights (3–4 dominant summits, smaller foothills between)
   - Asymmetric slopes (one side steeper than the other) instead of uniform triangles
   - Slightly curved/sloped segments using a mix of `L` line commands at intermediate points to avoid pure sawtooth look
   - Keep viewBox `0 0 1600 500` and `preserveAspectRatio="none"` untouched so layout doesn't shift

2. Add snow caps on the 3 tallest front-range peaks, using the same technique as the back range:
   - Small white polygon (`fill-opacity="0.85"`) hugging each summit
   - Jagged lower edge so snow looks like it's clinging to the peak, not a hat

3. Leave the back range and mid range paths completely untouched.

## Out of scope
- No changes to colors, CSS, or any other component
- No changes to the parallax hero layout, sun, moon, or positioning
- Back and mid mountain ranges stay exactly as they are
