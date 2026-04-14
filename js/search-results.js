const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search')?.toLowerCase().trim();

if (searchTerm) {
    let matchCount = 0;
    
    // Target both product types
    const allProducts = document.querySelectorAll('.col-4, .unique-product-card');
    
    allProducts.forEach(product => {
        const productImg = product.querySelector('.product-link');
        const fullName = productImg ? productImg.getAttribute('data-name').toLowerCase() : "";
        
        if (fullName.includes(searchTerm)) {
            // REMOVE the 'hidden' style instead of forcing 'block'
            product.style.display = ""; 
            matchCount++;
        } else {
            // Hide non-matches
            product.style.display = "none";
        }
    });

    // Handle the Section Containers
    const sellerSection = document.querySelector('.small-container');
    const beatSection = document.querySelector('.product-showcase');

    // Show/Hide "The Best-Seller Collection" section
    const visibleBestSellers = sellerSection.querySelectorAll('.col-4:not([style*="display: none"])');
    sellerSection.style.display = visibleBestSellers.length > 0 ? "" : "none";

    // Show/Hide "Instant Download" section
    const visibleBeats = beatSection.querySelectorAll('.unique-product-card:not([style*="display: none"])');
    beatSection.style.display = visibleBeats.length > 0 ? "" : "none";

    // Update Title Text
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        if (matchCount === 0) {
            sellerSection.style.display = ""; // Show section to display error
            titleElement.innerText = "No results found for: " + urlParams.get('search');
        } else {
            titleElement.innerText = "Search Results for: " + urlParams.get('search');
        }
    }
}