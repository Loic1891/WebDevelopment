const performReplace = () => {
    const input = "Gisteren zat de jongen op de stoep en at de helft van de appel";
    const criteria = "de";
    const replacement = "het";
    let result = "";
    let i = 0;

    while (i < input.length) {
        const potentialMatch = input.slice(i, i + criteria.length);

        if (potentialMatch.toLowerCase() === criteria.toLowerCase()) {
            result += replacement;
            i += criteria.length;
        } else {
            result += input[i];
            i++;
        }
    }

    console.log(result);
    document.getElementById("text").textContent = result;
};

window.addEventListener("load", performReplace);