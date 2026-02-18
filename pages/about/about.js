const counters = document.querySelectorAll(".counter");
let started = false;

function runCounters() {

    counters.forEach(counter => {

        const update = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;

            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(update, 10);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        update();
    });
}

window.addEventListener("scroll", () => {

    const section = document.querySelector(".counter-section");
    const position = section.offsetTop - window.innerHeight;

    if (!started && window.scrollY > position) {
        runCounters();
        started = true;
    }

});
