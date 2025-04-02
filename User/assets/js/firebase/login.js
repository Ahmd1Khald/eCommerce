import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
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
const auth = getAuth(app);
const database = getDatabase(app);

// Login user with Email & Password
document
  .getElementById("loginBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form reload

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User logged in successfully!");
        console.log("Logged in user: ", user);
      })
      .catch((error) => {
        console.error("Auth Error:", error);
        const errorMessage = getErrorMessage(error.code);
        alert(errorMessage);
      });
  });

// Login user with Google Account
document
  .getElementById("loginWithGoogleBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form reload
    const provider = new GoogleAuthProvider();
    // Open the popup for Google login
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User logged in: ", user);
        alert("User logged in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        console.error("Error: ", errorCode, errorMessage);
        alert(errorMessage);
      });
  });


  // Function to translate Firebase error codes into user-friendly messages
function getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is not valid. Please enter a valid email address.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "No user found with this email address. Please check your email or sign up.";
      case "auth/wrong-password":
        return "The password is incorrect. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already in use. Try logging in or use a different email.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      case "auth/operation-not-allowed":
        return "This operation is not allowed. Please contact support.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with the same email but different sign-in credentials.";
      default:
        return "An error occurred. Please try again later.";
    }
}

