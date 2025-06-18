// Debug utility for tracking state changes and cache issues
export const debugCache = {
  log: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`🔍 [${timestamp}] ${message}`, data);
  },
  
  clearAllCaches: () => {
    console.log('🧹 Clearing all caches...');
    
    // Clear localStorage
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach(key => {
      if (key.includes('project_') || key.includes('imageOverrides_') || 
          key.includes('textOverrides_') || key.includes('contentBlockOverrides_')) {
        localStorage.removeItem(key);
        console.log(`Cleared localStorage: ${key}`);
      }
    });
    
    // Clear sessionStorage
    const sessionStorageKeys = Object.keys(sessionStorage);
    sessionStorageKeys.forEach(key => {
      if (key.includes('project_') || key.includes('dev_mode')) {
        sessionStorage.removeItem(key);
        console.log(`Cleared sessionStorage: ${key}`);
      }
    });
    
    // Force reload all images
    document.querySelectorAll('img').forEach(img => {
      const src = img.src;
      img.src = '';
      setTimeout(() => {
        img.src = src + (src.includes('?') ? '&' : '?') + `v=${Date.now()}`;
      }, 10);
    });
    
    console.log('✅ All caches cleared');
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
  console.log('🛠️ Debug utilities loaded. Use debugCache.clearAllCaches() or debugCache.checkForLoops()');
}
