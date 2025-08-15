let currentArray = [];
let currentAlgorithm = "";

// Al cargar la página, recupera datos guardados o genera nuevos
window.onload = () => {
    const savedArray = loadArray(); // de utils.js
    if (savedArray) {
        currentArray = savedArray;
    } else {
        currentArray = generateArray();
        saveArray(currentArray);
    }
    drawArray(currentArray);
};

// Generar datos iniciales solo si se oprime el botón
document.getElementById("generate").addEventListener("click", () => {
    currentArray = generateArray();
    saveArray(currentArray); // Guardar para que persista
    drawArray(currentArray);
});

// Seleccionar algoritmo
document.getElementById("algorithmSelect").addEventListener("change", (e) => {
    currentAlgorithm = e.target.value;
});

// Iniciar visualización
document.getElementById("start").addEventListener("click", async () => {
    if (!currentAlgorithm) {
        alert("Selecciona un algoritmo primero");
        return;
    }

    // Cargar el archivo JS correspondiente
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

    // Llamar a la función del algoritmo
    if (typeof window[currentAlgorithm] === "function") {
        await window[currentAlgorithm](currentArray);
    } else {
        alert("Algoritmo no implementado todavía");
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