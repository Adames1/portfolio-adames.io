document.addEventListener("DOMContentLoaded", function () {
  // Select the header, menu, and button
  const header = document.querySelector(".header");
  // const menu = document.querySelector(".nav-menu");
  const buttonMenu = document.querySelector(".button-menu");
  const swiperWrapper = document.querySelector(".swiper-wrapper");
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

  // Apply background to header with scroll
  document.addEventListener("scroll", () => {
    window.scrollY >= 200
      ? header.classList.add("bg-color")
      : header.classList.remove("bg-color");
  });

  // Initialize Swiper
  var swiper = new Swiper(".mySwiper", {
    rewind: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // fetch json projects
  async function getprojects() {
    const dataJson = "./projects.json";

    try {
      const response = await fetch(dataJson);
      if (!response.ok) {
        throw new Error("Data no found");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  }

  // show projects in DOM
  async function uiProjects() {
    const projects = await getprojects();

    swiperWrapper.innerHTML = "";

    projects.map((item) => {
      const element = `<div class="swiper-slide">
        <div class="swiper-slide__img">
            <img src="${item.imagen}" alt="Image Project">
        </div>
        <div class="swiper-slide__info">
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <a href="${item.link}" class="swiper-slide__info--link" target="_blank" rel="noopener noreferrer"">
                <span>Ver proyecto</span>
                <i class="uil uil-external-link-alt"></i>
            </a>
        </div>
    </div>`;

      swiperWrapper.innerHTML += element;
    });
  }

  uiProjects();

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
