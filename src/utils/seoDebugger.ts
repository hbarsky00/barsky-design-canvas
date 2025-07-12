// SEO Debug Utility - helps identify canonical URL issues
export const debugCanonicalUrl = () => {
  if (typeof window === 'undefined') return;
  
  const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
  const ogUrls = document.querySelectorAll('meta[property="og:url"]');
  const currentUrl = window.location.href;
  
  console.group('🔍 SEO Debug Report');
  console.log('Current URL:', currentUrl);
  console.log('Found canonical links:', canonicalLinks.length);
  
  const canonicalUrls = Array.from(canonicalLinks).map(link => (link as HTMLLinkElement).href);
  const ogUrlValues = Array.from(ogUrls).map(meta => (meta as HTMLMetaElement).content);
  
  canonicalUrls.forEach((url, index) => {
    console.log(`Canonical ${index + 1}:`, url);
  });
  
  console.log('Found og:url meta tags:', ogUrls.length);
  ogUrlValues.forEach((url, index) => {
    console.log(`OG URL ${index + 1}:`, url);
  });
  
  // Check for real conflicts (multiple different canonical URLs)
  const hasCanonicalConflicts = canonicalUrls.length > 1 && 
    new Set(canonicalUrls).size > 1;
  
  const hasOgUrlConflicts = ogUrlValues.length > 1 && 
    new Set(ogUrlValues).size > 1;
  
  // Check if canonical and og:url match (they should)
  const canonicalOgMismatch = canonicalUrls.length > 0 && ogUrlValues.length > 0 &&
    canonicalUrls[0] !== ogUrlValues[0];
  
  if (hasCanonicalConflicts) {
    console.error('❌ Multiple different canonical URLs detected! This will confuse search engines.');
    console.log('Conflicting URLs:', [...new Set(canonicalUrls)]);
  }
  
  if (hasOgUrlConflicts) {
    console.error('❌ Multiple different og:url tags detected! This will confuse social media crawlers.');
    console.log('Conflicting URLs:', [...new Set(ogUrlValues)]);
  }
  
  if (canonicalOgMismatch) {
    console.warn('⚠️ Canonical URL and og:url do not match!');
    console.log('Canonical:', canonicalUrls[0]);
    console.log('OG URL:', ogUrlValues[0]);
  }
  
  if (!hasCanonicalConflicts && !hasOgUrlConflicts && !canonicalOgMismatch) {
    console.log('✅ SEO URLs are properly configured');
  }
  
  console.groupEnd();
  
  return {
    currentUrl,
    canonicalUrls,
    ogUrls: ogUrlValues,
    hasConflicts: hasCanonicalConflicts || hasOgUrlConflicts || canonicalOgMismatch,
    hasCanonicalConflicts,
    hasOgUrlConflicts,
    canonicalOgMismatch
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