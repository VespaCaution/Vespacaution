const CACHE_NAME = 'vespacaution-main-v1';
const OFFLINE_URL = '/apps/bee-game/index.html';

// Core files to cache immediately on install
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.png',
    '/logo.png',
    OFFLINE_URL
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => {
            self.skipWaiting(); // Force the waiting service worker to become the active one
        })
    );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim(); // Take control of all pages immediately
        })
    );
});

// Fetch Event: Serve offline fallback for navigation
self.addEventListener('fetch', (event) => {
    // We only want to intercept page navigations (clicking links, refreshing)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // If the network fails (offline), return the Bee Game
                return caches.match(OFFLINE_URL).then((response) => {
                    return response || new Response('Offline and fallback not found.', { status: 404 });
                });
            })
        );
    } else {
        // For other requests (CSS, JS, Images), use cache-first, then network
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then((networkResponse) => {
                    // Optional: dynamically cache new assets (like Google Fonts or external scripts)
                    if (
                        networkResponse &&
                        networkResponse.status === 200 &&
                        networkResponse.type === 'basic' // Avoid caching opaque responses
                    ) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                });
            })
        );
    }
});
