// Enhanced debug utility with selective cache clearing and dev state protection
export const debugCache = {
  log: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`🔍 [${timestamp}] ${message}`, data);
  },

  // Backup dev state before any cache operations
  backupDevState: () => {
    console.log('💾 Backing up dev state...');
    const devKeys = ['devMode', 'dev_mode'];
    const projectKeys: string[] = [];
    
    // Find all dev-related keys
    Object.keys(localStorage).forEach(key => {
      if (key.includes('imageOverrides_') || 
          key.includes('textOverrides_') || 
          key.includes('contentBlockOverrides_') ||
          key.includes('devMode') ||
          key.startsWith('project_')) {
        projectKeys.push(key);
      }
    });

    // Backup to sessionStorage
    const backup = {
      localStorage: {} as Record<string, string>,
      timestamp: Date.now()
    };

    [...devKeys, ...projectKeys].forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        backup.localStorage[key] = value;
      }
    });

    sessionStorage.setItem('dev_state_backup', JSON.stringify(backup));
    console.log('✅ Dev state backed up:', Object.keys(backup.localStorage));
  },

  // Restore dev state from backup
  restoreDevState: () => {
    console.log('🔄 Restoring dev state...');
    const backupStr = sessionStorage.getItem('dev_state_backup');
    
    if (!backupStr) {
      console.warn('⚠️ No dev state backup found');
      return;
    }

    try {
      const backup = JSON.parse(backupStr);
      
      Object.entries(backup.localStorage).forEach(([key, value]) => {
        localStorage.setItem(key, value as string);
        console.log(`🔄 Restored: ${key}`);
      });

      console.log('✅ Dev state fully restored');
    } catch (error) {
      console.error('❌ Failed to restore dev state:', error);
    }
  },

  // Clear only image-related cache
  clearImageCache: () => {
    console.log('🖼️ Clearing image cache only...');
    
    // Clear only published image cache, NOT dev mode image overrides
    const keysToRemove: string[] = [];
    
    Object.keys(localStorage).forEach(key => {
      // Only clear published cache, NOT dev overrides
      if (key.includes('published_') && key.includes('image')) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared image cache: ${key}`);
    });

    // Force reload images WITHOUT affecting dev mode images
    console.log('🔄 Refreshing image display...');
    
    console.log(`✅ Image cache cleared (${keysToRemove.length} items), dev images preserved`);
  },

  // Clear only UI/display cache
  clearUICache: () => {
    console.log('🎨 Clearing UI cache only...');
    
    const keysToRemove: string[] = [];
    
    Object.keys(localStorage).forEach(key => {
      // Clear UI-related cache but preserve dev work
      if ((key.includes('cache_') || key.includes('ui_')) && 
          !key.includes('imageOverrides_') && 
          !key.includes('textOverrides_') && 
          !key.includes('contentBlockOverrides_')) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared UI cache: ${key}`);
    });

    console.log(`✅ UI cache cleared (${keysToRemove.length} items), dev work preserved`);
  },

  // SAFE: Clear only published cache (production data)
  clearOnlyPublishedCache: () => {
    console.log('🧹 Clearing ONLY published cache (production data)...');
    
    const localStorageKeys = Object.keys(localStorage);
    const keysToRemove: string[] = [];
    
    localStorageKeys.forEach(key => {
      // ONLY clear published/production cache
      if (key.includes('published_') || 
          (key.includes('cache_') && !key.includes('dev'))) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared published cache: ${key}`);
    });

    console.log(`✅ Published cache cleared (${keysToRemove.length} items) - ALL DEV WORK PRESERVED`);
  },

  // CONDITIONAL: Full clear only in production
  conditionalClearAll: () => {
    const isDev = process.env.NODE_ENV === 'development' || 
                  window.location.hostname === 'localhost' ||
                  localStorage.getItem('devMode') === 'true';

    if (isDev) {
      console.log('🛡️ DEV MODE: Using selective clearing to preserve work');
      debugCache.backupDevState();
      debugCache.clearOnlyPublishedCache();
      debugCache.clearImageCache();
    } else {
      console.log('🏭 PRODUCTION MODE: Full cache clear allowed');
      debugCache.clearAllCaches();
    }
  },

  // DANGEROUS: Full clear (use sparingly)
  clearAllCaches: () => {
    console.log('⚠️ DANGER: Full cache clearing...');
    
    // Backup first
    debugCache.backupDevState();
    
    // Clear localStorage selectively
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
      } else {
        otherKeys.push(key);
      }
    });
    
    // Only clear non-dev-mode keys
    otherKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared cache key: ${key}`);
    });
    
    console.log('✅ Cache clearing completed - dev mode work preserved');
  },

  // Get cache key based on environment
  getCacheKey: (baseKey: string) => {
    const isDev = localStorage.getItem('devMode') === 'true';
    return isDev ? `dev_${baseKey}` : `prod_${baseKey}`;
  },

  // Check if we're in dev mode
  isDevMode: () => {
    return localStorage.getItem('devMode') === 'true' ||
           process.env.NODE_ENV === 'development' ||
           window.location.hostname === 'localhost';
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

// Auto-run on load with dev mode protection
if (typeof window !== 'undefined') {
  (window as any).debugCache = debugCache;
  
  // Set up dev mode protection
  if (debugCache.isDevMode()) {
    console.log('🛡️ DEV MODE PROTECTION: Enhanced cache utilities loaded');
    console.log('🛠️ Safe commands:');
    console.log('  - debugCache.clearOnlyPublishedCache() - clears only production data');
    console.log('  - debugCache.clearImageCache() - clears only image cache');
    console.log('  - debugCache.clearUICache() - clears only UI cache');
    console.log('  - debugCache.conditionalClearAll() - smart clearing based on environment');
  } else {
    console.log('🏭 PRODUCTION MODE: Standard cache utilities loaded');
  }
}
