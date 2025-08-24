import { SEO_CONSTANTS } from "@/utils/seoConstants";

/**
 * Harmonized URL normalization for both client and server
 * Ensures consistent canonical URLs across all environments
 */
export function normalizeCanonicalUrl(path: string): string {
  // Clean the path first
  let cleanPath = path;
  
  // Handle absolute URLs - extract pathname only
  if (path.startsWith('http')) {
    try {
      const url = new URL(path);
      cleanPath = url.pathname;
    } catch (error) {
      console.warn('⚠️ normalizeCanonicalUrl - Invalid URL, using as-is:', path);
      cleanPath = path;
    }
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  
  // Handle root path - should be just /
  if (cleanPath === '/' || cleanPath === '/index.html' || cleanPath === '/index.htm') {
    return `${SEO_CONSTANTS.BASE_URL}/`;
  }
  
  // Remove trailing index.html variations
  cleanPath = cleanPath.replace(/\/index\.html?$/i, '/');
  
  // For non-root paths, ensure they end with / for consistency
  if (!cleanPath.endsWith('/') && !cleanPath.includes('.')) {
    cleanPath = `${cleanPath}/`;
  }
  
  return `${SEO_CONSTANTS.BASE_URL}${cleanPath}`;
}

/**
 * Handle URL aliases and redirects consistently
 */
export function resolveUrlAliases(path: string): string {
  const aliases: Record<string, string> = {
    '/project/wholesale-distribution': '/project/business-management'
  };
  
  return aliases[path] || path;
}