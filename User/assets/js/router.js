// Function to load content dynamically
function loadContent(view) {
    const contentContainer = document.getElementById('content');
    const viewPath = view === '/' ? '/homepage' : view;
    
    fetch(`/User/assets/views${viewPath}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(html => {
            contentContainer.innerHTML = html;
            
            // Execute scripts in the loaded content
            const scripts = contentContainer.getElementsByTagName('script');
            for (let script of scripts) {
                const newScript = document.createElement('script');
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            }
            
            // Update active navigation link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === view) {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            contentContainer.innerHTML = '<div class="error-message">Page not found</div>';
        });
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
