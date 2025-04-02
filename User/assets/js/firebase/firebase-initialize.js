import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiOz7EUZnjFYR90oeKf2xS2n-iwwEJX3k",
    authDomain: "e-commerce-5b125.firebaseapp.com",
    databaseURL: "https://e-commerce-5b125-default-rtdb.firebaseio.com/",
    projectId: "e-commerce-5b125",
    storageBucket: "e-commerce-5b125.appspot.com",
    messagingSenderId: "976262217130",
    appId: "1:976262217130:web:dca08cdc6333ef800cbfd3",
    measurementId: "G-8F0Z3M2K78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById("registerBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form reload

    // Get user input values
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    // Register user with Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user data in Firebase Realtime Database
            storedUserData(name,email,user,"user");
            alert("User registed successfully!");
        })
        .catch((error) => {
            console.error("Auth Error:", error);
            alert("Error: " + error.message);
        });
});

function storedUserData(name,email,user,role){
    
    set(ref(database, "users/" + user.uid), {
        name: name,
        email: email,
        uid: user.uid,
        role:role
    })
    .then(() => {
        alert("User registered and data stored successfully!");
    })
    .catch((error) => {
        console.error("Database Error:", error);
        alert("Error saving user data: " + error.message);
    });
}
