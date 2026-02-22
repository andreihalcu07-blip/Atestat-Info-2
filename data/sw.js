// Service Worker pentru PWA - Offline Support
const CACHE_NAME = 'sistemOS-v5';
const OFFLINE_URL = 'src/pages/offline.html';

const ASSETS_TO_CACHE = [
    '/',
    '/src/pages/index.html',
    '/src/pages/about.html',
    '/src/pages/history.html',
    '/src/pages/comparison.html',
    '/src/pages/glossary.html',
    '/src/pages/faq.html',
    '/src/pages/quiz.html',
    '/src/pages/resources.html',
    '/src/pages/offline.html',
    '/src/css/main.css',
    '/src/css/print.css',
    '/src/js/core/main.js',
    '/src/js/modules/enhancements.js',
    '/src/js/utils/i18n.js',
    '/src/js/utils/pwa.js',
    '/src/js/modules/quiz.js',
    '/src/js/modules/history.js',
    '/src/js/modules/comparison.js',
    '/src/js/modules/faq.js',
    '/data/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching app shell...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[SW] Removing old cache:', key);
                    return caches.delete(key);
                }
            }));
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Try to fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the fetched response
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If fetch fails (offline), show offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-sync') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    const messages = await getStoredMessages();
    for (const message of messages) {
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            });
            await removeStoredMessage(message.id);
        } catch (error) {
            console.log('[SW] Sync failed, will retry');
        }
    }
}

// Push notifications
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'Noutăți despre sistemele de operare!',
        icon: '/icon-192.png',
        badge: '/icon-96.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'SistemOS', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

console.log('[SW] Service Worker loaded!');