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

    products?.addEventListener("click", function (event) {
        event.preventDefault();
        updatePageContent(`<h2>Products</h2>`, products);
    });

    categories?.addEventListener("click", function (event) {
        event.preventDefault();
        updatePageContent(`<h2>Categories</h2>`, categories);
    });

    orders?.addEventListener("click", function (event) {
        event.preventDefault();
        updatePageContent(`<h2>Orders</h2>`, orders);
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

