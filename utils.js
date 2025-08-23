// Generar un array aleatorio de números
function generateArray(size = 10, min = 1, max = 99) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

function generateAndDrawArray(size = 10) {
    let arr = generateArray(size, 1, 99);

    // Si el algoritmo seleccionado es Binary Search → ordenar el array
    if (currentAlgorithm === "binarySearch") {
        arr.sort((a, b) => a - b);
    }

    currentArray = arr;
    saveArray(arr);
    drawArray({ arr: currentArray, container: document.getElementById("arrayContainer") });
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

// Dibujar array en pantalla (acepta formato antiguo y nuevo)
function drawArray(...args) {
    let arr, highlighted = [], sorted = [], found = [], notFound = [], container;

    if (args.length === 1 && typeof args[0] === "object" && args[0].arr) {
        // ✅ Nuevo formato con objeto
        ({ arr, highlighted = [], sorted = [], found = [], notFound = [], container = document.getElementById("arrayContainer") } = args[0]);
    } else {
        // ✅ Formato antiguo posicional
        [arr, highlighted = [], sorted = [], container = document.getElementById("arrayContainer")] = args;
    }

    container.innerHTML = "";

    arr.forEach((value, index) => {
        const box = document.createElement("div");
        box.classList.add("array-box");
        box.textContent = value;

        // Colorear según estado de prioridad
        if (found.includes(index)) {
            box.style.backgroundColor = "lightgreen";  // valor encontrado
        } else if (notFound.includes(index)) {
            box.style.backgroundColor = "tomato";      // valor no encontrado
        } else if (sorted.includes(index)) {
            box.style.backgroundColor = "lightgreen";  // ordenado
        } else if (highlighted.includes(index)) {
            box.style.backgroundColor = "salmon";      // comparando
        } else {
            box.style.backgroundColor = "lightblue";   // inicial
        }

        container.appendChild(box);
    });
}

// Pausa para animación
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}