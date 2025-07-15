const CACHE_NAME = 'version-4'; // <-- On passe à la version 4
// Liste des fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/annee2.html',
  'images/icon-192x192.png', // <-- J'ai enlevé le slash
  'images/icon-512x512.png'  // <-- J'ai enlevé le slash
];

// ... le reste du fichier ne change pas ...
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
        return response || fetch(event.request);
      })
  );
});
