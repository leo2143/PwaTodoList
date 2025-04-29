//Ciclo de Vida del SW.
//instalacion del service worker y precaching de los recursos
console.log("estoy afuera");
self.addEventListener('install' , event =>{
   console.log("Service Worker instalado");
   event.waitUntil(
      caches.open('v6').then(cache => {
        return cache.addAll([       
            'index.html',
            'css/style.css',
            'js/main.js',
            'favicon/favicon-32x32.png',
            'favicon/favicon-16x16.png'
        ]);
      })
   );
});

//Activacion del Service Worker

self.addEventListener('activate', event => {
    console.log('Service Woker Activado');
    event.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== 'v5';
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//Interceptar y manejar las solicitudes de red

self.addEventListener('fetch', event=> {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});