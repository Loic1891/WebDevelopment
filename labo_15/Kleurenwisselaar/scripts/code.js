const setup = () => {

    [...document.getElementsByTagName("button")].forEach(button => {
        button.addEventListener("click", () => button.classList.toggle("pressed"));
    });
};

window.addEventListener("load", setup);