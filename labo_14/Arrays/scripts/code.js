const setup = () => {

    let familie = ["Rube", "Nicola", "Emiel", "Vincent", "Karel"];

    console.log("Aantal elementen in de array:", familie.length);

    console.log("Eerste element:", familie[0]);
    console.log("Derde element:", familie[2]);
    console.log("Vijfde element:", familie[4]);

    const VoegNaamToe = (arr) => {
        let nieuweNaam = prompt("Geef een extra naam in:");
        if (nieuweNaam && nieuweNaam.trim() !== "") {
            arr.push(nieuweNaam.trim());
        }
    };

    VoegNaamToe(familie);

    console.log("Array na toevoegen:", familie);

    let familieString = familie.toString();
    console.log("Array als string:", familieString);
};

window.addEventListener("load", setup);