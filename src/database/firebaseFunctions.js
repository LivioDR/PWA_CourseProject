// Import the functions you need from the SDKs you need
import StartingPokemonTeam from "@/utilities/StartingPokemonTeam";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, collection, getDocs } from "firebase/firestore";


const testUid = "qwertyuiopasdfghjkl"
const testUsername = "UsernameForTesting"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx41KQ923ubndQFlhnGcWaSXu4nSq0wxE",
  authDomain: "pokebattlesim.firebaseapp.com",
  projectId: "pokebattlesim",
  storageBucket: "pokebattlesim.appspot.com",
  messagingSenderId: "63853137894",
  appId: "1:63853137894:web:196bedb191eee2b1249027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = (username, email, password) => {
    if(isUsernameAvailable()){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(typeof window != "undefined"){
                localStorage.setItem('uid',user.uid)
                localStorage.setItem('username',username)
            }
            // then create the pokedex in the database
            createCollectionForUserId(user.uid, username)
        })
        .catch((error) => {
            console.error(error.code)
            console.error(error.message)    
        });
        return true // signUp successfull
    }
    return false // username not available
}

const signIn = async(email, password) => {
    let uid
    signInWithEmailAndPassword(auth, email, password)
    .then(credential => {
        uid = credential.user.uid
        if(typeof window != "undefined"){
            localStorage.setItem("uid",uid)
        }    
    })
    .catch(error => {
        console.error(error.code)
        console.error(error.message)
    })
    try{
        const querySnapshot = await getDocs(collection(db, 'pokedex'))
        querySnapshot.forEach(document => {
            if(document.id == uid){
                const username = document.data().username
                if(typeof window != "undefined"){
                    localStorage.setItem("username",username)
                }
            }
        })
    }
    catch(e){
        console.error(e)
    }
    return true
}

// TODO: refactor function
const isUsernameAvailable = async(username) => {
    let isAvailable = true
    let user = username.toLowerCase().trim()
    await db()
        .collection("users")
        // .where("user","==",user)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc?.data()?.user.length > 0 && doc?.data()?.user.toLowerCase() === user){
                    isAvailable = false
                }
            })
        })
        .catch(e => {
            console.error(e)
            isAvailable = false
        })
    return isAvailable
}

const createCollectionForUserId = async(uid = testUid, username = testUsername) => {
    const initialPokedex = StartingPokemonTeam
    try{
        await setDoc(doc(db, 'pokedex', uid),{
            username: username,
            pokedex: {
                ...initialPokedex
            }
        })
    }
    catch(e){
        console.error(e)
    }
}

const getCollectionForUserId = async(uid = testUid) => {
    let pokeCollection = []

    // if I have internet connection I retrieve the data from Firebase
    if(navigator.onLine){
        try{
            const querySnapshot = await getDocs(collection(db, 'pokedex'))
            querySnapshot.forEach(document => {
                if(document.id == uid){
                    const retrievedPokedex = document.data().pokedex
                    for(const [key, val] of Object.entries(retrievedPokedex)){
                        pokeCollection.push({
                            id: key,
                            ...val,
                        })
                    }
                    // then I save this data in the indexedDB as a temporary backup
                    const request = window.indexedDB.open("pokemon",1)
                    request.onerror = () => {
                        console.error("An error occurred while trying to open the database")
                    }
                    request.onsuccess = (event) => {
                        // get the database
                        const db = event.target.result

                        // start a RW transaction
                        const transaction = db.transaction("pokedex","readwrite")

                        transaction.oncomplete = () => {
                            console.log("Pokedex stored in the IndexedDB")
                        }
                        transaction.onerror = (event) => {
                            console.error("An error occurred in the IndexedDB transaction")
                            console.error(event)
                        }

                        // then I get the object store
                        const objectStore = transaction.objectStore("pokedex")
                        const request = objectStore.add(pokeCollection, uid)

                        request.onsuccess = (event) => {
                            console.log("Request completed successfully")
                            console.log(event)
                        }
                    }

                    request.onupgradeneeded = (event) => {
                        const db = event.target.result
                        const objectStore = db.createObjectStore("pokedex")
                    }
                }
            })
        }
        catch(e){
            console.error(e)
        }
    }
    // if I don't have an internet connection
    else{
        // retrieve the data from the IndexedDB
        const request = window.indexedDB.open("pokemon",1)
        request.onerror = () => {
            console.error("An error occurred while trying to open the database")
        }
        request.onsuccess = (event) => {
            // get the database
            const db = event.target.result

            // start a read only transaction
            const transaction = db.transaction(["pokedex"],"readonly")

            transaction.oncomplete = () => {
                console.log("Pokedex retrieved from the IndexedDB")
            }
            transaction.onerror = (event) => {
                console.error("An error occurred in the IndexedDB transaction")
                console.error(event)
            }

            // then I get the object store
            const objectStore = transaction.objectStore("pokedex")
            const request = objectStore.get(uid)

            // and store the IndexedDB data in the variable to return
            request.onsuccess = (event) => {
                pokeCollection = event.target.result
                console.log("Request completed successfully")
            }
        }
    }
    return pokeCollection
}

const updateCollectionForUserId = async(uid = testUid, collection) => {
    let pokedex = {}
    for(let i=0; i<collection.length; i++){
        pokedex[collection[i].id] = {
            ...collection[i],
        }
        delete pokedex[collection[i].id].id
    }
    const dataToUpload = {
        pokedex: pokedex
    }

    // if there's an online connection the info in Firebase will be updated. This condition is checked on page.js, which sets the tag
    try{
        await updateDoc(doc(db, 'pokedex', uid), dataToUpload)
    }   
    catch(e){
        console.error(e)
    }

    // Also update the info in the IndexedDB if this function is called by the page script
    if(window){
        const request = window.indexedDB.open("pokemon",1)
        request.onerror = () => {
            console.error("An error occurred while trying to open the database")
        }
        request.onsuccess = (event) => {
            // get the database
            const db = event.target.result
    
            // start a RW transaction
            const transaction = db.transaction("pokedex","readwrite")
    
            transaction.oncomplete = () => {
                console.log("Pokedex updated in the IndexedDB")
            }
            transaction.onerror = (event) => {
                console.error("An error occurred in the IndexedDB transaction")
                console.error(event)
            }
    
            // then I get the object store
            const objectStore = transaction.objectStore("pokedex")
            // and update the info
            const request = objectStore.add(collection, uid)
    
            request.onsuccess = (event) => {
                console.log("Request completed successfully")
                console.log(event)
            }
        }
    }
}

export { signIn, signUp, createCollectionForUserId, getCollectionForUserId, updateCollectionForUserId }