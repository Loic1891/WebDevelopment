class StorageUtil {
    static get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
    static has(key) {
        return localStorage.getItem(key) !== null;
    }
}

class StartPage {
    constructor() {
        this.storage = {
            cardKey: "startPage.cardKey",
            sortDirectionKey: "startPage.sortDirection"
        };
        this.state = [
            { key: "g", name: "Google",     color: "#2f70e9", function: (i) => `https://www.google.com/search?q=${i.replace(/ /g, "+")}` },
            { key: "y", name: "Youtube",    color: "#FF0000", function: (i) => `https://www.youtube.com/results?search_query=${i.replace(/ /g, "+")}` },
            { key: "x", name: "X",          color: "#1d9bf0", function: (i) => `https://x.com/search?q=${i.replace(/ /g, "%20")}` },
            { key: "i", name: "Instagram",  color: "#fc0077", function: (i) => `https://www.instagram.com/explore/tags/${i.replace(/ /g, "")}/` },
            { key: "d", name: "DuckDuckGo", color: "#de5833", function: (i) => `https://duckduckgo.com/?t=h_&q=${i.replace(/ /g, "+")}` },
            { key: "t", name: "TikTok",     color: "#fe2c55", function: (i) => `https://www.tiktok.com/search?q=${i.replace(/ /g, "%20")}` },
        ];
        this.sortAscending = this.loadSortDirection();
        this.elements = {};
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.initElements();
        this.loadCards();
        this.updateSortButtonText();
    }

    initElements() {
        this.elements.commandInput  = document.querySelector('#command-input');
        this.elements.goButton      = document.querySelector('#go-button');
        this.elements.cardsContainer = document.querySelector('#cards-container');
        this.elements.changeSort    = document.querySelector("#change-sort");
    }

    setupEventListeners() {
        this.elements.goButton.addEventListener("click", this.submit.bind(this));
        this.elements.commandInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                this.submit();
            }
        });
        this.elements.changeSort.addEventListener("click", this.changeSortDirection.bind(this));
    }

    submit() {
        try {
            const inputValue  = this.elements.commandInput.value;
            const commandDef  = this.parseCommando(inputValue);   // definition from state (don't mutate)
            const query       = StartPage.parseQuery(inputValue);
            const link        = commandDef.function(query);

            this.openLink(link);

            // Build a plain data object — never touch the state entry itself
            const cardData = {
                name:  commandDef.name,
                color: commandDef.color,
                query: query,
                link:  link
            };

            this.saveToStorage(cardData);
            this.resetInput();
            this.refreshCardDisplay();
        } catch (e) {
            // errors are already shown via alert() inside parseCommando
        }
    }

    parseCommando(input) {
        if (!input.startsWith("/")) {
            this.resetInput();
            alert('Invalid command — start your command with /[character]');
            throw new Error("Invalid command");
        }

        const key = input.split(" ")[0].slice(1, 2);
        const found = this.state.find(s => s.key === key);

        if (!found) {                              // was: returnValue === null  (never true for undefined)
            this.resetInput();
            alert(`Unknown command prefix "/${key}"`);
            throw new Error("Unknown command");
        }

        return found;
    }

    static parseQuery(input) {
        // Everything after the first space  ("/g webdesign" → "webdesign")
        const spaceIndex = input.indexOf(" ");
        if (spaceIndex === -1) return "";
        return input.slice(spaceIndex + 1);
    }

    addCard(cardData) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.style.backgroundColor = cardData.color;

        const title = document.createElement("h2");
        title.textContent = cardData.name;

        const text = document.createElement("p");
        text.textContent = cardData.query;

        const link = document.createElement("a");
        link.setAttribute("href", cardData.link);
        link.setAttribute("target", "_blank");
        link.textContent = "Go!";

        div.appendChild(title);
        div.appendChild(text);
        div.appendChild(link);
        this.elements.cardsContainer.appendChild(div);
    }

    changeSortDirection() {
        this.sortAscending = !this.sortAscending;
        this.saveSortDirection();
        this.updateSortButtonText();
        this.refreshCardDisplay();
    }

    updateSortButtonText() {
        this.elements.changeSort.textContent = this.sortAscending ? "Sort: A → Z" : "Sort: Z → A";
    }

    saveSortDirection() {
        StorageUtil.set(this.storage.sortDirectionKey, this.sortAscending);
    }

    loadSortDirection() {
        return StorageUtil.has(this.storage.sortDirectionKey)
            ? StorageUtil.get(this.storage.sortDirectionKey)
            : true;
    }

    saveToStorage(cardData) {
        const list = StorageUtil.has(this.storage.cardKey)
            ? StorageUtil.get(this.storage.cardKey)
            : [];
        list.push(cardData);
        StorageUtil.set(this.storage.cardKey, list);
    }

    loadCards() {
        this.refreshCardDisplay();
    }

    getSortedCards() {
        if (!StorageUtil.has(this.storage.cardKey)) return [];

        const list = StorageUtil.get(this.storage.cardKey);
        return list.sort((a, b) => {
            const nameCmp = a.name.localeCompare(b.name);
            return nameCmp !== 0 ? nameCmp : a.query.localeCompare(b.query);
        });
    }

    refreshCardDisplay() {
        this.elements.cardsContainer.innerHTML = '';
        let sorted = this.getSortedCards();
        if (!this.sortAscending) sorted = sorted.reverse();
        sorted.forEach(card => this.addCard(card));
    }

    resetInput() {
        this.elements.commandInput.value = "";
    }

    openLink(url) {
        window.open(url, '_blank');
    }
}

window.addEventListener('load', () => new StartPage());