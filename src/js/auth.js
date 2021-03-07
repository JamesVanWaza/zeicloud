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

// User must be signed in first - tracks if user is signed in
let user = firebase.auth().currentUser;
let name, email, photoUrl, uid, emailVerified;

if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
}

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
        } else {
            // User is signed out - sign in user again
            signInWithEmailPassword();
        }
    });
    // [END auth_state_listener]
}

// Gets a user's provider secifin information if signed in using UI
let user = firebase.auth().currentUser;

if (user != null) {
    user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
    });
};

// Updates a user profile
user.updateProfile({
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
    // Update successful.
}).catch(function(error) {
    // An error happened.
});

// Update email address
user.updateEmail("user@example.com").then(function() {
    // Update successful.
}).catch(function(error) {
    // An error happened.
});

// Send a user a verification email
user.updateEmail("user@example.com").then(function() {
    // Update successful.
}).catch(function(error) {
    // An error happened.
});

// Update Password
let newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(function() {
    // Update successful.
}).catch(function(error) {
    // An error happened.
});

// Send a password reset email
const auth = firebase.auth();
const emailAddress = "user@example.com";

auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
}).catch(function(error) {
    // An error happened.
});

// Delete a user
user.delete().then(function() {
    // User deleted.
}).catch(function(error) {
    // An error happened.
});

// Re-authenticate a user
let credential;

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateWithCredential(credential).then(function() {
    // User re-authenticated.
}).catch(function(error) {
    // An error happened.
});

let signupbtn = document.querySelector("#signInBtn").addEventListener('click', signInWithEmailPassword);
//document.querySelector("#signInBtn").addEventListener('click', signUpWithEmailAndPassword);

function signInWithEmailPassword() {
    // signupbtn.addEventListener("click", e => {
    //     e.preventDefault();
    // });

    let email = document.querySelector('#mail').value;
    let password = document.querySelector('#pword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            // var user = userCredential.user;
            console.log('Welcome back user');
        })
        .catch(e => {
            console.log(e);
            // var errorCode = error.code;
            // var errorMessage = error.message;
        });

    // Refractor - if user is signed in
    authStateListener();
}