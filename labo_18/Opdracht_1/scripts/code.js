const setup = () => {
    document.querySelectorAll("p").forEach(e => {
        e.textContent = "Goed gedaan!";
    })
}

window.addEventListener("load", setup);