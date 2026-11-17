const CACHE_NAME = 'bee-game-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// Install Service Worker and cache files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Fetch events (This is where the Offline magic happens)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      // If the network fails (offline), serve the cached game file
      return caches.match(e.request).then((response) => {
        if (response) {
          return response;
        }
        // If the requested file isn't in the cache, fallback to the game
        return caches.match('./index.html');
      });
    })
  );
});
