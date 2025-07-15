const CACHE_NAME = 'version-6'; // <-- On passe à la version 5
// Liste des fichiers à mettre en cache
const urlsToCache = [
  '/Dentaire-oran/',
  '/Dentaire-oran/index.html',
  '/Dentaire-oran/annee2.html',
  '/Dentaire-oran/images/icon-192x192.png',
  '/Dentaire-oran/images/icon-512x512.png'
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
