const CACHE_NAME = 'vespacaution-cache';
const OFFLINE_URL = '/apps/bee-game/index.html';

// Core files to cache on install
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/site/index.html',
    '/site/manifest.json',
    '/site/icon.png',
    '/site/logo.png',
    OFFLINE_URL
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
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
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Fetch Event: Network-First with Offline Fallback
self.addEventListener('fetch', (event) => {
    // Intercept page navigation (clicking links, refreshing)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Update the cache with the newest version of the page
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
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
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
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
