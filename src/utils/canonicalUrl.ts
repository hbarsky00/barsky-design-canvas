// Consolidated canonical URL utility
export const getCanonicalUrl = (pathname?: string): string => {
  const baseDomain = 'https://barskydesign.pro';
  
  // Use provided pathname, React Router pathname, or fallback to window.location
  let currentPath = pathname;
  
  // Debug: log what we're starting with
  console.log('🔗 getCanonicalUrl - Starting with:', {
    providedPathname: pathname,
    windowPathname: typeof window !== 'undefined' ? window.location.pathname : 'undefined',
    windowHref: typeof window !== 'undefined' ? window.location.href : 'undefined'
  });
  
  if (!currentPath) {
    // Try to get from window.location if available
    if (typeof window !== 'undefined') {
      currentPath = window.location.pathname;
    } else {
      currentPath = '/';
    }
  }
  
  // Ensure path starts with /
  if (!currentPath.startsWith('/')) {
    currentPath = '/' + currentPath;
  }
  
  // Remove trailing slash except for root
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1);
  }
  
  const canonicalUrl = `${baseDomain}${currentPath}`;
  
  // Debug logging in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('🔗 Canonical URL generated:', {
      input: pathname,
      windowPath: window.location.pathname,
      finalPath: currentPath,
      canonicalUrl
    });
  }
  
  return canonicalUrl;
};

// Validate that canonical URL matches current page
export const validateCanonicalUrl = (canonicalUrl: string): boolean => {
  if (typeof window === 'undefined') return true;
  
  const currentUrl = window.location.href;
  const normalizedCurrent = currentUrl.replace(/\/$/, '');
  const normalizedCanonical = canonicalUrl.replace(/\/$/, '');
  
  const isValid = normalizedCurrent === normalizedCanonical;
  
  if (!isValid && process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Canonical URL mismatch:', {
      current: currentUrl,
      canonical: canonicalUrl,
      normalized: { current: normalizedCurrent, canonical: normalizedCanonical }
    });
  }
  
  return isValid;
};