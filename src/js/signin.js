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

// let signupbtn = document.querySelector("#signInBtn").addEventListener('click', signInWithEmailPassword);
document.querySelector("#signInBtn").addEventListener('click', signInWithEmailPassword);

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
}

// Initialize Cloud Firestore
let db = firebase.firestore();

// Adding a new document - cities
let citiesRef = db.collection("cities");

citiesRef
    .doc("SF")
    .set({
        name: "San Fransicso",
        state: "CA",
        country: "USA",
        capital: false,
        population: 86000,
        regions: [
            "west_coast",
            "noracal"
        ],
        lastUpdatedOn: firebase.firestore.FieldValue.serverTimestamp()
    });

citiesRef
    .doc("LA")
    .set({
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: [
            "west_coast",
            "socal"
        ],
        lastUpdatedOn: firebase.firestore.FieldValue.serverTimestamp()
    });

citiesRef
    .doc("DC")
    .set({
        name: "Washington DC",
        state: null,
        country: "USA",
        capital: true,
        population: 680000,
        regions: ["east_coast"]
    });

citiesRef
    .doc("TOK")
    .set({
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 900000,
        regions: [
            "kanto",
            "honshu"
        ]
    });

citiesRef
    .doc("BJ")
    .set({
        name: "Beijing",
        state: null,
        country: "China",
        capital: true,
        population: 215000000,
        regions: [
            "jingijinji",
            "hebei"
        ]
    });

// Inside the cities add the landmarks
// citiesRef.doc('SF').collection('landmarks').doc().set({
//     name: 'Golden Gate Bridge',
//     type: 'bridge'
// });
// citiesRef.doc('SF').collection('landmarks').doc().set({
//     name: 'Legion of Honor',
//     type: 'museum'
// });
// citiesRef.doc('LA').collection('landmarks').doc().set({
//     name: 'Griffith Park',
//     type: 'park'
// });
// citiesRef.doc('LA').collection('landmarks').doc().set({
//     name: 'The Getty',
//     type: 'museum'
// });
// citiesRef.doc('DC').collection('landmarks').doc().set({
//     name: 'Lincoln Memorial',
//     type: 'memorial'
// });
// citiesRef.doc('DC').collection('landmarks').doc().set({
//     name: 'National Air and Space Museum',
//     type: 'museum'
// });
// citiesRef.doc('TOK').collection('landmarks').doc().set({
//     name: 'Ueno Park',
//     type: 'park'
// });
// citiesRef.doc('TOK').collection('landmarks').doc().set({
//     name: 'National Museum of Nature and Science',
//     type: 'museum'
// });

// citiesRef.doc('BJ').collection('landmarks').doc().set({
//     name: 'Jingshan Park',
//     type: 'park'
// });

// citiesRef.doc('BJ').collection('landmarks').doc().set({
//     name: 'Beijing Ancient Observatory',
//     type: 'museum'
// });

// Query the landmarks which are a museum
let museums = db.collectionGroup('landmarks').where('type', '==', 'museum');
museums.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
});

// Order and limit data


let docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};

db.collection("data").doc("one").set(docData).then(() => {
    console.log("Document successfully written!");
});

// Create an initial document to update
let frankDocRef = db.collection("users").doc("names");
frankDocRef.set({
    name: "Frank",
    favorites: {
        food: "Pizza",
        color: "Blue",
        subject: "recess",
    },
    age: 12
});

// To update age and favorite color
db.collection("users").doc("names").update({
    age: 13,
    "favorites.color": "Red"
}).then(() => {
    console.log("Document successfully updated");
});

// Update elements in an array
let washingtonRef = db.collection("cities").doc("DC");

// Atomically add a new region to the "regions" array field
washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field
washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
});

// Increment a numeric value
washingtonRef.update({
    population: firebase.firestore.FieldValue.increment(75)
});

// Get multiple documents from a collection
db.collection("cities").where("capital", "==", true)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


// Get realtime updates with Firestore
db.collection("cities")
    .doc("SF")
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
    });

// Listen to multiple documents in a collection
db.collection("cities").where("state", "==", "CA")
    .onSnapshot((querySnapshot) => {
        let cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(", "));
    });

// Using the in, not-in and array-contains-any
// Listen to multiple documents in a collection - query returns every city document where the country field is set to USA or Japan
db.collection("cities").where('country', 'in', ['USA', 'Japan'])
    .onSnapshot((querySnapshot) => {
        let cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
        console.log("Current cities in USA and Japan");
    });

// cities not in USA or Japan
db.collection("cities").where('country', 'not-in', ['USA', 'Japan'])
    .onSnapshot((querySnapshot) => {
        let cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
        console.log("Current cities not in USA and Japan");
    });

// Order By Query the first 3 cities alphabetically - Todo its still not working 
// citiesRef.orderBy("name").limit(3);

// Order By Query the first 3 cities descending - Todo its still not working
// citiesRef.orderBy("name", "desc").limit(3);


// View changes between snapshots
db.collection("cities").where("state", "==", "CA")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });

/** Creating and running a transaction - they fo not modify application state */
// Create a reference to the SF doc.
let keDocRef = db.collection("cities").doc("KE");

// Uncomment to initialize the doc.
keDocRef.set({ population: 50 });

function createTranscaction() {
    return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(keDocRef).then((keDoc) => {
            if (!keDoc.exists) {
                throw "Document does not exist!";
            }

            // Add one person to the city population.
            /** Note: this could be done without a transaction
                   by updating the population using FieldValue.increment() */
            let newPopulation = keDoc.data().population + 110;
            transaction.update(keDocRef, { population: newPopulation });
        });
    }).then(() => {
        console.log("Transaction successfully committed!");
    }).catch((error) => {
        console.log("Transaction failed: ", error);
    });
}

createTranscaction();

let sfDocRef = db.collection("cities").doc("SF");

function checkPopulation() {
    db.runTransaction((transaction) => {
        return transaction.get(sfDocRef).then((sfDoc) => {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }

            var newPopulation = sfDoc.data().population + 1;
            if (newPopulation <= 1000000) {
                transaction.update(sfDocRef, { population: newPopulation });
                return newPopulation;
            } else {
                return Promise.reject("Sorry! Population is too big.");
            }
        });
    }).then((newPopulation) => {
        console.log("Population increased to ", newPopulation);
    }).catch((err) => {
        // This will be an "population is too big" error.
        //console.error(err);
    });
}

checkPopulation();

/** 
 * Batched Writes 
 * */
// Get a new write batch
let batch = db.batch();

// Set the value of 'NYC'
let nycRef = db.collection("cities").doc("NYC");
batch.set(nycRef, { name: "New York City" });

// Update the population of 'SF'
let sfRef = db.collection("cities").doc("SF");
batch.update(sfRef, { "population": 1000000 });

// Add the city 'LA'
let laRef = db.collection("cities").doc("LA");
batch.set(laRef, { name: "Los Cabos" });

// Delete the city 'LA'
let laRef2 = db.collection("cities").doc("LA");
batch.delete(laRef2);

// Commit the batch
batch.commit().then(() => {
    console.log('Succesful batch');
});