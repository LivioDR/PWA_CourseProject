// open the database
const openDatabase = async(name) => {
    let database
    // opening the database
    const request = window.indexedDB.open(name, 1)

    // setting the error and success handlers
    request.onerror = () => {
        console.error(`An error occurred while trying to open the database ${name}.`)
    }

    request.onsuccess = (event) => {
        console.log(`Database ${name} opened successfully.`)
        database = event.target.result
    }

    // setting the stores inside the indexedDB
    request.onupgradeneeded = (event) => {
        // getting the DB interface first
        const db = event.target.result

        // creating then the stores that will be used on this app
        const pokemonStore = db.createObjectStore("pokemon-data")
        const movesStore = db.createObjectStore("pokemon-moves")
        const typesStore = db.createObjectStore("pokemon-types")

    }

    return database
}

// get an object from IndexedDB
const getData = async(key, store, dbName) => {
    let data
    // opening the database
    const request = window.indexedDB.open(dbName, 1)

    // setting the error and success handlers
    request.onerror = () => {
        console.error(`An error occurred while trying to open the database ${dbName}.`)
    }

    request.onsuccess = (event) => {
        console.log(`Database ${dbName} opened successfully.`)
        database = event.target.result
        // starting a transaction for the required store
        const transaction = database.transaction(store)
        
        // setting the transaction handlers
        transaction.oncomplete = (event) => {
            console.log('Data transaction completed successfully', event)
        }
        transaction.onerror = (event) => {
            console.error("An error ocurred while reading data from the store", event)
        }
    
        const objectStore = transaction.objectStore(store)
        const request = objectStore.get(key)
        request.onsuccess = (event) => {
            data = event.result
        }
        request.onerror = (event) => {
            console.error("An error occurred")
            console.error(event)
            data = false
        }
    }
    return data

}


// store an object on IndexedDB
const setData = async(key, data, store, dbName) => {
    // opening the database
    const request = window.indexedDB.open(dbName, 1)

    // setting the error and success handlers
    request.onerror = () => {
        console.error(`An error occurred while trying to open the database ${dbName}.`)
    }

    request.onsuccess = (event) => {
        console.log(`Database ${dbName} opened successfully.`)
        const database = event.target.result
        // starting a transaction for the required store
        const transaction = database.transaction(store,'readwrite')
        
        // setting the transaction handlers
        transaction.oncomplete = (event) => {
            console.log('Transaction completed successfully')
        }
        transaction.onerror = (event) => {
            console.error("An error ocurred during the transaction", event)
        }
        // getting the store    
        const objectStore = transaction.objectStore(store)
        // and finally adding the data
        const request = objectStore.add(data,key)
        request.onsuccess = (event) => {
            console.log("Data added successfully to the store", event)
        }
        request.onerror = (event) => {
            console.error("An error ocurred while writing data to the store", event)
        }
    }
    
}
export {openDatabase, setData, getData}