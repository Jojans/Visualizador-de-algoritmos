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
function drawArray(arr, highlighted = [], sorted = [], container = document.getElementById("arrayContainer")) {
    container.innerHTML = "";

    arr.forEach((value, index) => {
        const box = document.createElement("div");
        box.classList.add("array-box");
        box.textContent = value;

        // Colorear según estado
        if (sorted.includes(index)) {
            box.style.backgroundColor = "lightgreen";  // final ordenado
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

// Función para convertir O(n log n) a valores numéricos
function nLogN(n) {
    return Math.round(n * Math.log2(n));
}

const n = 1000; // Tamaño de entrada para simular operaciones

const algorithmComplexities = {
    "Bubble Sort": {
        "Mejor": n => n,
        "Promedio": n => n * n,
        "Peor": n => n * n
    },
    "Insertion Sort": {
        "Mejor": n => n,
        "Promedio": n => n * n,
        "Peor": n => n * n
    },
    "Selection Sort": {
        "Mejor": n => n * n,
        "Promedio": n => n * n,
        "Peor": n => n * n
    },
    "Merge Sort": {
        "Mejor": n => n * Math.log2(n),
        "Promedio": n => n * Math.log2(n),
        "Peor": n => n * Math.log2(n)
    },
    "Quick Sort": {
        "Mejor": n => n * Math.log2(n),
        "Promedio": n => n * Math.log2(n),
        "Peor": n => n * n
    },
    "Heap Sort": {
        "Mejor": n => n * Math.log2(n),
        "Promedio": n => n * Math.log2(n),
        "Peor": n => n * Math.log2(n)
    }
};