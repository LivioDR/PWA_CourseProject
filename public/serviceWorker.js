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

   // Caching pokemon main info
   if((event.request.url).startsWith('https://pokeapi.co/api/v2/pokemon/')){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('pokemon-data').then(cache => {
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


   // Caching pokemon moves
   else if((event.request.url).startsWith('https://pokeapi.co/api/v2/move/')){
      event.respondWith(
         fetch(event.request.url).catch(netResult => {
            const key = event.request.url
            // creating a new promise that will handle the IndexedDB request
            return new Promise((resolve, reject) => {
               // opening the database
               const dbName = "pokemon"
               const storeName = "pokemon-moves"
               const request = indexedDB.open(dbName,1)
   
               // setting the error and success handlers
               request.onerror = () => {
                  console.error(`An error occurred while trying to open the database ${dbName}.`)
              }
          
              request.onsuccess = (event) => {
                  console.log(`Database ${dbName} opened successfully.`)
                  console.log(event.target.result)
                  database = event.target.result
                  // starting a transaction for the required store
                  const transaction = database.transaction(storeName,'readonly')
                  
                  // setting the transaction handlers
                  transaction.oncomplete = (event) => {
                      console.log('Data transaction completed successfully', event)
                  }
                  transaction.onerror = (event) => {
                      console.error("An error ocurred while reading data from the store", event)
                  }
              
                  const objectStore = transaction.objectStore(storeName)
                  const request = objectStore.get(key)
                  request.onsuccess = (event) => {
                      resolve(new Response(event.result))
                  }
                  request.onerror = (event) => {
                      console.error(event)
                      reject("An error occurred")
                  }
               }
            })
         })

         /*
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
         */
      )
   }

   // Caching pokemon sprites
   else if((event.request.url).startsWith('https://raw.githubusercontent.com/PokeAPI/sprites/')){
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
   else if((event.request.url).startsWith('https://raw.githubusercontent.com/PokeAPI/cries/')){
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
   else if((event.request.url).startsWith('https://pokeapi.co/api/v2/type/')){
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

   // Caching the app shell files and skipping the chrome extensions and firebase functions
   else if(!(event.request.url).startsWith('chrome-extension') && !(event.request.url).startsWith('https://firestore.googleapis')){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('app-shell').then(cache => {
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