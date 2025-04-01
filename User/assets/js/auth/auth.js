// Import Firebase modules
import { auth, database, db } from "..//firebase/firebase-initialize.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Register User and Store Data in Realtime Database
function register() {
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
