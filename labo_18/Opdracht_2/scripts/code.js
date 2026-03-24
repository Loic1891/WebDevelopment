const setup = () => {
    document.querySelectorAll("li").forEach(e =>{
        e.classList = "listitem";
    });
    const body = document.querySelector("body");
    const img = document.createElement("img");
    img.setAttribute("src", "images/Nicolo!.webp");
    img.setAttribute("alt","Nicolo!");
    body.appendChild(img);
}

window.addEventListener("load", setup);