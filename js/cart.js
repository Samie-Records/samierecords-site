// js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Event Delegation for "Add to Cart" buttons
    document.body.addEventListener('click', (e) => {
        // Check if the clicked element or its parent has the class
        const btn = e.target.closest('.add-to-cart');
        if (btn) {
            e.preventDefault();
         // Inside js/cart.js - Update the event listener part
            const product = {
                id: btn.dataset.id || 'unknown',
                name: btn.dataset.name || 'Unnamed Product',
                price: parseFloat(btn.dataset.price) || 0,
                image: btn.dataset.image || 'images/default-placeholder.png', // Fallback image
                quantity: 1
            };
                        addToCart(product);
        }
    });
});

// Attach functions to 'window' so other scripts can see them
window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('jlk_cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('jlk_cart', JSON.stringify(cart));
    updateCartCount();
    animateCart();
    
    // Optional: Show your toast instead of an alert
    const toast = document.getElementById('toast');
    if(toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

window.removeFromCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem('jlk_cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('jlk_cart', JSON.stringify(cart));
    updateCartCount();
};

window.changeQuantity = function(productId, delta) {
    let cart = JSON.parse(localStorage.getItem('jlk_cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            window.removeFromCart(productId);
            return;
        }
    }
    
    localStorage.setItem('jlk_cart', JSON.stringify(cart));
    updateCartCount();
};

window.updateCartCount = function() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    let cart = JSON.parse(localStorage.getItem('jlk_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
};






/* =========================
   CART ICON ANIMATION
========================= */

function animateCart() {

  const cartIcons = document.querySelectorAll(".cart");

  cartIcons.forEach(cart => {

    cart.classList.add("animate");

    setTimeout(() => {
      cart.classList.remove("animate");
    }, 400);

  });

}

// 
function viewProduct(id, name, price, image) {
    const productData = { id, name, price, image };
    // Save the specific product you want to see to a "selectedProduct" key
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    // Redirect to the product page
    window.location.href = 'product-page.html';
}



