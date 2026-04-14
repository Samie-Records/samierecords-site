const loginModal = document.getElementById("loginModal");

function openLogin() {
  loginModal.style.display = "flex";
}

function closeLogin() {
  loginModal.style.display = "none";
}

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeLogin();
  }
});
