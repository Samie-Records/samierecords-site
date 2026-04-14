document.addEventListener("DOMContentLoaded", function () {
    // 1. Get the raw data
    const rawData = localStorage.getItem("jlk_cart");
    const cart = JSON.parse(rawData) || [];
    const productContainer = document.querySelector(".door-delivery-container");

    if (!cart || cart.length === 0) {
        if (productContainer) productContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // 4. Calculate subtotal and build HTML
    let subtotal = 0;
    let productHTML = "";

    cart.forEach(item => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 1;
        subtotal += price * qty;

        productHTML += `
            <div class="product" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <img src="${item.image}" width="70px" style="border-radius: 8px;">
                <div class="product-info">
                    <p style="margin: 0; font-weight: bold;">${item.name}</p>
                    <p style="margin: 5px 0;">₦${price.toLocaleString()}</p>
                    <p style="margin: 0; color: #666;">Qty: ${qty}</p>
                </div>
            </div>
        `;
    });

    if (productContainer) {
        productContainer.innerHTML = productHTML;
    }

    document.getElementById("summary-qty").innerText = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
    document.getElementById("summary-subtotal").innerText = subtotal.toLocaleString();
    document.getElementById("summary-total").innerText = subtotal.toLocaleString();

    // --- ADDRESS DISPLAY LOGIC (FIXED PART) ---
    const savedAddress = JSON.parse(localStorage.getItem("customerAddress"));

    if (savedAddress) {
        // Target the display elements in your place-order.html
        // Note: Make sure these selectors match your HTML classes/IDs
        const nameDisplay = document.querySelector(".card-address .title") || document.getElementById("display-name");
        const addressDetailDisplay = document.querySelector(".card-address p") || document.getElementById("display-address");

        if (nameDisplay) {
            nameDisplay.innerText = savedAddress.fullName;
        }
        if (addressDetailDisplay) {
            addressDetailDisplay.innerHTML = `${savedAddress.fullAddress}<br>${savedAddress.displayLine2 || ''}<br>${savedAddress.email || ''}`;
        }
    }

    // --- PAYSTACK INTEGRATION ---
    const confirmBtn = document.getElementById('confirm-order-btn');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault(); 

            // Use the email from savedAddress if it exists, otherwise use fallback
            const customerEmail = savedAddress?.email || "customer@example.com";

            const handler = PaystackPop.setup({
                key: 'pk_test_95b305c95ab3c46df22548b3a04b259c2f4c6f7c', 
                email: customerEmail,
                amount: subtotal * 100, 
                currency: 'NGN',
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Product Code",
                            variable_name: "product_code",
                            value: "afro-essentials-bjdtcz" 
                        }
                    ]
                },
                onClose: function() {
                    alert('Transaction was not completed.');
                    confirmBtn.innerText = "Confirm Order";
                },
                callback: function(response) {
                    localStorage.setItem("last_purchase", JSON.stringify(cart));
                    confirmBtn.innerText = "Redirecting...";
                    confirmBtn.style.backgroundColor = "#28a745";
                    window.location.href = 'order-success.html';
                }
            });

            handler.openIframe();
            confirmBtn.innerText = "Loading Payment...";
        });
    }
});