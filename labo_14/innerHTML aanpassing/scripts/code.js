const setup = () => {
    let btn = document.getElementById("button");
    btn.addEventListener("click", button);
};

const button = () => {
    let pElement = document.getElementById("txtOutput");
    pElement.textContent = "Welkom!";
};

window.addEventListener("load", setup);