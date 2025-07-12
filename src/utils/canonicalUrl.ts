// Consolidated canonical URL utility with robust path handling
export const getCanonicalUrl = (pathname?: string): string => {
  const baseDomain = 'https://barskydesign.pro';
  
  // Use provided pathname, React Router pathname, or fallback to window.location
  let currentPath = pathname;
  
  if (!currentPath) {
    // Try to get from window.location if available
    if (typeof window !== 'undefined') {
      currentPath = window.location.pathname;
    } else {
      currentPath = '/';
    }
  }
  
  // CRITICAL FIX: Strip /index.html if present
  if (currentPath.endsWith('/index.html')) {
    currentPath = currentPath.replace('/index.html', '') || '/';
    console.warn('🚨 STRIPPED index.html from path:', currentPath);
  }
  
  // Ensure path starts with /
  if (!currentPath.startsWith('/')) {
    currentPath = '/' + currentPath;
  }
  
  // Remove trailing slash except for root
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1);
  }
  
  // Validate path doesn't contain invalid patterns
  if (currentPath.includes('index.html')) {
    console.error('🚨 INVALID PATH DETECTED:', currentPath);
    currentPath = '/'; // Fallback to root
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