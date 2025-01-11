document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".button-menu");
  const menuLines = document.querySelectorAll(".button-menu__line");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu__link");

  // Función para alternar el estado del menú y las líneas del botón
  const toggleMenu = () => {
    navMenu.classList.toggle("active");

    menuLines.forEach((line, index) => {
      if (navMenu.classList.contains("active")) {
        // Animación hacia la "X"
        line.classList.add("rotate", `rotate-${index + 1}`);
      } else {
        // Volver al estado original
        line.classList.remove("rotate", `rotate-${index + 1}`);
      }
    });
  };

  // Evento para mostrar/ocultar el menú al hacer clic en el botón
  menuButton.addEventListener("click", toggleMenu);

  // Evento para cerrar el menú al hacer clic en cualquier enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
});
