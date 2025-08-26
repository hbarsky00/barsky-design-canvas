
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
  const BASE_URL = getDynamicBaseUrl();
  
  console.log('🔧 normalizeUrl - Input path:', path);
  
  // Clean the path first
  let cleanPath = path;
  
  // Handle absolute URLs - extract pathname only
  if (path.startsWith('http')) {
    try {
      const url = new URL(path);
      cleanPath = url.pathname;
    } catch (error) {
      console.warn('⚠️ normalizeUrl - Invalid URL, using as-is:', path);
      cleanPath = path;
    }
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  
  // Handle root path - should be just /
  if (cleanPath === '/' || cleanPath === '/index.html' || cleanPath === '/index.htm') {
    const result = `${BASE_URL}/`;
    console.log('✅ normalizeUrl - Root path result:', result);
    return result;
  }
  
  // Remove trailing index.html variations
  cleanPath = cleanPath.replace(/\/index\.html?$/i, '/');
  
  // For non-root paths, ensure they end with / for consistency
  if (!cleanPath.endsWith('/') && !cleanPath.includes('.')) {
    cleanPath = `${cleanPath}/`;
  }
  
  const result = `${BASE_URL}${cleanPath}`;
  console.log('✅ normalizeUrl - Final result:', result);
  return result;
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
