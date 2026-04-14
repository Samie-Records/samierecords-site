window.addEventListener("load", async () => {
  await Clerk.load({
    publishableKey:
      "pk_test_c21hc2hpbmctaGFsaWJ1dC04LmNsZXJrLmFjY291bnRzLmRldiQ",
  });

  console.log("Clerk Loaded ✅");

  // Check if user is logged in
  if (Clerk.user) {
    renderLoggedIn(Clerk.user);
  } else {
    renderLoggedOut();
  }

  // Protect links
  protectLinks();

  // Connect Continue button
  setupLoginButton();
});



function protectLinks() {
  const isSignedIn = !!Clerk.user;

  document.querySelectorAll('[data-protected="true"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!isSignedIn) {
        e.preventDefault();
        openLogin(); // your modal.js function
      }
    });
  });
}



function setupLoginButton() {
  const btn = document.getElementById("continueBtn");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = document.getElementById("emailInput").value;

    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      // Start Clerk sign-in
      await Clerk.client.signIn.create({
        identifier: email,
      });

      // Send verification code
      await Clerk.client.signIn.prepareFirstFactor({
        strategy: "email_code",
      });

      alert("Verification code sent to your email");

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  });
}