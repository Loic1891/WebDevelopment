let global = {
    huidigeGebruiker: null, berichten: [], timer: null,
}

const setup = () => {
    let select = document.getElementById("message-sender");
    global.huidigeGebruiker = select.value;

    select.addEventListener("change", () => {
        global.huidigeGebruiker = select.value;
        renderBerichten();
    });

    let btn = document.getElementById("send-button");
    btn.addEventListener("click", stuurbericht);

    let clearBtn = document.getElementById("clear-all");
    clearBtn.addEventListener("click", wisAlles);

    let opgeslagen = localStorage.getItem("berichten");
    if (opgeslagen) {
        global.berichten = JSON.parse(opgeslagen);
    } else {
        global.berichten = [];
    }

    renderBerichten();

    global.timer = setInterval(() => {
        let opgeslagen = localStorage.getItem("berichten");
        global.berichten = JSON.parse(opgeslagen ?? "[]");
        renderBerichten();
    }, 1000);
}

const stuurbericht = () => {
    let input = document.getElementById("message-input");
    let tekst = input.value.trim();
    tekst = tekst.replaceAll(":)", "\u{1F604}");
    tekst = tekst.replaceAll(":p", "\u{1F60B}");
    tekst = tekst.replaceAll(";)", "\u{1F609}");
    tekst = tekst.replaceAll(":(", "\u{1F614}");
    if (tekst === "") return;

    let bericht = {
        sender: global.huidigeGebruiker, tekst: tekst, tijd: Date.now(),
    };

    global.berichten.push(bericht);
    localStorage.setItem("berichten", JSON.stringify(global.berichten));
    input.value = "";
    renderBerichten();
}

const renderBerichten = () => {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    for (let i=0; i < global.berichten.length;i++)
    {
        let bericht = global.berichten[i];
        let div = document.createElement("div");
        div.classList.add("message");
        if (bericht.sender === global.huidigeGebruiker)
        {
            div.classList.add("same-user");
        }

        let spanTime = document.createElement("span");
        spanTime.classList.add("timestamp");
        spanTime.textContent = new Date(bericht.tijd).toLocaleString("nl-BE", {
            day: "numeric", month: "short", year: "2-digit", hour: "2-digit", minute: "2-digit",
        });

        let spanSender = document.createElement("span");
        spanSender.classList.add("sender");
        spanSender.textContent = bericht.sender;

        if (bericht.sender === global.huidigeGebruiker) {
            let btn = document.createElement("button");
            btn.addEventListener("click", () => verwijderBericht(i));
            spanSender.appendChild(btn);
        }

        div.appendChild(spanTime);
        div.appendChild(spanSender);
        div.appendChild(document.createTextNode(bericht.tekst));

        chatBox.prepend(div);
    }
}

const verwijderBericht = (index) => {
    global.berichten.splice(index, 1);
    localStorage.setItem("berichten", JSON.stringify(global.berichten));
    renderBerichten();
}

const wisAlles = () => {
    global.berichten = [];
    localStorage.removeItem("berichten");
    renderBerichten();
}

window.addEventListener("load", setup);