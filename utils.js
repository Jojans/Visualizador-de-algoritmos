// Generar un array aleatorio de números
function generateArray(size = 10, min = 1, max = 99) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

// Guardar array en localStorage
function saveArray(arr) {
    localStorage.setItem("sortingArray", JSON.stringify(arr));
}

// Cargar array desde localStorage
function loadArray() {
    const data = localStorage.getItem("sortingArray");
    return data ? JSON.parse(data) : null;
}

// Dibujar array en pantalla
function drawArray(arr, highlightIndex = [], finished = false) {
    const container = document.getElementById("arrayContainer");
    container.innerHTML = "";

    arr.forEach((num, index) => {
        const div = document.createElement("div");
        div.classList.add("array-item");

        if (finished) {
            div.classList.add("finished");
        } else if (highlightIndex.includes(index)) {
            div.classList.add("highlight");
        }

        div.textContent = num;
        container.appendChild(div);
    });
}

// Pausa para animación
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}