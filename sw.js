const CACHE_NAME = 'vespacaution-cache'; 
const OFFLINE_URL = '/apps/bee-game/index.html';

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/site/index.html',
    '/site/manifest.json',
    '/site/icon.png',
    '/site/logo.png',
    OFFLINE_URL
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                ASSETS_TO_CACHE.map(url => {
                    // Ignore errors for individual files so install doesn't fail
                    return cache.add(url).catch(err => console.log('Failed to cache:', url));
                })
            );
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Update cache with newest page
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                })
                .catch(() => {
                    // When offline, serve the Bee Game
                    return caches.match(OFFLINE_URL).then((response) => {
                        return response || new Response('Offline', { status: 404 });
                    });
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {});
            })
        );
    }
});
