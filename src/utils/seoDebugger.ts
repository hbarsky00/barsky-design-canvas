// SEO Debug Utility - helps identify canonical URL issues
export const debugCanonicalUrl = () => {
  if (typeof window === 'undefined') return;
  
  const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
  const ogUrls = document.querySelectorAll('meta[property="og:url"]');
  const currentUrl = window.location.href;
  
  console.group('🔍 SEO Debug Report');
  console.log('Current URL:', currentUrl);
  console.log('Found canonical links:', canonicalLinks.length);
  canonicalLinks.forEach((link, index) => {
    console.log(`Canonical ${index + 1}:`, (link as HTMLLinkElement).href);
  });
  
  console.log('Found og:url meta tags:', ogUrls.length);
  ogUrls.forEach((meta, index) => {
    console.log(`OG URL ${index + 1}:`, (meta as HTMLMetaElement).content);
  });
  
  // Check for conflicts
  if (canonicalLinks.length > 1) {
    console.warn('⚠️ Multiple canonical URLs detected! This can confuse search engines.');
  }
  
  if (ogUrls.length > 1) {
    console.warn('⚠️ Multiple og:url tags detected! This can confuse social media crawlers.');
  }
  
  console.groupEnd();
  
  return {
    currentUrl,
    canonicalUrls: Array.from(canonicalLinks).map(link => (link as HTMLLinkElement).href),
    ogUrls: Array.from(ogUrls).map(meta => (meta as HTMLMetaElement).content),
    hasConflicts: canonicalLinks.length > 1 || ogUrls.length > 1
  };
};

// Auto-run in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(debugCanonicalUrl, 1000);
    });
  } else {
    setTimeout(debugCanonicalUrl, 1000);
  }
}