const CACHE_NAME = 'version-2';
// Liste des fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/annee2.html',
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

// Récupère le contenu depuis le cache s'il est disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si le fichier est dans le cache, on le retourne. Sinon, on va le chercher sur le réseau.
        return response || fetch(event.request);
      })
  );
});
