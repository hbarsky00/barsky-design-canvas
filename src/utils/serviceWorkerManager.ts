/**
 * Service Worker Manager for Enhanced Caching and Offline Support
 * Implements efficient cache policies and reduces network requests
 */

export interface CacheStrategy {
  name: string;
  strategy: 'cacheFirst' | 'networkFirst' | 'staleWhileRevalidate';
  maxAge: number;
  maxEntries: number;
}

export const cacheStrategies: CacheStrategy[] = [
  {
    name: 'images',
    strategy: 'cacheFirst',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 100
  },
  {
    name: 'static-assets',
    strategy: 'cacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 50
  },
  {
    name: 'api-responses',
    strategy: 'networkFirst',
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 25
  },
  {
    name: 'html-pages',
    strategy: 'staleWhileRevalidate',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxEntries: 20
  }
];

/**
 * Generate Service Worker content with optimized caching strategies
 */
export const generateServiceWorkerContent = (): string => {
  return `
const CACHE_NAME = 'barsky-design-v1';
const STATIC_CACHE_NAME = 'static-v1';
const API_CACHE_NAME = 'api-v1';

// Cache strategies
const CACHE_STRATEGIES = ${JSON.stringify(cacheStrategies)};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png',
  '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png',
  '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png',
  '/lovable-uploads/340a0484-22a4-4c70-bf1e-4ec47c317bfb.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle different resource types
  if (url.pathname.match(/\\.(png|jpg|jpeg|gif|webp|svg)$/)) {
    event.respondWith(cacheFirstStrategy(event.request, CACHE_NAME));
  } else if (url.pathname.match(/\\.(css|js|woff|woff2|ttf|eot)$/)) {
    event.respondWith(cacheFirstStrategy(event.request, STATIC_CACHE_NAME));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(event.request, API_CACHE_NAME));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(event.request, CACHE_NAME));
  }
});

// Cache-first strategy
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    return new Response('Resource not available', { status: 503 });
  }
}

// Network-first strategy
async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Network error', { status: 503 });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    const cache = caches.open(cacheName);
    cache.then((c) => c.put(request, response.clone()));
    return response;
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(replayFailedRequests());
  }
});

// Replay failed requests
async function replayFailedRequests() {
  const failedRequests = await getFailedRequests();
  for (const request of failedRequests) {
    try {
      await fetch(request);
      await removeFailedRequest(request);
    } catch (error) {
      console.error('Failed to replay request:', error);
    }
  }
}

async function getFailedRequests() {
  // Implementation for retrieving failed requests from IndexedDB
  return [];
}

async function removeFailedRequest(request) {
  // Implementation for removing failed request from IndexedDB
}
`;
};

/**
 * Register Service Worker with enhanced error handling
 */
export const registerServiceWorker = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }

  try {
    // Create service worker file
    const swContent = generateServiceWorkerContent();
    const swBlob = new Blob([swContent], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(swBlob);
    
    const registration = await navigator.serviceWorker.register(swUrl);
    
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker available');
            // Optionally show update notification
          }
        });
      }
    });
    
    console.log('Service Worker registered successfully');
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

/**
 * Unregister Service Worker
 */
export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    console.log('Service Worker unregistered');
  }
};

/**
 * Check if Service Worker is supported and active
 */
export const isServiceWorkerActive = (): boolean => {
  return 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null;
};

/**
 * Initialize Service Worker with cache policies
 */
export const initServiceWorker = async (): Promise<void> => {
  if (import.meta.env.PROD) {
    await registerServiceWorker();
  } else {
    console.log('Service Worker registration skipped in development');
  }
};