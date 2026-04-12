const CACHE_NAME = 'homepage-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './app.js',
    './sw.js',
];

// Install: cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests (Tailwind CDN, etc.)
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached version if available
            if (cachedResponse) {
                return cachedResponse;
            }
            // Otherwise fetch from network
            return fetch(event.request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200) {
                    return response;
                }
                // Clone and cache the new response
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        }).catch(() => {
            // Offline fallback
            if (event.request.destination === 'document') {
                return caches.match('./index.html');
            }
        })
    );
});
