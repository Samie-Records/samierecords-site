document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      await Clerk.signOut();

      // Redirect to front / home page
      window.location.replace("index.html");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
});


window.addEventListener("load", async () => {
  await Clerk.load({ publishableKey: "pk_test_c21hc2hpbmctaGFsaWJ1dC04LmNsZXJrLmFjY291bnRzLmRldiQ" });

  if (!Clerk.user) {
    window.location.replace("index.html");
  }
});


// logoutBtn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   await Clerk.signOut();
//   window.location.replace("login.html");
// });
