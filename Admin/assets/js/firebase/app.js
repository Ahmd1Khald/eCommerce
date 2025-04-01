// Import the Firestore database from firebase.js
import { db } from "./firebase-initialize.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Function to fetch and print the user name
async function fetchUserName() {
    const userDocRef = doc(db, "users", "yMPh93Zev4jQXqaeaPVg");
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            let adminArray = docSnap.data().admin; // Get "admin" array
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

// Call the function
fetchUserName();
