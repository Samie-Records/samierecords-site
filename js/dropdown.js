const toggle = document.getElementById("accountToggle");
const dropdown = document.getElementById("accountDropdown");
const nameText = document.getElementById("accountName");

toggle.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

function renderLoggedOut() {
  nameText.textContent = "Account";

  dropdown.innerHTML = `
    <button class="signin-btn" onclick="Clerk.openSignIn()">Sign In</button>

    <a href="#" onclick="requireAuth('account.html')">
      <ion-icon name="person-outline"></ion-icon>My Account
    </a>

    <a href="#" onclick="requireAuth('orders.html')">
      <ion-icon name="cube-outline"></ion-icon>Orders
    </a>

    <a href="#" onclick="requireAuth('wishlist.html')">
      <ion-icon name="heart-outline"></ion-icon>Wishlist
    </a>
  `;
}

function renderLoggedIn(user) {
  nameText.textContent = `Hi, ${user.firstName || "User"}`;

  dropdown.innerHTML = `
    <a href="account.html"><ion-icon name="person-outline"></ion-icon>My Account</a>
    <a href="orders.html"><ion-icon name="cube-outline"></ion-icon>Orders</a>
    <a href="inbox.html"><ion-icon name="mail-outline"></ion-icon>Inbox</a>
    <a href="wishlist.html"><ion-icon name="heart-outline"></ion-icon>Wishlist</a>
    <a href="voucher.html"><ion-icon name="ticket-outline"></ion-icon>Voucher</a>
    <button class="logout" id="logoutBtn">Logout</button>
  `;

  document.getElementById("logoutBtn").onclick = async () => {
    await Clerk.signOut();
    location.reload();
  };
}


// Create an access guard function
function requireAuth(page) {

  if (!Clerk.user) {

    // Not signed in → show login modal
    document.getElementById("loginModal").style.display = "block";

    return false;
  }

  // Signed in → go to page
  window.location.href = page;
}



// Initialize Clerk properly
window.addEventListener("load", async () => {

  await Clerk.load();

  if (Clerk.user) {
    renderLoggedIn(Clerk.user);
  } else {
    renderLoggedOut();
  }

});