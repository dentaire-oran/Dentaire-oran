const CACHE_NAME = 'dental-guide-v1';

// Liste des fichiers à mettre en cache pour "Your Dental Guide"
const urlsToCache = [
  '/',
  '/index.html',
  '/Cours/index.html',
  '/Qcm/index.html',
  '/Moyenne/index.html',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png'
];

// Installe le Service Worker et met les fichiers en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Récupère le contenu depuis le cache s'il est disponible, sinon depuis le réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
