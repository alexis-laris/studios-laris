const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuLinks = mobileMenu.querySelectorAll(".menu-link");
const img = menuButton.querySelector("img");

menuButton.addEventListener("click", function (e) {
    if (window.innerWidth < 768) {
        e.preventDefault();


        img.classList.remove("rotate-once");
        void img.offsetWidth;
        img.classList.add("rotate-once");


        mobileMenu.classList.toggle("-translate-y-full");
        mobileMenu.classList.toggle("translate-y-0");
    }
});

menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
        mobileMenu.classList.remove("translate-y-0");
        mobileMenu.classList.add("-translate-y-full");
    });
});
