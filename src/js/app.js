// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, Timestamp, onSnapshot, updateDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
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
const githubLogin = document.querySelector('#githubLogin');
const dateCreated = document.querySelector("#dateCreated");
const filesRemaining = document.querySelector("#filesRemaining");
const gBRemaining = document.querySelector("#gBRemaining");
const zeSubmit = document.querySelector("#zeSubmit");
const zeSignOut = document.querySelector("#zeSignOut");

/** Admin: Firestore Constants */
const zeCreateBtn = document.querySelector('#zeCreateBtn');
const zeGender = document.querySelector('#zeGender');
const zeNameOfStd = document.querySelector("#zeNameOfStd");
const zeRollNo = document.querySelector("#zeRollNo");
const zeSection = document.querySelector("#zeSection");
const zeEditBtn = document.querySelector('.zeEditBtn');
const zeDeleteBtn = document.querySelector('.zeDeleteBtn');

/** Admin: CRUD */


/** Admin: Firestore Create Insert Data */
// if (zeCreateBtn) {
//     zeCreateBtn.addEventListener('click', (e) => {
//         e.preventDefault();

//         async function saveZeStudentsFormData() {
//             const docRef1 = await addDoc(collection(db, 'zeStudentsListForm'), {
//                 'Gender': zeGender.value,
//                 'NameOfStudent': zeNameOfStd.value,
//                 'RollNo': zeRollNo.value,
//                 'Section': zeSection.value,
//                 CreatedOn: Timestamp.fromDate(new Date()),
//                 UpdatedOn: Timestamp.fromDate(new Date()),
//             }).then(() => {
//                 console.log('Document written with ID: ', docRef1.id);
//                 profileForm.reset();
//             }).catch((error) => {
//                 console.error('Error adding document: ', error);
//             });
//         }

//         saveZeStudentsFormData();

//         // The Form is Reset
//         zeGender.value = '';
//         zeNameOfStd.value = '';
//         zeRollNo.value = '';
//         zeSection.value = '';
//     });

//     /** Alerts */
//     const alertPlaceholder1 = document.getElementById('liveAlertPlaceholder1');
//     const appendAlert1 = (message, type) => {
//         const wrapper1 = document.createElement('div');
//         wrapper1.innerHTML = [
//             `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//             `<div>${message}</div>`,
//             `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
//             `</div>`
//         ].join('');

//         alertPlaceholder1.append(wrapper1);
//     };

//     const alertTrigger1 = document.getElementById('zeCreateBtn');
//     if (alertTrigger1) {
//         alertTrigger1.addEventListener('click', () => {
//             appendAlert1('The data was inserted!', 'success');
//         });
//     }
// }

/** Admin: Firestore Edit Data */
// if (zeEditBtn) {
//     async function getZeEdits() {
//         const docRef2 = await updateDoc(collection(db, 'zeStudentsListForm'), {
//             'Gender': zeGender.value,
//             'NameOfStudent': zeNameOfStd.value,
//             'RollNo': zeRollNo.value,
//             'Section': zeSection.value,
//             UpdatedOn: Timestamp.fromDate(new Date()),
//         }).then(() => {
//             console.log('Document written with ID: ', docRef2.id);
//             profileForm.reset();
//         }).catch((error) => {
//             console.error('Error adding document: ', error);
//         });
//     }

//     getZeEdits();

//     /** Alerts */
//     const alertPlaceholder2 = document.getElementById('liveAlertPlaceholder2');
//     const appendAlert2 = (message, type) => {
//         const wrapper2 = document.createElement('div');
//         wrapper2.innerHTML = [
//             `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//             `<div>${message}</div>`,
//             `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
//             `</div>`
//         ].join('');

//         alertPlaceholder2.append(wrapper2);
//     };

//     const alertTrigger2 = document.getElementById('zeEditBtn');
//     if (alertTrigger2) {
//         alertTrigger2.addEventListener('click', () => {
//             appendAlert2('The data was updated!', 'success');
//         });
//     }

// }

/** Admin: Firestore Delete Data */
// if (zeDeleteBtn) {
//     async function removeZeDocument() {
//         const docRef3 = await deleteDocDoc(collection(db, 'zeStudentsListForm'), {
//             'Gender': zeGender.value,
//             'NameOfStudent': zeNameOfStd.value,
//             'RollNo': zeRollNo.value,
//             'Section': zeSection.value,
//             CreatedOn: Timestamp.fromDate(new Date()),
//             UpdatedOn: Timestamp.fromDate(new Date()),
//         }).then(() => {
//             console.log('Document written with ID: ', docRef3.id);
//             profileForm.reset();
//         }).catch((error) => {
//             console.error('Error adding document: ', error);
//         });
//     }

//     removeZeDocument();

