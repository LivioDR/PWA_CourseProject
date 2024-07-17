// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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
            localStorage.setItem('uid',user.uid)
            localStorage.setItem('username',username)

            // then create the pokedex in the database

        })
        .catch((error) => {
            console.error(error.code)
            console.error(error.message)    
        });
    }
}

const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(credential => {
        // get UID
        // get username
        // get pokedex


    })
    .catch(error => {
        console.error(error.code)
        console.error(error.message)
    })
}

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

export { signIn, signUp }