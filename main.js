let currentArray = [];
let currentAlgorithm = "bubbleSort";
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
    }
};

// Cargar la información adicional de cada algoritmo
document.getElementById("algorithmSelect").addEventListener("change", function() {
    stopExecution = true; // <- detener algoritmo en curso
    const selected = this.value;
    currentAlgorithm = selected;

    const infoDiv = document.getElementById("algorithm-info");
    if (algorithmInfo[selected]) {
        const algo = algorithmInfo[selected];
        infoDiv.innerHTML = `
            <p>${algo.description}</p>
            <p><strong>${algo.complexity}</strong></p>
        `;
        updateChart(selected);
    } else {
        infoDiv.innerHTML = "";
    }
});

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

    // Mostrar info de Bubble Sort desde el inicio
    const infoDiv = document.getElementById("algorithm-info");
    const algo = algorithmInfo[currentAlgorithm];
    infoDiv.innerHTML = `
        <p>${algo.description}</p>
        <p><strong>${algo.complexity}</strong></p>
    `;
    updateChart(currentAlgorithm);

    // Forzar que en el select aparezca Bubble Sort seleccionado
    document.getElementById("algorithmSelect").value = currentAlgorithm;
};

// Generar datos iniciales solo si se oprime el botón
document.getElementById("generate").addEventListener("click", () => {
    stopExecution = true; // <- parar ejecución en curso
    currentArray = generateArray();
    saveArray(currentArray);
    drawArray(currentArray);
});

// Iniciar visualización
document.getElementById("start").addEventListener("click", async () => {
    if (!currentAlgorithm) {
        alert("Selecciona un algoritmo primero");
        return;
    }

    stopExecution = true; // <- detener si había uno corriendo
    await sleep(100);     // pequeña pausa para asegurar que terminó
    stopExecution = false;

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

// Utilidad para pausas
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Variable global de la gráfica
let complexityChart = null;

// Mapeo entre nombre interno y nombre legible
const mapping = {
    bubbleSort: "Bubble Sort",
    insertionSort: "Insertion Sort",
    selectionSort: "Selection Sort",
    mergeSort: "Merge Sort",
    quickSort: "Quick Sort",
    heapSort: "Heap Sort"
};

// Función que actualiza la gráfica al seleccionar un algoritmo
function updateChart(algorithmName) {
    const inputSizes = [10, 50, 100, 200, 500, 1000];
    const algoKey = mapping[algorithmName] || algorithmName;
    const algo = algorithmComplexities[algoKey];

    if (!algo) return;

    const ctx = document.getElementById("complexityChart").getContext("2d");

    // 🔥 Destruir gráfica previa si ya existe
    if (complexityChart) {
        complexityChart.destroy();
    }

    // Colores por caso
    const colors = {
        "Mejor": "rgba(75, 192, 192, 0.7)",
        "Promedio": "rgba(255, 205, 86, 0.7)",
        "Peor": "rgba(255, 99, 132, 0.7)"
    };
    const borderColors = {
        "Mejor": "rgba(75, 192, 192, 1)",
        "Promedio": "rgba(255, 205, 86, 1)",
        "Peor": "rgba(255, 99, 132, 1)"
    };

    // Crear datasets (uno por cada caso)
    const datasets = Object.keys(colors).map(caseType => ({
        label: caseType,
        data: inputSizes.map(n => Math.round(algo[caseType](n))),
        backgroundColor: colors[caseType],
        borderColor: borderColors[caseType],
        borderWidth: 2,
        borderRadius: 6
    }));

    // Crear la gráfica
    complexityChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: inputSizes,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Complejidad de ${algoKey}`,
                    font: {
                        size: 20,
                        weight: "bold"
                    }
                },
                legend: {
                    position: "top"
                },
                tooltip: {
                    backgroundColor: "#222",
                    titleColor: "#fff",
                    bodyColor: "#ddd",
                    padding: 10
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Tamaño de entrada (n)"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Número de operaciones estimadas"
                    }
                }
            }
        }
    });
}