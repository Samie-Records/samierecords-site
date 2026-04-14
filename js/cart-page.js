// js/cart-page.js

function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem("jlk_cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <div style="text-align:center; padding: 10px; display: flex; gap: 15px; justify-content: center;">
                <h3>Your cart is empty</h3>
                <a href="index.html" style="color:#33b27b; text-decoration: none; font-weight: bold;">← Start Shopping</a>
            </div>`;
    updateSummary(0, 0);
    return;
  }

  let cartHTML = "";
  let totalValue = 0;

  cart.forEach((item) => {
    const price = parseFloat(item.price) || 0;
    const itemTotal = price * item.quantity;
    totalValue += itemTotal;

    cartHTML += `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border-bottom: 1px solid #eee; background: #fff; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${
                      item.image
                    }" width="70" style="object-fit: contain;">
                    <div>
                        <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                        <p style="color: #33b27b; margin: 0;">₦ ${price.toLocaleString()}</p>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <div style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px;">
                        <button onclick="handleQtyChange('${
                          item.id
                        }', -1)" style="padding: 5px 12px; border: none; background: #f8f8f8; cursor: pointer;">-</button>
                        <span style="padding: 0 15px; font-weight: bold;">${
                          item.quantity
                        }</span>
                        <button onclick="handleQtyChange('${
                          item.id
                        }', 1)" style="padding: 5px 12px; border: none; background: #f8f8f8; cursor: pointer; ">+</button>
                    </div>
                    <button onclick="handleDelete('${
                      item.id
                    }')" style="background: none; border: none; color: white; cursor: pointer; font-size: 14px;  font-weight: 600; padding: 10px; background: #33b27b;  border-radius: 6px;
                        ">
                    <ion-icon name="trash-outline"></ion-icon> Remove
                    </button>
                </div>

             
            </div>`;
  });

  cartContainer.innerHTML = cartHTML;
  updateSummary(totalValue, cart.length);
}

// Global scope helpers
window.handleQtyChange = (id, delta) => {
  if (window.changeQuantity) {
    window.changeQuantity(id, delta);
    renderCart();
  }
};

window.handleDelete = (id) => {
  if (window.removeFromCart) {
    window.removeFromCart(id);
    renderCart();
  }
};

function updateSummary(total, count) {
  const displayTotal = `₦ ${total.toLocaleString()}`;

  // Using simple if-checks to avoid assignment errors on null elements
  const elItemsTotal = document.getElementById("itemsTotal");
  const elItemsPrice = document.getElementById("itemsPrice");
  const elSubtotal = document.getElementById("subtotal");
  const elCheckout = document.getElementById("checkoutTotal");

  if (elItemsTotal) elItemsTotal.textContent = `Items total (${count})`;
  if (elItemsPrice) elItemsPrice.textContent = displayTotal;
  if (elSubtotal) elSubtotal.textContent = displayTotal;
  if (elCheckout) elCheckout.textContent = displayTotal;
}

// Initialize
document.addEventListener("DOMContentLoaded", renderCart);
// 1. Hook into the Checkout Button
document.querySelector('.checkout').addEventListener('click', function(e) {
    e.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem("jlk_cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Calculate total in Kobo (Paystack uses Kobo/Cents: Multiply by 100)
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += (parseFloat(item.price) * item.quantity);
    });

    payWithPaystack(totalAmount);
});


// 2. Paystack Integration Function
function payWithPaystack(amount) {
    const cart = JSON.parse(localStorage.getItem("jlk_cart")) || [];
    
    // 1. Create a comma-separated list of the slugs for the products
    const productSlugs = cart.map(item => item.id).join(",");

    // 2. Construct the URL
    let checkoutUrl = "";

    if (cart.length === 1) {
        // Link for a single item
        checkoutUrl = `https://paystack.com/buy/${cart[0].id}`;
    } else {
        // Link for the main storefront
        checkoutUrl = `https://paystack.shop/samie-records`; 
    }

    // 3. Open in a new tab/blank page
    window.open(checkoutUrl, '_blank');
}