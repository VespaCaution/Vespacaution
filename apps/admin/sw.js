// Admin Service Worker — no named cache, no version to bump.
// Strategy: network-first for HTML (fast updates), cache-first for static assets.
// When you deploy, users get fresh HTML on next load. No manual bump required.

const ASSETS = './'; // scope hint; nothing to pre-cache

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Wipe any legacy caches from previous SW versions so nothing goes stale
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // Network-first for the HTML shell
  if (e.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Store a copy in an ephemeral cache with a random name — cleaned up on next activate
          const copy = res.clone();
          caches.open('admin-runtime').then(c => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets — no versioned cache needed, uses `admin-runtime`
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open('admin-runtime').then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    }))
  );
});
