
/**
 * URL normalization utilities for consistent canonical URLs across the application
 */

const getDynamicBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.REACT_APP_BASE_URL || 'https://barskydesign.pro';
};

/**
 * Normalizes a URL path to ensure consistency across the application
 * - Removes trailing slashes except for root path
 * - Handles index.html variations
 * - Returns consistent canonical format
 */
export const normalizeUrl = (path: string): string => {
  const BASE_URL = getDynamicBaseUrl();
  
  // Normalize to pathname only and handle absolute/relative inputs
  try {
    const u = new URL(path, BASE_URL);
    path = u.pathname;
  } catch {
    // keep original path if URL constructor fails
  }

  // Handle root path variations
  if (path === '' || path === '/' || path === '/index.html' || path === '/index.htm') {
    return `${BASE_URL}/`;
  }

  // Strip any trailing index.html from paths
  path = path.replace(/\/index\.html?$/i, '/');

  // Ensure path starts with '/'
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  // Remove extra trailing slashes first
  path = path.replace(/\/+$/, '');

  // Determine if the last segment looks like a file (has an extension)
  const lastSegment = path.split('#')[0].split('?')[0].split('/').pop() || '';
  const isFile = /\.[a-z0-9]+$/i.test(lastSegment);

  // Ensure trailing slash for non-file paths
  if (!isFile && !path.endsWith('/')) {
    path = `${path}/`;
  }

  return `${BASE_URL}${path}`;
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
