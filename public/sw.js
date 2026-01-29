/*
  Minimal PWA service worker
  - Cache-first for same-origin GET requests
  - Network update in background
*/

const CACHE_VERSION = 'framegen-v1';
const APP_SHELL = [
  './',
  './index.html',
  './youtube.html',
  './gmap.html',
  './site.webmanifest',
  './sw.js',
  './favicon.ico',
  './favicon.svg',
  './favicon-96x96.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_VERSION ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchAndUpdate = fetch(req).then((res) => {
        // opaque 응답(예: no-cors)은 캐시에 넣지 않음
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);

      return cached || fetchAndUpdate;
    })
  );
});
