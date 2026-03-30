let AANTAL_HORIZONTAAL = 4;
let AANTAL_VERTICAAL = 3;
let AANTAL_KAARTEN = 6;

let afbeeldingen = [
    "kaart1.png",
    "kaart2.png",
    "kaart3.png",
    "kaart4.png",
    "kaart5.png",
    "kaart6.png"
];

let kaarten = [];
let eerste = null;
let tweede = null;
let lock = false;
let game;

const setup = () => {
    game = document.getElementById("game");

    // 🔀 verdubbelen + mixen
    kaarten = [...afbeeldingen, ...afbeeldingen]
        .sort(() => Math.random() - 0.5);

    // 🧱 kaarten maken
    kaarten.forEach(src => {
        const img = document.createElement("img");

        img.src = "images/achterkant.png";      // achterkant
        img.dataset.img = "images/" + src;      // echte afbeelding
        img.classList.add("card");

        img.addEventListener("click", klikKaart);

        game.appendChild(img);
    });
};

const klikKaart = function () {
    if (lock || this === eerste) return;

    // 🔄 omdraaien
    this.src = this.dataset.img;

    if (!eerste) {
        eerste = this;
        return;
    }

    tweede = this;
    lock = true;

    // ✔ match
    if (eerste.dataset.img === tweede.dataset.img) {
        setTimeout(() => {
            eerste.classList.add("hidden");
            tweede.classList.add("hidden");
            reset();
            checkWin();
        }, 300);
    }
    // ❌ geen match
    else {
        setTimeout(() => {
            eerste.src = "images/achterkant.png";
            tweede.src = "images/achterkant.png";
            reset();
        }, 800);
    }
};

const reset = () => {
    eerste = null;
    tweede = null;
    lock = false;
};

const checkWin = () => {
    const over = document.querySelectorAll(".card:not(.hidden)");

    if (over.length === 0) {
        alert("Gewonnen!");
    }
};

window.addEventListener("load", setup);