// Cache buster to force Vite to rebuild everything
// This file forces a complete rebuild when imported

console.log('🚀 Cache buster activated at:', new Date().toISOString());

// Clear all browser caches aggressively
if (typeof window !== 'undefined') {
  // Force clear all caches
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
}

export const CACHE_BUST_TIMESTAMP = Date.now();