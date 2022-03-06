// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
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

// Admin Project Submit Form
if (zeSubmit) {
    zeSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        async function saveFormData() {
            const docRef = await addDoc(collection(db, 'zeFiles'), {
                'Date Created': dateCreated.value,
                'Files Remaining': filesRemaining.value,
                'GB Remaining': gBRemaining.value
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
if (readData) {
    readData.addEventListener('click', (e) => {
        async function readFormData() {
            const querySnapshot = await getDocs(collection(db, 'contactForm'));

            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        }

        readFormData();
    });
}

/** Sign in with Github */
if (githubLogin) {
    githubLogin.addEventListener('click', () => {
        const provider = new GithubAuthProvider();
        signInWithRedirect(auth, provider);
    });

    document.querySelector('zeSignOut').style.display = 'none';
}


/** Sign out */
if (zeSignOut) {
    zeSignOut.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            // TODO: Create a sign-out success message
            console.log('Sign-out successful.');
            document.querySelector('githubLogin').style.display = 'block';
        }).catch((error) => {
            // An error happened.
        });
    });
}