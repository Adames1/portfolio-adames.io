import { projects } from "./projects.js";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const buttonMenu = document.querySelector(".button-menu");
  const containerProjects = document.querySelector("#container-project");
  const menuLink = document.querySelectorAll(".nav-menu .nav-menu__link");
  const buttonDarkMode = document.querySelector(".button-dark--mode");
  const icon = buttonDarkMode.querySelector("i");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Mantener el modo (claro/oscuro) elegido por el usuario
  const savedMode = localStorage.getItem("theme");

  if (savedMode === "dark") {
    document.documentElement.classList.add("dark-mode");
    icon.classList.add("uil-sun");
    icon.classList.remove("uil-moon");
  } else if (savedMode === "light") {
    icon.classList.add("uil-moon");
    icon.classList.remove("uil-sun");
    document.documentElement.classList.remove("dark-mode");
  }

  buttonDarkMode.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    if (icon.classList.contains("uil-moon")) {
      icon.classList.add("uil-sun");
      icon.classList.remove("uil-moon");
      buttonDarkMode.title = "Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.add("uil-moon");
      icon.classList.remove("uil-sun");
      buttonDarkMode.title = "Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });

  // Menú móvil
  buttonMenu.addEventListener("click", () => {
    buttonMenu.classList.toggle("is-active");
    header.classList.toggle("is-active");
  });

  menuLink.forEach((link) => {
    link.addEventListener("click", () => {
      buttonMenu.classList.remove("is-active");
      header.classList.remove("is-active");
    });
  });

  // Resaltar el enlace de navegación de la sección visible
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 20;
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      if (
        scrollPos > section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        menuLink.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.header a[href*=${section.id}]`)
          .classList.add("active");
      }
    });
  });

  // Fondo del header al hacer scroll
  document.addEventListener("scroll", () => {
    window.scrollY >= 200
      ? header.classList.add("bg-color")
      : header.classList.remove("bg-color");
  });

  // Renderizar proyectos en el DOM
  function renderProjects() {
    const markup = projects
      .map((project) => {
        const links = project.proximamente
          ? `<span class="project__badge">Próximamente</span>`
          : `<div class="project__links">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
                <a href="${project.github}" target="_blank" rel="noopener noreferrer">Ver código</a>
             </div>`;

        return `
      <div class="project ${project.proximamente ? "project--upcoming" : ""}" id="project-${project.id}">
          <img src="${project.imagen}" class="project__img" alt="${project.nombre}" loading="lazy">
          <div class="project__info">
              <div class="project__info__text">
                  <h3>${project.nombre}</h3>
                  <p>${project.descripcion}</p>
              </div>
              <div class="project__info__techs">
                  <h4>Tecnologías usadas:</h4>
                  <ul>
                      ${project.tecnologias
                        .map((tech) => `<li>${tech}</li>`)
                        .join("")}
                  </ul>
              </div>
              ${links}
          </div>
      </div>`;
      })
      .join("");

    containerProjects.innerHTML = markup;
  }

  renderProjects();

  // Animación de aparición al hacer scroll (respeta "reduce motion")
  const revealTargets = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }
});
