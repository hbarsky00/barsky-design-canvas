
// Simplified debug utility focused on preserving dev work
export const debugCache = {
  log: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`🔍 [${timestamp}] ${message}`, data);
  },

  // Check if we're in dev mode
  isDevMode: () => {
    return localStorage.getItem('devMode') === 'true' ||
           process.env.NODE_ENV === 'development' ||
           window.location.hostname === 'localhost';
  },

  // SAFE: Only clear specific published cache entries
  clearOnlyPublishedCache: () => {
    console.log('🧹 Clearing ONLY published cache (preserving ALL dev work)');
    
    const keysToRemove: string[] = [];
    
    Object.keys(localStorage).forEach(key => {
      // Only clear published cache, never dev mode data
      if (key.startsWith('published_') && !key.includes('dev')) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared published cache: ${key}`);
    });

    console.log(`✅ Published cache cleared (${keysToRemove.length} items) - ALL DEV WORK PRESERVED`);
  },

  // MINIMAL: Clear only image display cache, not dev work
  clearImageCache: () => {
    console.log('🖼️ Clearing image display cache only');
    
    // Force browser to reload images by clearing display cache
    document.querySelectorAll('img').forEach(img => {
      const src = img.src;
      if (src && !src.includes('?refresh=')) {
        img.src = src + (src.includes('?') ? '&' : '?') + 'refresh=' + Date.now();
      }
    });
    
    console.log('✅ Image display cache cleared, dev work preserved');
  },

  // SMART: Only clear what's needed based on environment
  smartClear: () => {
    const isDev = debugCache.isDevMode();
    
    if (isDev) {
      console.log('🛡️ DEV MODE: Using minimal clearing to preserve work');
      debugCache.clearOnlyPublishedCache();
    } else {
      console.log('🏭 PRODUCTION MODE: Safe to clear more cache');
      localStorage.removeItem('published_cache');
      debugCache.clearImageCache();
    }
  },

  // Get cache key with environment awareness
  getCacheKey: (baseKey: string) => {
    const isDev = localStorage.getItem('devMode') === 'true';
    return isDev ? `dev_${baseKey}` : `prod_${baseKey}`;
  }
};

// Make available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).debugCache = debugCache;
  
  if (debugCache.isDevMode()) {
    console.log('🛡️ DEV MODE PROTECTION: Simplified cache utilities loaded');
    console.log('🛠️ Available commands:');
    console.log('  - debugCache.clearOnlyPublishedCache() - safe clearing');
    console.log('  - debugCache.clearImageCache() - refresh images only');
    console.log('  - debugCache.smartClear() - environment-aware clearing');
  }
}
