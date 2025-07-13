/**
 * URL normalization utilities for consistent canonical URLs across the application
 */

export const BASE_URL = 'https://barskydesign.pro';

/**
 * Normalizes a URL path to ensure consistency across the application
 * - Removes trailing slashes except for root path
 * - Handles index.html variations
 * - Returns consistent canonical format
 */
export const normalizeUrl = (path: string): string => {
  // Handle root path variations
  if (path === '/' || path === '/index.html' || path === '') {
    return BASE_URL;
  }
  
  // Remove trailing slash for non-root paths
  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  // Ensure path starts with /
  const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${BASE_URL}${finalPath}`;
};

/**
 * Gets the canonical URL for the current pathname
 */
export const getCanonicalUrl = (pathname: string): string => {
  return normalizeUrl(pathname);
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