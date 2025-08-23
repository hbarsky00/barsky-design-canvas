// Cache utilities - only for manual use when errors occur
// No auto-execution to prevent refresh loops

console.log('🔧 Cache utilities loaded at:', new Date().toISOString());

// Manual cache clearing function for emergency use
export const emergencyCacheClear = () => {
  console.log('🚨 Emergency cache clear triggered');
  
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    // Clear browser caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          console.log('🗑️ Clearing cache:', name);
          caches.delete(name);
        });
      });
    }
    
    // Clear service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          console.log('🗑️ Unregistering service worker');
          registration.unregister();
        });
      });
    }
    
    // Clear storage
    try {
      if (typeof Storage !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
  }
};

export const CACHE_BUST_TIMESTAMP = Date.now();