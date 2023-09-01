// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, Timestamp, onSnapshot } from "firebase/firestore";
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
const readData = document.querySelector('#readData');
const githubLogin = document.querySelector('#githubLogin');
const dateCreated = document.querySelector("#dateCreated");
const filesRemaining = document.querySelector("#filesRemaining");
const gBRemaining = document.querySelector("#gBRemaining");
const zeSubmit = document.querySelector("#zeSubmit");
const zeSignOut = document.querySelector("#zeSignOut");

/** Admin: Firestore Create Constants */
const zeSubmitTheStudentsListBtn = document.querySelector('#zeSubmitTheStudentsListBtn');
const zeGender = document.querySelector('#zeGender');
const zeDateCreated = document.querySelector("#zeDateCreated");
const zeGBRemaining = document.querySelector("#zeGBRemaining");

/** Admin: Firestore Create Insert Data */
if (zeSubmitTheStudentsListBtn) {
    zeSubmitTheStudentsListBtn.addEventListener('click', (e) => {
        e.preventDefault();

        async function saveZeStudentsFormData() {
            const docRef1 = await addDoc(collection(db, 'zeStudentsListForm'), {
                'Date Created': zeDateCreated.value,
                'Gender': zeGender.value,
                'GB Remaining': zeGBRemaining.value,
                CreatedOn: Timestamp.fromDate(new Date()),
                UpdatedOn: Timestamp.fromDate(new Date()),
            }).then(() => {
                console.log('Document written with ID: ', docRef1.id);
                profileForm.reset();
            }).catch((error) => {
                console.error('Error adding document: ', error);
            });
        }

        saveZeStudentsFormData();

        /** Alerts */
        const alertPlaceholder1 = document.getElementById('liveAlertPlaceholder1');
        const appendAlert1 = (message, type) => {
            const wrapper1 = document.createElement('div');
            wrapper1.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `<div>${message}</div>`,
                `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
                `</div>`
            ].join('');

            alertPlaceholder1.append(wrapper1);
        };

        const alertTrigger1 = document.getElementById('zeSubmitTheStudentsListBtn');
        if (alertTrigger1) {
            alertTrigger1.addEventListener('click', () => {
                appendAlert1('The data was inserted!', 'success');
            });
        }

        // The Form is Reset
        zeDateCreated.value = '',
            zeGender.value = '';
        zeGBRemaining.value = '';
    });
}

// Admin Project Submit Form
if (zeSubmit) {
    zeSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        async function saveFormData() {
            const docRef = await addDoc(collection(db, 'zeIcloudForm'), {
                'Date Created': dateCreated.value,
                'Files Remaining': filesRemaining.value,
                'GB Remaining': gBRemaining.value,
                CreatedOn: Timestamp.fromDate(new Date()),
                UpdatedOn: Timestamp.fromDate(new Date()),
            }).then(() => {
                console.log('Document written with ID: ', docRef.id);
                profileForm.reset();
            }).catch((error) => {
                console.error('Error adding document: ', error);
            });
        }

        saveFormData();

        // The Form is Reset
        dateCreated.value = '',
            filesRemaining.value = '';
        gBRemaining.value = '';

    });

    /** Alerts */
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `<div>${message}</div>`,
            `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
            `</div>`
        ].join('');

        alertPlaceholder.append(wrapper);
    };

    const alertTrigger = document.getElementById('zeSubmit');
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('The data was inserted!', 'success');
        });
    } else {
        console.log('Error setting up alert');
    }
}

/** Read Data from Firestore */
if (readData) {
    readData.addEventListener('click', (e) => {
        async function readFormData() {
            const querySnapshot = await getDocs(collection(db, 'zeIcloudForm'));

            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);  //This shows the data in the console

                const data = doc.data();
                const row = `<tr>
                    <td>${data.filesRemaining}</td>
                    <td>${data.gBRemaining}</td>
                    </tr>`;
                const table = document.getElementById('myTable');
                table.innerHTML += row;
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

/** Firestore Read Template */
var stdNo = 0;

var tbody = document.getElementById('tbody1');

function AddItemToTable(name, roll, sec, gen) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.innerHTML = ++stdNo;
    td2.innerHTML = name;
    td3.innerHTML = roll;
    td4.innerHTML = sec;
    td5.innerHTML = gen;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);
}

function AddAllItemsToTable(TheStudent) {
    stdNo = 0;
    tbody.innerHTML = "";
    TheStudent.forEach(element => {
        AddItemToTable(element.NameOfStd, element.RollNo, element.Section, element.Gender);
    });
}

window.onload = function () {
    GetAllDataOnce();

    async function GetAllDataOnce() {
        const querySnapshot1 = await getDocs(collection(db, 'TheStudentsList'));

        var students = [];

        querySnapshot1.forEach(doc => {
            students.push(doc.data());

            AddAllItemsToTable(students);
        });
    }
}

// async function GetAllDataRealTime() {
//     const dbRef2 = collection(db, 'TheStudentsList');
//     const querySnapshot2 = await getDocs(dbRef2);

//     onSnapshot(dbRef2, (querySnapshot2) => {
//         var students = [];
//     });

//     querySnapshot2.forEach(doc => {
//         students.push(doc.data());
//     });

//     AddAllItemsToTable(students);
// }

// window.onload = GetAllDataRealTime;

