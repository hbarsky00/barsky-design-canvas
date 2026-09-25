/**
 * Emit intrinsic width/height for every image under public/ that a page can
 * reference, into src/data/imageDimensions.json.
 *
 * Why: 207 of 260 <img> tags on the live site shipped with no width/height, so
 * every one of them was a CLS contribution. The dimensions have to come from the
 * files themselves — guessing an aspect ratio is how you get a squashed image.
 *
 * Runs in prebuild, so adding or replacing an image updates the manifest without
 * anyone remembering to.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

// src/assets holds the blog covers that Vite bundles to /assets/<name>-<hash>.jpg.
// public/uploads is referenced by absolute URL from some blog bodies.
const ROOTS = [
  "public/images", "public/blog", "public/blog-images",
  "public/lovable-uploads", "public/uploads", "src/assets",
];
// iCloud conflict copies ("name 2.jpg"). Gitignored, unreferenced, and they were
// polluting the manifest — one produced 46861x64655 from a truncated header read.
const CONFLICT_COPY = /\s\d+\.[a-z0-9]+$/i;
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

/** Intrinsic size straight from the file header. No decoding, no dependency. */
function dimensions(buf, ext) {
  try {
    if (ext === ".png" && buf.readUInt32BE(0) === 0x89504e47) {
      return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
    }
    if (ext === ".gif") return [buf.readUInt16LE(6), buf.readUInt16LE(8)];
    if (ext === ".jpg" || ext === ".jpeg") {
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        const len = buf.readUInt16BE(i + 2);
        // SOF0..SOF15, skipping the non-frame markers in that range.
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
        }
        i += 2 + len;
      }
      return null;
    }
    if (ext === ".webp" && buf.toString("ascii", 8, 12) === "WEBP") {
      const fmt = buf.toString("ascii", 12, 16);
      if (fmt === "VP8X") return [(buf.readUIntLE(24, 3) & 0xffffff) + 1, (buf.readUIntLE(27, 3) & 0xffffff) + 1];
      if (fmt === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
      if (fmt === "VP8L") {
        const b = buf.readUInt32LE(21);
        return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
      }
      return null;
    }
  } catch {
    return null;
  }
  return null;
}

const out = {};
let scanned = 0;
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    const ext = extname(e.name).toLowerCase();
    if (!EXT.has(ext)) continue;
    if (CONFLICT_COPY.test(e.name)) continue;
    scanned++;
    // 64KB is plenty for every header format above.
    const fd = readFileSync(p).subarray(0, 65536);
    const d = dimensions(fd, ext);
    // Sanity bound: a header misread yields absurd numbers, and a wrong
    // width/height is worse than none — it squashes the image.
    if (!d || d[0] < 1 || d[1] < 1 || d[0] > 20000 || d[1] > 20000) continue;
    if (p.startsWith("src/assets")) {
      // Keyed by basename: the served path carries a Vite content hash.
      out["@asset/" + e.name] = d;
    } else {
      out[p.replace(/^public/, "")] = d;
    }
  }
};
for (const r of ROOTS) if (existsSync(r)) walk(r);

const sorted = Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
writeFileSync("src/data/imageDimensions.json", JSON.stringify(sorted) + "\n");
console.log(`🖼️  image dimensions: ${Object.keys(sorted).length} of ${scanned} images measured`);
