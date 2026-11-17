const CACHE_NAME = 'vespacaution-global-cache';
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

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
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
                    // If offline, show Bee Game
                    return caches.match(OFFLINE_URL).then((response) => {
                        return response || new Response('Offline', { status: 404 });
                    });
                })
        );
    } else {
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
