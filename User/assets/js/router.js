// Function to load content dynamically
async function loadContent(view) {
    const appDiv = document.getElementById("app");

    try {
        // Ensure view names are formatted correctly
        const formattedView = view.toLowerCase().trim();
        
        // Fetch the corresponding HTML file
        const response = await fetch(`assets/views/${formattedView}.html`);
        if (!response.ok) throw new Error("Page not found");

        const content = await response.text();
        appDiv.innerHTML = content;
    } catch (error) {
        console.error("Error loading page:", error);
        appDiv.innerHTML = "<h2 class='text-danger'>Page Not Found</h2>";
    }
}

// Function to handle navigation
function navigateTo(view) {
    history.pushState({}, "", view);
    loadContent(view === "/" ? "homepage" : view.substring(1));
}

// Handle browser navigation (back/forward)
window.onpopstate = () => {
    const path = window.location.pathname;
    loadContent(path === "/" ? "homepage" : path.substring(1));
};

// Load initial content
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    loadContent(path === "/" ? "homepage" : path.substring(1));
});
/////////////////////////// favorite product
var favoriteItem=document.getElementById("favoriteItem");
favoriteItem.addEventListener("click",function(){
    console.log("My Favoritr Item");
    favoriteItem.style.backgroundColor="red";
    
})