//     /** Alerts */
//     const alertPlaceholder3 = document.getElementById('liveAlertPlaceholder3');
//     const appendAlert3 = (message, type) => {
//         const wrapper3 = document.createElement('div');
//         wrapper3.innerHTML = [
//             `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//             `<div>${message}</div>`,
//             `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
//             `</div>`
//         ].join('');

//         alertPlaceholder3.append(wrapper3);
//     };

//     const alertTrigger3 = document.getElementById('zeDeleteBtn');
//     if (alertTrigger3) {
//         alertTrigger3.addEventListener('click', () => {
//             appendAlert3('The data was deleted!', 'success');
//         });
//     }
// }

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

/** Firestore Read Template - Temporarily commented out because the read data is always showing undefined */
// var stdNo = 0;

// var tbody = document.getElementById('tbody1');

// function AddItemToTable(name, roll, sec, gen) {
//     let trow = document.createElement("tr");
//     let td1 = document.createElement('td');
//     let td2 = document.createElement('td');
//     let td3 = document.createElement('td');
//     let td4 = document.createElement('td');
//     let td5 = document.createElement('td');

//     td1.innerHTML = ++stdNo;
//     td2.innerHTML = name;
//     td3.innerHTML = roll;
//     td4.innerHTML = sec;
//     td5.innerHTML = gen;

//     trow.appendChild(td1);
//     trow.appendChild(td2);
//     trow.appendChild(td3);
//     trow.appendChild(td4);
//     trow.appendChild(td5);

//     tbody.appendChild(trow);
// }

// function AddAllItemsToTable(TheStudent) {
//     stdNo = 0;
//     tbody.innerHTML = "";
//     TheStudent.forEach(element => {
//         AddItemToTable(element.NameOfStudent, element.RollNo, element.Section, element.Gender);
//     });
// }

// window.onload = function () {
//     GetAllDataOnce();

//     async function GetAllDataOnce() {
//         const querySnapshot1 = await getDocs(collection(db, 'zeStudentsListForm'));

//         if (querySnapshot1.exists()) {
//             var students = [];

//             querySnapshot1.forEach(doc => {
//                 students.push(doc.data());

//                 AddAllItemsToTable(students);
//             });
//         }
//     }
// }

// window.onload = function () {
//     GetAllDataOnceRealTime();

//     async function GetAllDataOnceRealTime() {
//         const dbRef = collection(db, 'zeStudentsListForm');

//         onSnapshot(dbRef, (querySnapshot1) => {
//             var students = [];

//             querySnapshot1.forEach(doc => {
//                 students.push(doc.data());
//             });

//             AddAllItemsToTable(students);
//         });
//     }
// }

/** Admin: CRUD  */
let NameBox = document.getElementById("NameBox");
let RollBox = document.getElementById("RollBox");
let SecBox = document.getElementById("SecBox");
let GenBox = document.getElementById("GenBox");

let InsBtn = document.getElementById('InsBtn');
let SelBtn = document.getElementById('SelBtn');
let UpdBtn = document.getElementById('UpdBtn');
let DelBtn = document.getElementById('DelBtn');

/** Adding Document with AutoID */
// async function AddDocument_AUTOID() {
//     var ref = collection(db, "zeCRUDDemo");

//     await addDoc(
//         ref, {
//         NameOfStd: NameBox.value,
//         RollNo: RollBox.value,
//         Section: SecBox.value,
//         Gender: GenBox.value,
//         CreatedOn: Timestamp.fromDate(new Date()),
//         UpdatedOn: Timestamp.fromDate(new Date()),
//     }
//     ).then(() => {
//         alert("Data Added successfully");
//     }).catch((error) => {
//         alert("Unsuccessful operation, error" + error);
//     })
// }


/** Adding Document with CustomID */
async function AddDocument_CustomID() {
    var ref = doc(db, "zeCRUDDemo", RollBox.value);

    await setDoc(
        ref, {
        NameOfStd: NameBox.value,
        RollNo: RollBox.value,
        Section: SecBox.value,
        Gender: GenBox.value,
        CreatedOn: Timestamp.fromDate(new Date()),
        UpdatedOn: Timestamp.fromDate(new Date()),
    }
    ).then(() => {
        alert("Data Added successfully");
    }).catch((error) => {
        alert("Unsuccessful operation, error" + error);
    })
}

/** Getting Document */
async function GetADocument() {
    var ref = doc(db, "zeCRUDDemo", RollBox.value);

    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        NameBox.value = docSnap.data().NameOfStd;
        SecBox.value = docSnap.data().Section;
        GenBox.value = docSnap.data().Gender;
    } else {
        alert("No such document");
    }
}

/** Assign Events to Btns */
InsBtn.addEventListener("click", AddDocument_CustomID);
SelBtn.addEventListener("click", GetADocument);