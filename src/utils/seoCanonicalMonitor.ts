/**
 * SEO Canonical Monitor - Ensures single canonical tags
 */

export const monitorCanonicalTags = () => {
  if (typeof window === 'undefined') return;

  // Check for duplicate canonical tags
  const canonicalTags = document.querySelectorAll('link[rel="canonical"]');
  
  if (canonicalTags.length > 1) {
    console.warn('🚨 Multiple canonical tags detected:', canonicalTags.length);
    
    // Keep only the first canonical tag (from Helmet)
    for (let i = 1; i < canonicalTags.length; i++) {
      canonicalTags[i].remove();
    }
    
    console.log('✅ Duplicate canonical tags removed');
  }

  // Validate canonical URL format
  const canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (canonicalTag) {
    const canonicalUrl = canonicalTag.href;
    
    // Check if URL is properly formatted
    if (!canonicalUrl.startsWith('https://barskydesign.pro')) {
      console.warn('⚠️ Canonical URL format issue:', canonicalUrl);
    }
    
    // Log for debugging
    console.log('🔍 Canonical URL set:', canonicalUrl);
  }
};

/**
 * Initialize canonical monitoring
 */
export const initCanonicalMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Monitor after page load
  window.addEventListener('load', () => {
    setTimeout(monitorCanonicalTags, 500);
  });
  
  // Monitor after DOM changes
  const observer = new MutationObserver(() => {
    setTimeout(monitorCanonicalTags, 100);
  });
  
  observer.observe(document.head, {
    childList: true,
    subtree: true
  });
  
  // Cleanup observer on page unload
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
};
