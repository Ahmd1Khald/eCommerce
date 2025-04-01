const routes = {
    home: "/Admin/assets/views/dashboard.html",
    //login: "/Admin/assets/views/login.html",
};

// Navigate without reloading
function navigate(event, page) {
    if (event) event.preventDefault();  // Prevents full page reload
    window.history.pushState({ page }, "", "/" + page);
    loadPage(page);
}

// Load page dynamically
function loadPage(page) {
    if (!routes[page]) {
        document.getElementById("content").innerHTML = "<h1>404 - Page Not Found</h1>";
        return;
    }

    fetch(routes[page])
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => {
            document.getElementById("content").innerHTML = "<h1>Error Loading Page</h1>";
        });
}

// Handle back/forward navigation
window.onpopstate = () => {
    loadPage(window.location.pathname.substring(1) || "home");
};

// ✅ Load the dashboard when the page starts
document.addEventListener("DOMContentLoaded", () => {
    loadPage("home");
});
