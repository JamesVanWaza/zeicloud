// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import { getFunctions } from "firebase/functions";
// import { getMessaging } from "firebase/messaging";
// import { getPerformance } from "firebase/performance";
// import { getRemoteConfig } from "firebase/remote-config";
// import { getStorage } from "firebase/storage";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: "AIzaSyC2fSgvBKn_kfTA-YA_oNSnuv2T9IFJ1LY",
    authDomain: "startbootstrap-dostesting.firebaseapp.com",
    databaseURL: "https://startbootstrap-dostesting.firebaseio.com",
    projectId: "startbootstrap-dostesting",
    storageBucket: "startbootstrap-dostesting.appspot.com",
    messagingSenderId: "1027318006182",
    appId: "1:1027318006182:web:22de08214e99fee3170f67",
    measurementId: "G-6YYHGGL30F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
//const analytics = getAnalytics(app);

// Auth
const auth = getAuth(app);

// Firestore
const db = getFirestore(app);

// Functions
// const functions = getFunctions(app);

// Messaging
//const messaging = getMessaging(app);

// Performance
//const performance = getPerformance(app);

// Remote Config
//const remoteConfig = getRemoteConfig(app);

// Storage
//const storage = getStorage(app);

// Initialize App Check
//const appCheck = initializeAppCheck(app);

// Emulator
//connectAuthEmulator(auth, 'http://localhost:8080');

/** Constants */
const profileForm = document.querySelector('#form');
const fname = document.querySelector('#fname');
const readData = document.querySelector('#readData');
const githubLogin = document.querySelector('#githubLogin');
const dateCreated = document.querySelector("#dateCreated");
const filesRemaining = document.querySelector("#filesRemaining");
const gBRemaining = document.querySelector("#gBRemaining");
const zeSubmit = document.querySelector("#zeSubmit");
const zeSignOut = document.querySelector("#zeSignOut");
const zeForm = document.querySelector("#zeForm");

if(zeSubmit) {
  zeSubmit.addEventListener('click', (e) => {
      e.preventDefault();

      async function saveFormData() {
          const docRef = await addDoc(collection(db, 'zeFiles'), {
              'DateCreated': dateCreated.value,
              'filesRemaining': filesRemaining.value,
              'gBRemaining': gBRemaining.value
          }).then(() => {
              console.log('Document written with ID: ', docRef.id);
              profileForm.reset();
          }).catch((error) => {
              console.error('Error adding document: ', error);
          });
      }

      saveFormData();
  });
}


// Read data from firestore
readData.addEventListener('click', (e) => {
    async function readFormData() {
        const querySnapshot = await getDocs(collection(db, 'contactForm'));

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    }

    readFormData();
});

/** Setting up Auth */
// Sign in with Github
githubLogin.addEventListener('click', () => {
    function signInUser() {
        signInWithPopup(auth, GithubAuthProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                console.log(credential);
                const token = result.credential.accessToken;
                console.log(token);

                // The signed-in user info.
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);

                // The email of the user's account used
                const email = error.email;
                console.log(email);

                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                console.log(credential);
            });
    }

    signInUser();
});

// Auth state change
function initAuthStateChange() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User is signed in');
        } else {
            console.log('User is signed out');
        }
    });
}

// Sign out
function signOutUser() {
    signOut(auth).then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error('Error signing out: ', error);
    });
}

initAuthStateChange();
signOutUser();
