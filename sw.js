//Ciclo de Vida del SW.
//instalacion del service worker y precaching de los recursos
console.log("estoy afuera");
self.addEventListener('install' , event =>{
   console.log("Service Worker instalado");
   event.waitUntil(
      caches.open('v13').then(cache => {
        return cache.addAll([       
            'index.html',
            'images/icons/calendar-24.svg',
            'images/icons/icons.svg',
            'styles/styles.css',
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
                    return cacheName !== 'v13';
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