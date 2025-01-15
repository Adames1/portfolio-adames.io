document.addEventListener("DOMContentLoaded", function () {
  // Select the header, menu, and button
  const header = document.querySelector(".header");
  const menu = document.querySelector(".nav-menu");
  const buttonMenu = document.querySelector(".button-menu");
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  // Toggle the 'is-active' class for header and menu
  buttonMenu.addEventListener("click", () => {
    buttonMenu.classList.toggle("is-active");
    header.classList.toggle("is-active");
    menu.classList.toggle("is-active");
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
            <a href="#" class="swiper-slide__info--link">
                <span>View project</span>
                <i class="uil uil-external-link-alt"></i>
            </a>
        </div>
    </div>`;

      swiperWrapper.innerHTML += element;
    });
  }

  uiProjects();
});
