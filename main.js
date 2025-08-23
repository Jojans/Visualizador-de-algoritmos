let currentArray = [];
let currentAlgorithm = "";
let stopExecution = false; // <- bandera global

// Diccionario con información de cada algoritmo
const algorithmInfo = {
    bubbleSort: {
        description: "Compara repetidamente elementos adyacentes y los intercambia si están en el orden incorrecto.",
        complexity: "O(n²) en el peor y promedio caso, O(n) en el mejor caso (array ordenado).",
    },
    insertionSort: {
        description: "Construye la lista ordenada de un elemento a la vez, insertando en la posición correcta.",
        complexity: "O(n²) en el peor caso, O(n) en el mejor caso.",
    },
    selectionSort: {
        description: "Encuentra el elemento mínimo y lo coloca en la posición inicial, repitiendo el proceso.",
        complexity: "O(n²) en todos los casos.",
    },
    quickSort: {
        description: "Divide el array en sub-arrays tomando un pivote y reordenando los elementos menores a la izquierda y los mayores a la derecha. Se aplica recursivamente a cada parte.",
        complexity: "O(n log n) en promedio y mejor caso, O(n²) en el peor caso (cuando el pivote es muy desbalanceado).",
    },
    mergeSort: {
        description: "Divide el array en mitades hasta que queda en listas de un solo elemento y luego combina las mitades ordenadas en una sola lista final.",
        complexity: "O(n log n) en todos los casos (mejor, promedio y peor).",
    },
    heapSort: {
        description: "Construye un heap máximo a partir del arreglo y luego extrae repetidamente el mayor elemento para colocarlo en su posición correcta.",
        complexity: "O(n log n) en el peor, promedio y mejor caso.",
    },
    linearSearch: {
        description: "Recorre el arreglo de principio a fin comparando cada elemento con el valor buscado.",
        complexity: "O(n) en el peor y promedio caso, O(1) en el mejor caso."
    },
    binarySearch: {
        description: "Divide repetidamente el arreglo ordenado en mitades hasta encontrar el valor buscado. Debe estar ordenado.",
        complexity: "O(log n) en el peor, promedio y mejor caso."
    },
    dfs: {
        description: "Explora un grafo siguiendo un camino tan profundo como sea posible antes de retroceder.",
        complexity: "O(V + E), donde V es el número de vértices y E el número de aristas."
    },
    bfs: {
        description: "Explora un grafo por niveles, visitando primero todos los vecinos antes de avanzar.",
        complexity: "O(V + E), donde V es el número de vértices y E el número de aristas."
    }
};

// Detectar página actual y establecer algoritmo por defecto
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("ordenamiento")) {
        currentAlgorithm = "bubbleSort";   // por defecto en ordenamiento
    } else if (path.includes("busqueda")) {
        currentAlgorithm = "linearSearch"; // por defecto en búsqueda
    } else {
        currentAlgorithm = "";             // en otros, no seleccionamos nada
    }

    // Forzar el valor en el select si existe
    const algoSelect = document.getElementById("algorithmSelect");
    if (algoSelect && currentAlgorithm) {
        algoSelect.value = currentAlgorithm;
    }

    // Mostrar info inicial si aplica
    if (algorithmInfo[currentAlgorithm]) {
        const algo = algorithmInfo[currentAlgorithm];
        document.getElementById("algorithm-info").innerHTML = `
            <p>${algo.description}</p>
            <p><strong>${algo.complexity}</strong></p>
        `;
    }
});

// Detectar cambios en el select de algoritmos
const algoSelect = document.getElementById("algorithmSelect");
if (algoSelect) {
    algoSelect.addEventListener("change", (e) => {
        currentAlgorithm = e.target.value;

        if (algorithmInfo[currentAlgorithm]) {
            const algo = algorithmInfo[currentAlgorithm];
            document.getElementById("algorithm-info").innerHTML = `
                <p>${algo.description}</p>
                <p><strong>${algo.complexity}</strong></p>
            `;
        }

        // ✅ Ajustar array según algoritmo seleccionado
        if (currentAlgorithm === "binarySearch") {
            // Si ya había array, solo lo ordenamos
            if (currentArray.length > 0) {
                currentArray.sort((a, b) => a - b);
            } else {
                currentArray = generateArray();
                currentArray.sort((a, b) => a - b);
            }
            saveArray(currentArray);
            drawArray(currentArray);
        } 
        else if (["linearSearch", "bubbleSort", "insertionSort", "selectionSort", "quickSort", "mergeSort", "heapSort"].includes(currentAlgorithm)) {
            // Solo generar nuevo array si no había
            if (currentArray.length === 0) {
                currentArray = generateArray();
                saveArray(currentArray);
                drawArray(currentArray);
            }
        }
    });
}

// Al cargar la página, recupera datos guardados o genera nuevos
window.onload = () => {
    const savedArray = loadArray(); // de utils.js
    if (savedArray) {
        currentArray = savedArray;
        // Si es binarySearch -> ordenar el recuperado
        if (currentAlgorithm === "binarySearch") {
            currentArray.sort((a, b) => a - b);
        }
    } else {
        currentArray = generateArray();
        if (currentAlgorithm === "binarySearch") {
            currentArray.sort((a, b) => a - b);
        }
        saveArray(currentArray);
    }
    drawArray(currentArray);
};

// Generar datos iniciales solo si se oprime el botón
document.getElementById("generate").addEventListener("click", () => {
    stopExecution = true; // <- parar ejecución en curso
    currentArray = generateArray();

    if (currentAlgorithm === "binarySearch") {
        currentArray.sort((a, b) => a - b);
    }

    saveArray(currentArray);
    drawArray(currentArray);
});

// Iniciar visualización
document.getElementById("start").addEventListener("click", async () => {
    if (!currentAlgorithm) {
        alert("Selecciona un algoritmo primero");
        return;
    }

    if (window.location.pathname.includes("busqueda")) {
        const targetInput = document.getElementById("searchValue");
        const value = targetInput ? targetInput.value.trim() : "";

        if (!value) {
            alert("Por favor ingresa un número para buscar en el arreglo.");
            return;
        }
    }

    stopExecution = true;
    await sleep(100);
    stopExecution = false;

    let scriptPath = "";
    if ([
        "bubbleSort", "insertionSort", "selectionSort", "quickSort", "mergeSort", "heapSort"
    ].includes(currentAlgorithm)) {
        scriptPath = `sorting/${currentAlgorithm}.js`;
    } 
    else if ([
        "linearSearch", "binarySearch", "bfs", "dfs"
    ].includes(currentAlgorithm)) {
        scriptPath = `searching/${currentAlgorithm}.js`;
    } 
    else if ([
        "dijkstra", "aStar"
    ].includes(currentAlgorithm)) {
        scriptPath = `graphs/${currentAlgorithm}.js`;
    } 
    else {
        scriptPath = `others/${currentAlgorithm}.js`;
    }

    await loadAlgorithm(scriptPath);

    if (typeof window[currentAlgorithm] !== "function") {
        alert("Algoritmo no implementado todavía");
        return;
    }

    if (["linearSearch", "binarySearch"].includes(currentAlgorithm)) {
        const input = document.getElementById("searchValue");
        const target = Number(input?.value);

        if (!Number.isFinite(target)) {
            alert("Ingresa un número a buscar antes de iniciar.");
            return;
        }

        await window[currentAlgorithm](currentArray, target);
    } else {
        await window[currentAlgorithm](currentArray);
    }
});

// Cargar archivo de algoritmo dinámicamente
function loadAlgorithm(path) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// Utilidad para pausas
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}