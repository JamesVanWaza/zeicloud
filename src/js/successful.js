// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/functions";
import "firebase/messaging";
import "firebase/performance";
import "firebase/storage";
import "firebase/database";
import "firebase/remote-config";

// Firebase Project Config 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2fSgvBKn_kfTA-YA_oNSnuv2T9IFJ1LY",
    authDomain: "startbootstrap-dostesting.firebaseapp.com",
    databaseURL: "https://startbootstrap-dostesting.firebaseio.com",
    projectId: "startbootstrap-dostesting",
    storageBucket: "startbootstrap-dostesting.appspot.com",
    messagingSenderId: "1027318006182",
    appId: "1:1027318006182:web:d2d3c1f78038119f170f67",
    measurementId: "G-8MTSJ26GN6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let signupbtn = document.querySelector("#signInBtn").addEventListener('click', signInWithEmailPassword);
//document.querySelector("#signInBtn").addEventListener('click', signUpWithEmailAndPassword);

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    // [END auth_state_listener]
}

// Sign out a user
let signOutBtn = document.querySelector("#signOutBtn").addEventListener('click', signOut);

function signOut() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('User is signed out');
    }).catch((error) => {
        // An error happened.
    });
    // [END auth_sign_out]
}