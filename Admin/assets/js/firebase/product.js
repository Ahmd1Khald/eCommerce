import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase,child, ref, push, set, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
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

// Product Form Submit
// const productForm = document.getElementById("productForm");
// const errorMessage = document.getElementById("errorMessage");

// productForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Get values from form
//     const productName = document.getElementById("productName").value;
//     const productCategory = document.getElementById("productCategory").value;
//     const productPrice = parseFloat(document.getElementById("productPrice").value);
//     const productDescription = document.getElementById("productDescription").value;
//     const productImage = document.getElementById("productImage").value;

//     // Validate form data
//     if (!productName || !productCategory || isNaN(productPrice) || !productDescription || !productImage) {
//         errorMessage.textContent = "All fields are required.";
//         return;
//     } else {
//         errorMessage.textContent = "";
//     }

//     createProduct(productName, productCategory,productPrice, productDescription,productImage)
// });

// API URL for external product data
const apiUrl = 'https://fakestoreapi.com/products'; // Replace with your API URL
console.log(data);

// Fetch and Create Products in Firebase
async function fetchAndCreateProducts() {
    const productsRef = ref(database, "products");

    // Check if products already exist in Firebase
    try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
            console.log("Products already exist in Firebase.");
            return; // Skip fetching if data already exists
        }
        // If products don't exist, fetch them from the API
        // console.log("Fetching products from API...");
        // const response = await fetch(apiUrl);
        // const products = await response.json();

        // Loop through the products data and send it to Firebase
        data.forEach(product => {
            const { title, category, price, description,image,stock } = product;
            createProduct(title, category, price, description,image,stock);
        });

    } catch (error) {
        console.log("Error fetching or checking products in Firebase: "+ error);
    }
}



// Create a product in Firebase
function createProduct(title, category, price, description,image, stock) {
    // Reference to the Firebase database
    const productsRef = ref(database, "products");
    
    // Product data
    const productData = {
        title,
        category,
        price,
        description,
        image,
        stock,
    };

    // Generate a unique ID using push()
    const newProductRef = push(productsRef);

    // Save product data with unique ID to Firebase
    set(newProductRef, productData)
        .then(() => {
            console.log("Product created successfully!");
            //productForm.reset(); // Reset the form
        })
        .catch((error) => {
            console.error("Error creating product: ", error);
        });
}

// get all products in firebase
function getAllProducts() {
    const dbRef = ref(database);
  
    get(child(dbRef, "products")) // 🔹 Fetch all products
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val()); // Logs all products
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }
// Ensure the fetchAndCreateProducts is called after the page loads
window.onload = function () {
    fetchAndCreateProducts();
    getAllProducts()
};

