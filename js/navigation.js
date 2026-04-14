document.addEventListener("DOMContentLoaded", function () {

  const currentPage = window.location.pathname.split("/").pop();

  const menuItems = document.querySelectorAll(".sidebar ul li");

  menuItems.forEach((item) => {
    const page = item.getAttribute("data-page");

    if (page === currentPage) {
      item.classList.add("active");
    }
  });

});