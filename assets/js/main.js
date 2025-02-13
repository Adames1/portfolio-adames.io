import { projects } from "./projects.js";

document.addEventListener("DOMContentLoaded", function () {
  // Select the header, menu, and button
  const header = document.querySelector(".header");
  // const menu = document.querySelector(".nav-menu");
  const buttonMenu = document.querySelector(".button-menu");
  const containerProjects = document.querySelector("#container-project");
  const menuLink = document.querySelectorAll(".nav-menu .nav-menu__link");
  const buttonDarkMode = document.querySelector(".button-dark--mode");
  const icon = buttonDarkMode.querySelector("i");

  // maintain mode state
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

  // Apply dark mode
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

  // Toggle the 'is-active' class for header and menu
  buttonMenu.addEventListener("click", () => {
    buttonMenu.classList.toggle("is-active");
    header.classList.toggle("is-active");
  });

  // Toggle the 'is-active' class for header and menu II
  menuLink.forEach((link) => {
    link.addEventListener("click", () => {
      buttonMenu.classList.remove("is-active");
      header.classList.remove("is-active");
    });
  });

  // Apply class active for each section
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

  // Apply background to header with scroll
  document.addEventListener("scroll", () => {
    window.scrollY >= 200
      ? header.classList.add("bg-color")
      : header.classList.remove("bg-color");
  });

  // show projects in DOM
  function renderProjects() {
    projects.forEach((project) => {
      let content = `
      <div class="project" id="${project.id}">
          <img src=${project.imagen} class="project__img" alt="${project.nombre}">
          <div class="project__info">
              <div class="project__info__text">
                  <h3>${project.nombre}</h3>
                  <p>${project.descripcion}</p>
              </div>
              <div class="project__info__techs">
                  <h4>Tecnologias usadas:</h4>
                  <ul>
                      ${project.tecnologias.map((tech) => `<li>${tech}</li>`).join("")}
                  </ul>
              </div>
              <div class="project__links">
                  <a href=${project.link} target="_blank" rel="noopener noreferrer">Ver proyecto</a>
                  <a href=${project.github} target="_blank" rel="noopener noreferrer">Ver código</a>
              </div>
          </div>
      </div>`;

      containerProjects.innerHTML += content;
    });
  }

  renderProjects();

  // script emailjs
  emailjs.init("3_s2rcpMAsQqb1TFR");

  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evitar recargar la página

      const submitButton = document.querySelector(".button-submit");
      const originalButtonText = submitButton.textContent;

      submitButton.textContent = "Enviando mensaje...";
      submitButton.disabled = true;

      emailjs
        .sendForm("service_y70q27h", "template_hg3o5ol", this)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);

          submitButton.textContent = "Mensaje enviado";
          submitButton.style.backgroundColor = "#08a208";

          this.reset();

          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = ""; // Restaurar el color original del botón
          }, 3000);
        })
        .catch((error) => {
          console.log("FAILED...", error);

          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
});
