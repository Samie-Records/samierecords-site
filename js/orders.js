document.addEventListener("DOMContentLoaded", () => {
    const historyContainer = document.getElementById("order-history-container");
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `
            <div style="text-align:center; padding: 40px;">
                <ion-icon name="cart-outline" style="font-size: 48px; color: #ccc;"></ion-icon>
                <p>You have placed no orders yet!</p>
                <a href="index.html" class="continue-btn" style="display:inline-block; margin-top:10px; text-decoration:none;">Start Shopping</a>
            </div>`;
        return;
    }

    // Build the HTML using your site's specific classes (order-info, badge, etc.)
    historyContainer.innerHTML = orderHistory.map(order => `
        <div class="order-card">
            <img src="${order.items[0].image || 'assets/images/default-product.jpg'}" alt="Product" />
            
            <div class="order-info">
                <h4>Order ${order.orderId}</h4>
                <p>${order.items.length} item(s) in this shipment</p>
                <span class="badge delivered">${order.status}</span>
                <p class="date">Placed on ${order.date}</p>
            </div>
            
            <div class="order-actions" style="margin-left: auto; text-align: right;">
                <p style="font-weight: bold; margin-bottom: 5px;">
                   ₦${order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toLocaleString()}
                </p>
                <a href="#" class="details">See details</a>
            </div>
        </div>
    `).join('');
});