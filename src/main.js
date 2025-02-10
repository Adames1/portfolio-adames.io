document.addEventListener("DOMContentLoaded", function () {
  const btnMenu = document.getElementById("btn-menu");
  const menuMobile = document.getElementById("menu-mobile");
  const links = menuMobile.querySelectorAll("a");
  const btnScrollDown = document.getElementById("btn-scroll-down");

  //   toggle for menu mobile
  btnMenu.addEventListener("click", function () {
    if (menuMobile.classList.contains("translate-y-[100%]")) {
      menuMobile.classList.remove("translate-y-[100%]");
      menuMobile.classList.add("translate-y-0");
    } else {
      menuMobile.classList.remove("translate-y-0");
      menuMobile.classList.add("translate-y-[100%]");
    }
  });

  //   close menu for each link click
  links.forEach((link) => {
    link.addEventListener("click", function () {
      menuMobile.classList.remove("translate-y-0");
      menuMobile.classList.add("translate-y-[100%]");
    });
  });

  //   active for each link click
  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((link) => {
        link.classList.remove("active");
      });
      link.classList.add("active");
    });
  });
});
