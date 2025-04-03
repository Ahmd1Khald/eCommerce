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
// const apiUrl = 'https://fakestoreapi.com/products'; // Replace with your API URL
// console.log(data);

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

// Fetch all products in Firebase
function getAllProducts() {
    const dbRef = ref(database);
    return get(child(dbRef, "products")) // Fetch all products
        .then((snapshot) => {
            if (snapshot.exists()) {
                const productsData = snapshot.val(); // Get the raw data object
                // Convert to array with IDs
                const productsArray = Object.entries(productsData).map(([id, product]) => ({
                    id, // Include the Firebase key as the product ID
                    ...product // Spread the product properties (title, description, etc.)
                }));
                return productsArray; // Return the array of products
            } else {
                return []; // Return an empty array if no data exists
            }
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
            return []; // Return an empty array in case of error
        });
}
// Ensure the fetchAndCreateProducts is called after the page loads
window.onload = function () {
    //fetchAndCreateProducts();
    //getAllProducts();
};



//* Handle Dashboard content that show when navbar item clicked 
document.addEventListener("DOMContentLoaded", function () {
    const pageContent = document.getElementById("page-content");
    const home = document.getElementById("home");
    const products = document.getElementById("products");
    const categories = document.getElementById("categories");
    const orders = document.getElementById("orders");
    const navItems = [home, products, categories, orders];

    // Function to update content and active state
    function updatePageContent(content, selectedItem) {
        pageContent.innerHTML = content;
        navItems.forEach(item => item?.classList.remove("active"));
        selectedItem?.classList.add("active");
    }

    // Default Home page content on load
    if (home) {
        updatePageContent(getHomeContent(), home);
    }

    home?.addEventListener("click", function (event) {
        event.preventDefault();
        updatePageContent(getHomeContent(), home);
    });

    products?.addEventListener("click", async function (event) {
        event.preventDefault();
        // Since getProductContent is async, await its result and then update the content
        const content = await getProductContent();
        updatePageContent(content, products);
    });

    categories?.addEventListener("click", function (event) {
        event.preventDefault();
        
        updatePageContent(getCategoriesContent(), categories);
    });

    orders?.addEventListener("click", function (event) {
        event.preventDefault();
        updatePageContent(getOrdersContent(), orders);
    });

    // Function to return Home Page Content
    function getHomeContent() {
        return `
        <div class="row">
            <div class="col-sm-12 col-xl-9">
                <section class="overview-container col-sm-12">
                    <div class="overview-box">
                        <div class="overview d-flex">
                            <h2>Overview</h2>
                            <select class="list-items">
                                <option selected>All time</option>
                                <option value="">Last Month</option>
                                <option value="">Last Week</option>
                                <option value="">Today</option>
                            </select>
                        </div>
                        <div class="customers-incomes d-flex">
                            <div class="customers col-5">
                                <section class="customer-number">
                                    <span>Customers</span>
                                    <h4>10,243</h4>
                                </section>
                                <section>
                                    <span class="customer-percentage">8%</span>
                                </section>
                            </div>
                            <div class="incomes col-5">
                                <section class="income-number">
                                    <span>Income</span>
                                    <h4>$33333333</h4>
                                </section>
                                <section class="income-percentage">
                                    <span class="customer-percentage">8%</span>
                                </section>
                            </div>
                        </div>
                        <div class="admins">
                            <h5 class="welcome-admins">
                                Welcome to our <b>new online experience</b>
                            </h5>
                            <div class="admins-Images d-flex flex-wrap justify-content-evenly">
                                ${generateAdminImages(4)}
                            </div>
                        </div>
                    </div>
                </section>
                <section class="total-income-container col-sm-12">
                    <div class="total-income-box">
                        <div class="total-income d-flex">
                            <h2>Total Income</h2>
                            <select class="list-items">
                                <option selected>All time</option>
                                <option value="">Last Month</option>
                                <option value="">Last Week</option>
                                <option value="">Today</option>
                            </select>
                        </div>
                        <canvas id="myChart" style="width: 100%; max-width: 700px"></canvas>
                    </div>
                </section>
            </div>
        </div>`;
    }

// Function to return Products in Page Content
async function getProductContent() {
    try {
        // Fetch products asynchronously
        const products = await getAllProducts();
        
        // Ensure that we have an array of products
        if (!Array.isArray(products)) {
            console.error("Expected an array of products, but got:", products);
            return "<div>Error loading products.</div>";
        }

        // Generate product cards dynamically once the products are available
        return `
        <div class="container mt-4">
            <h2 class="mb-4">Products</h2>
            <div class="row">
                ${generateProductCards(products)} <!-- Pass the products to generate cards -->
            </div>
        </div>`;
    } catch (error) {
        console.error("Error fetching products:", error);
        return "<div>Error loading products.</div>";
    }
}

// Function to generate product cards dynamically
function generateProductCards(products) {
    return products.map(p => `
        <div class="col-md-4 mb-4 product-card" id="product-${p.id}">
            <div class="card shadow-sm">
                <img src="${p.image}" class="card-img-top" alt="${p.title}">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.description}</p>
                    <p><strong>Category:</strong> ${p.category}</p>
                    <p><strong>Stock:</strong> ${p.stock}</p>
                    <p><strong>Price:</strong> ${p.price}</p>
                    <button class="btn btn-warning" onclick="editProduct(${p.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}



    
    

    // Function to return Categories in Page Content
    function getCategoriesContent() {
        return `getCategoriesContent`;
    }

    // Function to return Categories in Page Content
    function getOrdersContent() {
        return `getOrdersContent`;
    }

    // Function to generate multiple admin images dynamically
    function generateAdminImages(count) {
        let images = "";
        for (let i = 0; i < count; i++) {
            images += `
            <section>
                <img width="100" height="100" src="https://img.icons8.com/bubbles/100/user.png" alt="user"/>
                <span>Mostafa Mohamed</span>
            </section>`;
        }
        return images;
    }
});

