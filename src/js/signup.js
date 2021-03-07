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

let signupbtn = document.querySelector("#signup-btn").addEventListener('click', signUpWithEmailAndPassword);
//document.querySelector("#signup-btn").addEventListener('click', signUpWithEmailAndPassword);

function signUpWithEmailAndPassword() {
    // signupbtn.addEventListener("click", e => {
    //     e.preventDefault();
    // });


    let email = document.querySelector('#mail').value;
    let password = document.querySelector('#pword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            // var user = userCredential.user;
            console.log('User Created');
        })
        .catch(e => {
            console.log(e);
        });
}