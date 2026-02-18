const navRight = document.querySelector(".nav-right");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        navRight.style.top = "15px";
        navRight.style.transform = "scale(0.95)";
    } else {
        navRight.style.top = "25px";
        navRight.style.transform = "scale(1)";
    }
});
