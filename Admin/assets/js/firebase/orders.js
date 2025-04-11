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

import { fetchProductsMap } from './product.js';


// Create a Order in Firebase
function createOrder(userId, productId, quantity, status, feedBack, time) {
    const ordersRef = ref(database, "Orders");

    const OrderData = {userId, productId, quantity, status, feedBack, time };

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

// Fetch all orders from firebase
export function getAllOrders() {
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
    // createOrder("userID", "productId", 10, "pending", "feedBack",Date.now());
    // updateOrderStatus("-ON9eaOiMCi4URxF2SP6","refuse");
});


// Define the saveOrderChange function globally
window.saveOrderChange = function(orderId) {
    const select = document.querySelector(`#status-${orderId}`);
    const selectedStatus = select.value;
  
    updateOrderStatus(orderId, selectedStatus);
    
    // You can perform the logic to save the selected status here.
    console.log(`Saving order ID: ${orderId} with status: ${selectedStatus}`);
  };
  
  // Function to update order status in the database
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
  
  // Function to generate order cards dynamically from orders + product details
  export function generateOrderCards(orders, productsMap) {
    return orders.map(order => {
      const product = productsMap[order.productId] || {};
      const options = ["Pending", "Confirm", "Reject"].map(status => {
        return `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`;
      }).join('');
  
      return `
        <div class="card mb-3 shadow-sm">
          <div class="card-header bg-secondary text-white">
            <h5>Product: ${product.title || "Unknown"}</h5>
          </div>
          <div class="card-body">
            <p><strong>Quantity:</strong> ${order.quantity}</p>
  
            <div class="form-group">
              <label for="status-${order.id}"><strong>Status:</strong></label>
              <select id="status-${order.id}" class="form-control" data-order-id="${order.id}">
                ${options}
              </select>
            </div>
  
            <button class="btn btn-success mt-2" data-order-id="${order.id}" onclick="saveOrderChange('${order.id}')">Save Change</button>
          </div>
        </div>
      `;
    }).join('');
  }
  
