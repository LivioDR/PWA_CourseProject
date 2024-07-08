// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("SW installed")
   self.skipWaiting()
});
self.addEventListener("activate", event => {
   console.log("And activated!")
   event.waitUntil(clients.claim())
});

// adding resources from PokeAPI to the cache
self.addEventListener('fetch', event => {

   // Caching pokemon moves
   if((event.request.url).startsWith('https://pokeapi.co/api/v2/move/')){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('pokemon-moves').then(cache => {
                     cache.put(event.request.url, clone) // storing the clone of the response with the request as a key
                  })
                  return response
               })
            }
         })
         .catch(e => {
            console.error(e)
         })
      )
   }

   // Caching pokemon sprites
   if((event.request.url).startsWith('https://raw.githubusercontent.com/PokeAPI/sprites/')){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('pokemon-sprites').then(cache => {
                     cache.put(event.request.url, clone) // storing the clone of the response with the request as a key
                  })
                  return response
               })
            }
         })
         .catch(e => {
            console.error(e)
         })
      )
   }

   // Caching pokemon cries
   if((event.request.url).startsWith('https://raw.githubusercontent.com/PokeAPI/cries/')){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('pokemon-cries').then(cache => {
                     cache.put(event.request.url, clone) // storing the clone of the response with the request as a key
                  })
                  return response
               })
            }
         })
         .catch(e => {
            console.error(e)
         })
      )
   }

   // Caching pokemon types advantages
   if((event.request.url).startsWith('https://pokeapi.co/api/v2/type/')){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('pokemon-types').then(cache => {
                     cache.put(event.request.url, clone) // storing the clone of the response with the request as a key
                  })
                  return response
               })
            }
         })
         .catch(e => {
            console.error(e)
         })
      )
   }

 })