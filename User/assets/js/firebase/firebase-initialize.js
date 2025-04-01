// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiOz7EUZnjFYR90oeKf2xS2n-iwwEJX3k",
    authDomain: "e-commerce-5b125.firebaseapp.com",
    databaseURL: "https://e-commerce-5b125-default-rtdb.firebaseio.com",
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
const db = getFirestore(app);

// Export for use in other files
//export { auth, database, db };














// Register User and Store Data in Realtime Database
function register() {
    alert("name + email + password ++++++++");
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    alert(name + email + password);

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Save user data in Realtime Database
            set(ref(database, "users/" + user.uid), {
                name: name,
                email: email,
                uid: user.uid
            })
            .then(() => {
                alert("User registered and data stored!");
                updateUser(user);
            })
            .catch(error => alert("Error storing data: " + error.message));
        })
        .catch(error => alert(error.message));
}

// Login User
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("Login successful!");
            updateUser(userCredential.user);
        })
        .catch(error => alert(error.message));
}

// Logout User
function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out!");
            updateUser(null);
        })
        .catch(error => alert(error.message));
}

// Update UI with User Info (Realtime Database)
function updateUser(user) {
    //const userInfo = document.getElementById("userInfo");
    
    if (user) {
        get(ref(database, "users/" + user.uid)).then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                userInfo.innerText = `Logged in as: ${userData.name} (${userData.email})`;
            } else {
                userInfo.innerText = "User data not found!";
            }
        }).catch(error => alert("Error fetching user data: " + error.message));
    } 
    // else {
    //     userInfo.innerText = "Not logged in";
    // }
}

// Persist Authentication State
onAuthStateChanged(auth, user => {
    updateUser(user);
});

// Fetch User Name from Firestore
async function fetchUserName() {
    const userDocRef = doc(db, "users", "yMPh93Zev4jQXqaeaPVg");
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            let adminArray = docSnap.data().admin;
            if (Array.isArray(adminArray) && adminArray.length > 0) {
                console.log("User Name:", adminArray[0]["user-name"]);
            } else {
                console.log("No admin data found.");
            }
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}

// Attach event listeners to buttons
document.getElementById("registerBtn")?.addEventListener("click", register);
document.getElementById("loginBtn")?.addEventListener("click", login);
document.getElementById("logoutBtn")?.addEventListener("click", logout);

