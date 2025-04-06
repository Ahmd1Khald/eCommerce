import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase,child, ref, push, set, get, update  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { data } from "../firebase/data.js"

// Firebase Configuration
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


// Create a Order in Firebase
// ... your Firebase init code

function createOrder(productId, quantity, status, feedBack) {
    const ordersRef = ref(database, "Orders");

    const OrderData = { productId, quantity, status, feedBack };

    const newOrderRef = push(ordersRef);

    set(newOrderRef, OrderData)
        .then(() => {
            alert("Order created successfully!");
            return getAllOrders().then((orders) => {
                console.log(orders);
            });
        })
        .catch((error) => {
            console.error("Error creating order: ", error);
        });
}

function getAllOrders() {
    const dbRef = ref(database);
    return get(child(dbRef, "Orders")) // Notice: "Orders" with capital 'O'
        .then((snapshot) => {
            if (snapshot.exists()) {
                const ordersData = snapshot.val();
                return Object.entries(ordersData).map(([id, order]) => ({
                    id,
                    ...order
                }));
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.error("Error fetching orders:", error);
            return [];
        });
}

// create order when click btn
document.getElementById("createOrderBtn").addEventListener("click", function(event) {
    event.preventDefault();
    // createOrder("productId", 10, "pending", "feedBack");
    // updateOrderStatus("-ON9eaOiMCi4URxF2SP6","refuse");
});


function updateOrderStatus(orderId, newStatus) {
    const orderRef = ref(database, `Orders/${orderId}`);
  
    update(orderRef, { status: newStatus })
      .then(() => {
        alert(`Order status updated to "${newStatus}"`);
        console.log("Status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  }
