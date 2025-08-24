
/**
 * Simplified URL normalization utilities for consistent canonical URLs
 */

const PRODUCTION_BASE_URL = 'https://barskydesign.pro';

/**
 * Gets the base URL - always returns production domain for canonical URLs
 */
const getDynamicBaseUrl = (): string => {
  // Always use production domain for canonical URLs regardless of environment
  return PRODUCTION_BASE_URL;
};

/**
 * Normalizes a URL path to ensure consistency - SIMPLIFIED VERSION
 * - Always returns production canonical URLs
 * - Handles trailing slashes correctly
 * - No complex path manipulation
 */
export const normalizeUrl = (path: string): string => {
  // Use the new unified normalizer
  const { normalizeCanonicalUrl } = require('@/utils/seo/urlNormalizer');
  return normalizeCanonicalUrl(path);
};

/**
 * Gets the canonical URL for the current pathname
 */
export const getCanonicalUrl = (pathname: string): string => {
  console.log('🔍 getCanonicalUrl - Input pathname:', pathname);
  const result = normalizeUrl(pathname);
  console.log('🔍 getCanonicalUrl - Output canonical:', result);
  return result;
};

/**
 * Extracts the clean path from a full URL for consistent routing
 */
export const getCleanPath = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    
    // Handle root variations
    if (path === '/' || path === '/index.html') {
      return '/';
    }
    
    return path;
  } catch {
    // Fallback for relative paths
    return url;
  }
};
