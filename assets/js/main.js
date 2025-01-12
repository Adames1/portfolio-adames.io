// Select the header, menu, and button
const header = document.querySelector(".header");
const menu = document.querySelector(".nav-menu");
const buttonMenu = document.querySelector(".button-menu");

// Toggle the 'is-active' class for header and menu
buttonMenu.addEventListener("click", () => {
  buttonMenu.classList.toggle("is-active");
  header.classList.toggle("is-active");
  menu.classList.toggle("is-active");
});
