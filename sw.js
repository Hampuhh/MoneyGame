const CACHE_NAME = 'money-game-v1';
const urlsToCache = [
  './',
  './money-game.html',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap',
  'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/9ca668e1-5d2f-4870-976a-6da03921928e'
];

// Instalar y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Interceptar peticiones y servir desde caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Limpiar cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
