import DIMS from "@/data/imageDimensions.json";

const TABLE = DIMS as Record<string, [number, number]>;
const ORIGIN = "https://barskydesign.pro";

/**
 * Intrinsic width/height for an image, for spreading onto an <img>.
 *
 * 207 of 260 <img> tags on the live site had no dimensions, so each was a layout
 * shift waiting to happen. Values come from src/data/imageDimensions.json,
 * generated from the real files in prebuild — never guessed, because a wrong
 * aspect ratio squashes the image instead of reserving space for it.
 *
 * Handles four shapes of src:
 *   /images/foo.webp                     → direct lookup
 *   https://barskydesign.pro/images/foo   → same-origin, strip the origin
 *   /assets/cover-A1b2C3.jpg             → Vite-hashed bundle, match by basename
 *   https://images.unsplash.com/…?w=800&h=400 → dimensions are in the query
 *
 * Returns {} for anything else, so the spread is a no-op rather than a broken
 * attribute.
 */
export const imgDims = (src?: string): { width?: number; height?: number } => {
  if (!src) return {};

  // Unsplash and similar CDNs state the rendered size in the query string.
  const q = src.indexOf("?");
  if (q !== -1) {
    const params = new URLSearchParams(src.slice(q + 1).replace(/&amp;/g, "&"));
    const w = Number(params.get("w"));
    const h = Number(params.get("h"));
    if (w > 0 && h > 0) return { width: w, height: h };
  }

  let path = src.split("?")[0].split("#")[0];
  if (path.startsWith(ORIGIN)) path = path.slice(ORIGIN.length);
  if (!path.startsWith("/")) return {};
  path = decodeURIComponent(path);

  const direct = TABLE[path];
  if (direct) return { width: direct[0], height: direct[1] };

  // /assets/<name>-<8-or-more-char hash>.<ext> → <name>.<ext>
  const m = /^\/assets\/(.+)-[A-Za-z0-9_-]{8,}(\.[a-z0-9]+)$/i.exec(path);
  if (m) {
    const byName = TABLE["@asset/" + m[1] + m[2]];
    if (byName) return { width: byName[0], height: byName[1] };
  }

  return {};
};
