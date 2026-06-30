/**
 * Image Resolver
 *
 * Maps known broken/legacy remote image URLs to local files in /public/images.
 * Use `resolveImageSrc(src)` anywhere an <img src> is set so old WordPress,
 * Supabase Storage, and barskydesign.pro paths transparently fall back to the
 * matching local asset instead of rendering as broken links.
 */

const DEFAULT_FALLBACK = '/images/default-og-image.jpg';

// Explicit overrides for URLs we know the canonical local replacement for.
const EXPLICIT_MAP: Record<string, string> = {
  'https://barskydesign.pro/images/hiram-barsky-headshot.jpg': '/images/hiram-barsky-headshot.jpg',
  'https://barskydesign.pro/images/herbalink-desktop-1.webp': '/images/herbalink-promo.png',
  'https://barskydesign.pro/images/splittime-desktop-1.webp': '/images/desktop-signup-1.png',
  'https://barskydesign.pro/images/dae-search-desktop-1.webp': '/images/dae/dashboard.webp',
};

// Keyword -> local path. First match wins. Keys are lowercased substrings
// tested against the URL (path + filename).
const KEYWORD_MAP: Array<[string, string]> = [
  ['herbalink', '/images/herbalink-promo.png'],
  ['herbalist', '/images/herbalink-promo.png'],
  ['splittime', '/images/desktop-signup-1.png'],
  ['split-time', '/images/desktop-signup-1.png'],
  ['co-parent', '/images/desktop-signup-1.png'],
  ['dae-search', '/images/dae/dashboard.webp'],
  ['dae/', '/images/dae/dashboard.webp'],
  ['email-ai', '/images/email-ai-promo.png'],
  ['emailai', '/images/email-ai-promo.png'],
  ['email-creation', '/images/email-ai-promo.png'],
  ['manuscript', '/images/email-ai-promo.png'],
  ['headshot', '/images/hiram-barsky-headshot.jpg'],
  ['hiram', '/images/hiram-barsky-headshot.jpg'],
];

// Hosts whose images are known to be unreachable and should be remapped.
const BROKEN_HOSTS = [
  'barskyux.com',
  'ctqttomppgkjbjkckise.supabase.co',
  'barskydesign.pro/images/',
];

const isBrokenRemote = (src: string): boolean =>
  BROKEN_HOSTS.some((host) => src.includes(host));

/**
 * Resolve an image src against the local-asset map.
 * - Local paths (/...) and data/blob URLs pass through unchanged.
 * - Known remote URLs are rewritten to a local file.
 * - Unknown but broken hosts fall through to the default OG image.
 * - Everything else is returned as-is.
 */
export function resolveImageSrc(src?: string | null): string {
  if (!src) return DEFAULT_FALLBACK;
  if (src.startsWith('data:') || src.startsWith('blob:')) return src;
  if (src.startsWith('/') && !src.startsWith('//')) return src;

  if (EXPLICIT_MAP[src]) return EXPLICIT_MAP[src];

  const lower = src.toLowerCase();
  for (const [needle, local] of KEYWORD_MAP) {
    if (lower.includes(needle)) return local;
  }

  if (isBrokenRemote(src)) return DEFAULT_FALLBACK;

  return src;
}

export const DEFAULT_IMAGE_FALLBACK = DEFAULT_FALLBACK;
