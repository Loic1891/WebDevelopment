const setup = () => {
    document.getElementById("button").addEventListener("click", printSplitValue);
}

const maakMetSpaties = (inputText) => {
    let result = "";

    for (let i = 0; i < inputText.length; i++) {
        result += inputText[i] + " ";
    }

    return result;
}

const printSplitValue = () => {
    let string = document.getElementById("input").value;
    let result = maakMetSpaties(string);
    document.getElementById("output").textContent = result;
    console.log(result);
}

window.addEventListener("load", setup);