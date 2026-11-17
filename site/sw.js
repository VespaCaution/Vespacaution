// Service Worker for Vespacaution Main Site
const CACHE_NAME = 'vespacaution-site-cache';
// Use absolute path from the root for the fallback
const OFFLINE_URL = '/apps/bee-game/index.html'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './logo.png',
  '/apps/bee-game/index.html' // Cache the game using absolute path
];

// Install Event: Cache core assets immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map(url => {
          return cache.add(url).catch(err => console.log('Failed to cache:', url));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Take control immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Fetch Event: Network-First with Offline Fallback
self.addEventListener('fetch', (e) => {
  // Intercept page navigation
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // If offline, serve the Bee Game
          return caches.match(OFFLINE_URL).then((response) => {
            return response || new Response('Offline', { status: 404 });
          });
        })
    );
  } else {
    // Stale-While-Revalidate for assets
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {});

        return cachedResponse || fetchPromise;
      })
    );
  }
});
