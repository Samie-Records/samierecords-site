// This script will grab the data you saved in localStorage from the index.html click and inject it into your page elements.

document.addEventListener("DOMContentLoaded", function () {
  // 1. Get the data from localStorage
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData) {
    // 2. Target your HTML elements using the IDs in your code
    const mainImg = document.getElementById("main-product-img");
    const mainTitle = document.getElementById("main-product-title");
    const mainPrice = document.getElementById("product-price");

    // 3. Inject the data
    if (mainImg) mainImg.src = productData.image;
    if (mainTitle) mainTitle.innerText = productData.name;
    
    // Format price with commas (e.g., 80,000)
    if (mainPrice) {
        mainPrice.innerText = Number(productData.price).toLocaleString();
    }

    // Optional: Update the "Add to Cart" button with the specific product ID
    const addBtn = document.getElementById("addToCartBtn");
    if (addBtn) {
      addBtn.setAttribute("data-id", productData.id);
      addBtn.setAttribute("data-name", productData.name);
      addBtn.setAttribute("data-price", productData.price);
      addBtn.setAttribute("data-image", productData.image);
    }
  } else {
    console.error("No product data found in localStorage.");
  }
});