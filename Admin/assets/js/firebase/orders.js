import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, child, ref, push, set, get, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { data } from "../firebase/data.js";
import { getUserById } from "../firebase/home.js";

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

// Create an Order in Firebase
// function createOrder(userId, userName, products, status, feedBack, time) {
//   const ordersRef = ref(database, "orders");

//   const OrderData = {
//     userId,
//     userName,
//     products,
//     status,
//     feedBack,
//     time,
//   };

//   const newOrderRef = push(ordersRef);

//   set(newOrderRef, OrderData)
//     .then(() => {
//       alert("Order created successfully!");
//       return getAllOrders().then((orders) => {
//         console.log(orders);
//       });
//     })
//     .catch((error) => {
//       console.error("Error creating order: ", error);
//     });
// }

// Fetch all orders from Firebase
export function getAllOrders() {
  const dbRef = ref(database);
  return get(child(dbRef, "orders"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        return Object.entries(ordersData).map(([id, order]) => ({
          id,
          userId: order.userId,
          userName: order.userName,
          products: order.products,
          status: order.status,
          feedBack: order.feedBack,
          time: order.time,
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

// Define the saveOrderChange function globally
window.saveOrderChange = function(orderId) {
  const select = document.querySelector(`#status-${orderId}`);
  const selectedStatus = select.value;
  console.log("selectedStatus=>"+selectedStatus);
  

  updateOrderStatus(orderId, selectedStatus);
  
  // You can perform the logic to save the selected status here.
  console.log(`Saving order ID: ${orderId} with status: ${selectedStatus}`);
};

// Function to update order status in the database
function updateOrderStatus(orderId, newStatus) {
  const orderRef = ref(database, `orders/${orderId}`);

  update(orderRef, { status: newStatus })
    .then(() => {
      alert(`Order status updated to "${newStatus}"`);
      console.log("Status updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
}

// Function to generate product list HTML
function generateOrderProductList(products, productsMap) {
  if (!Array.isArray(products) || products.length === 0) {
    return "<p>No products in this order.</p>";
  }
  

  return `
    <ul class="list-group mb-3">
      ${products
        .map((prod) => {
          const productInfo = productsMap[prod.productId];
          return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${productInfo ? productInfo.title : "Unknown Product"}
              <span class="badge bg-primary rounded-pill">Qty: ${prod.quantity}</span>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

// Function to generate order cards dynamically
export function generateOrderCards(orders, productsMap) {
  return orders
    .map((order) => {
      const options = ["Pending", "Confirm", "Reject"].map(status => {
        return `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`;
      }).join('');

      return `
        <div class="col-md-6 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Order by: ${order.userName}</h5>
              <p><strong>Feedback:</strong> ${order.feedBack == ''?'No Feedback Yet':order.feedBack}</p>
              <p><strong>Time:</strong> ${new Date(order.time).toLocaleString()}</p>
              <p><strong>Status:</strong> 
                <select id="status-${order.id}" class="form-control" data-order-id="${order.id}">
                  ${options}
                </select>
              </p>
              <button class="btn btn-success mt-2" data-order-id="${order.id}" onclick="saveOrderChange('${order.id}')">Save Change</button>
              <br><br>
              <h6>Products:</h6>
              ${generateOrderProductList(order.products, productsMap)}
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}
// Function to save order status change
window.saveOrderChange = function(orderId) {
  const selectElement = document.querySelector(`#status-${orderId}`);
  if (selectElement) {
    const newStatus = selectElement.value;
    updateOrderStatus(orderId, newStatus);
  } else {
    console.error(`Select element for order ${orderId} not found`);
  }
};


// Uncomment and fix createOrder call
// document.getElementById("createOrderBtn").addEventListener("click", function (event) {
//   event.preventDefault();
//   createOrder(
//     "FZrA37lVTHOR3LWrqYX8P9nAbtP2",
//     "Ahmed Khaled",
//     [
//       { productId: "-ONe5S_ZvSgDoAOVFQsz", quantity: 5 },
//       { productId: "-ONe5S_ZvSgDoAOVFQsz", quantity: 2 },
//     ],
//     "Pending", // Fixed case to match select options
//     "feedBack",
//     Date.now()
//   );
// });