// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiOz7EUZnjFYR90oeKf2xS2n-iwwEJX3k",
    authDomain: "e-commerce-5b125.firebaseapp.com",
    databaseURL: "https://e-commerce-5b125-default-rtdb.firebaseio.com/",
    projectId: "e-commerce-5b125",
    storageBucket: "e-commerce-5b125.appspot.com",
    messagingSenderId: "976262217130",
    appId: "1:976262217130:web:dca08cdc6333ef800cbfd3",
    measurementId: "G-8F0Z3M2K78",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


//* Mostafa 

function createProduct(){}






// // Reference to the user data
// const userId = "FZrA37lVTHOR3LWrqYX8P9nAbtP2"; // Replace with the actual user UID
// const userRef = ref(database, `users/${userId}`);

// // Fetch user data
// get(userRef).then((snapshot) => {
//     if (snapshot.exists()) {
//         console.log("User Data:", snapshot.val());
//     } else {
//         console.log("No data found");
//     }
// }).catch((error) => {
//     console.error("Error fetching data:", error);
// });
