// Service Worker for Vespacaution Main Site
const CACHE_NAME = 'vespacaution-site-cache';
// Path from /site/ up to root, then into apps/bee-game
const OFFLINE_URL = '../../apps/bee-game/index.html'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './logo.png',
  OFFLINE_URL
];

// Install Event: Cache core assets immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map(url => {
          // Catch errors so it doesn't fail if one file is missing
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
          // Update cache with the newest version of the page
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
    // Stale-While-Revalidate for assets (CSS, JS, images)
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
        }).catch(() => {
          // Ignore network fail for assets if we have it cached
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
