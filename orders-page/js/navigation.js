const menuItems = document.querySelectorAll(".sidebar li[data-page]");
const currentPage = window.location.pathname.split("/").pop();

menuItems.forEach(item => {
  if (item.dataset.page === currentPage) {
    item.classList.add("active");
  }
});



// Voucher tab switching
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".voucher-empty");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {

      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove("active"));

      // Add active to clicked tab
      this.classList.add("active");

      // Hide all contents
      contents.forEach(content => {
        content.classList.remove("active");
      });

      // Show selected content
      const target = this.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");

    });
  });
});
