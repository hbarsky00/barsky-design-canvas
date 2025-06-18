// Debug utility for tracking state changes and cache issues
export const debugCache = {
  log: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`🔍 [${timestamp}] ${message}`, data);
  },
  
  clearAllCaches: () => {
    console.log('🧹 Clearing all caches...');
    
    // Clear localStorage but PRESERVE dev mode changes
    const localStorageKeys = Object.keys(localStorage);
    const devModeKeys: string[] = [];
    const otherKeys: string[] = [];
    
    localStorageKeys.forEach(key => {
      // PRESERVE these keys - they contain dev mode work
      if (key.includes('imageOverrides_') || 
          key.includes('textOverrides_') || 
          key.includes('contentBlockOverrides_') ||
          key.includes('devMode') ||
          key.startsWith('project_')) {
        devModeKeys.push(key);
        console.log(`🔒 PRESERVING dev mode key: ${key}`);
      } else if (key.includes('published_') || key.includes('cache_')) {
        otherKeys.push(key);
      }
    });
    
    // Only clear non-dev-mode keys
    otherKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared cache key: ${key}`);
    });
    
    // Clear sessionStorage more selectively
    const sessionStorageKeys = Object.keys(sessionStorage);
    sessionStorageKeys.forEach(key => {
      if (!key.includes('dev_mode') && !key.includes('project_')) {
        sessionStorage.removeItem(key);
        console.log(`🗑️ Cleared sessionStorage: ${key}`);
      }
    });
    
    // DO NOT force reload images - this causes the revert issue
    console.log('✅ Selective cache clearing completed - dev mode work preserved');
  },
  
  clearOnlyPublishedCache: () => {
    console.log('🧹 Clearing only published cache...');
    
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach(key => {
      if (key.includes('published_')) {
        localStorage.removeItem(key);
        console.log(`🗑️ Cleared published cache: ${key}`);
      }
    });
  },
  
  checkForLoops: () => {
    const requestLog: string[] = [];
    const originalFetch = window.fetch;
    
    window.fetch = function(...args) {
      const url = args[0]?.toString() || '';
      requestLog.push(`${new Date().toISOString()}: ${url}`);
      
      // Keep only last 50 requests
      if (requestLog.length > 50) {
        requestLog.shift();
      }
      
      // Check for loops (same request repeated quickly)
      const recentRequests = requestLog.slice(-10);
      const duplicates = recentRequests.filter(req => req.includes(url.split('?')[0]));
      
      if (duplicates.length > 5) {
        console.warn('🔄 Potential request loop detected:', url);
        console.warn('Recent requests:', recentRequests);
      }
      
      return originalFetch.apply(this, args);
    };
    
    console.log('🔍 Request loop detection enabled');
  }
};

// Auto-run on load
if (typeof window !== 'undefined') {
  (window as any).debugCache = debugCache;
  console.log('🛠️ Debug utilities loaded. Use debugCache.clearOnlyPublishedCache() for safe clearing');
}
