let currentArray = [];
let currentTree = null;   // árbol para DFS/BFS
let currentAlgorithm = "";
let stopExecution = false; // bandera global

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

/* ---------------------------
   Helpers de UI
--------------------------- */
function isGraphAlgo(algo) {
    return algo === "dfs" || algo === "bfs";
}

function updateAlgorithmInfo() {
    if (!algorithmInfo[currentAlgorithm]) return;
    const info = algorithmInfo[currentAlgorithm];
    const box = document.getElementById("algorithm-info");
    if (box) {
        box.innerHTML = `
            <p>${info.description}</p>
            <p><strong>${info.complexity}</strong></p>
        `;
    }
}

// Muestra/oculta: botón Generar, input de búsqueda, sección de recorrido
function updateUIVisibility() {
    const generateBtn = document.getElementById("generate");
    const searchInputContainer = document.getElementById("searchInputContainer");
    const traversalSection = document.getElementById("traversalResult");

    const graph = isGraphAlgo(currentAlgorithm);

    if (generateBtn) {
        // Usamos clase y style para evitar que otro CSS/JS lo “reviva”
        generateBtn.classList.toggle("hidden", graph);
        generateBtn.style.display = graph ? "none" : "inline-flex";
    }
    if (searchInputContainer) {
        searchInputContainer.classList.toggle("hidden", graph);
    }
    if (traversalSection) {
        traversalSection.classList.toggle("hidden", !graph);
    }
}

/* ---------------------------
   Arranque
--------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("ordenamiento")) {
        currentAlgorithm = "bubbleSort";
    } else if (path.includes("busqueda")) {
        currentAlgorithm = "linearSearch";
    } else {
        currentAlgorithm = "";
    }

    const algoSelect = document.getElementById("algorithmSelect");
    if (algoSelect && currentAlgorithm) {
        algoSelect.value = currentAlgorithm;
    }

    updateAlgorithmInfo();
    updateUIVisibility();

    // Cargar datos iniciales según tipo
    if (isGraphAlgo(currentAlgorithm)) {
        // Árbol
        const savedTree = localStorage.getItem("treeStructure");
        currentTree = savedTree ? JSON.parse(savedTree) : generateTreeData();
        localStorage.setItem("treeStructure", JSON.stringify(currentTree));
        drawTree(currentTree, document.getElementById("treeContainer"));
    } else if (currentAlgorithm) {
        // Array
        const savedArray = loadArray();
        currentArray = savedArray || generateArray();
        if (currentAlgorithm === "binarySearch") {
            currentArray.sort((a, b) => a - b);
        }
        saveArray(currentArray);
        drawArray(currentArray);
    }

    // Cambio de algoritmo
    if (algoSelect) {
        algoSelect.addEventListener("change", (e) => {
            currentAlgorithm = e.target.value;

            updateAlgorithmInfo();
            updateUIVisibility();

            if (currentAlgorithm === "binarySearch") {
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
                if (currentArray.length === 0) {
                    currentArray = generateArray();
                    saveArray(currentArray);
                }
                drawArray(currentArray);
            }
            else if (isGraphAlgo(currentAlgorithm)) {
                currentTree = generateTreeData();
                localStorage.setItem("treeStructure", JSON.stringify(currentTree));
                drawTree(currentTree, document.getElementById("arrayContainer"));
            }
        });
    }

    // Botón Generar (solo arrays)
    const generateBtn = document.getElementById("generate");
    if (generateBtn) {
        generateBtn.addEventListener("click", () => {
            stopExecution = true;

            if (!isGraphAlgo(currentAlgorithm)) {
                currentArray = generateArray();
                if (currentAlgorithm === "binarySearch") {
                    currentArray.sort((a, b) => a - b);
                }
                saveArray(currentArray);
                drawArray(currentArray);
            }
        });
    }

    // Botón Iniciar
    const startBtn = document.getElementById("start");
    if (startBtn) {
        startBtn.addEventListener("click", async () => {
            if (!currentAlgorithm) {
                alert("Selecciona un algoritmo primero");
                return;
            }

            // Validación para búsquedas en array
            if (window.location.pathname.includes("busqueda") &&
                ["linearSearch", "binarySearch"].includes(currentAlgorithm)) {

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

            // Para DFS/BFS usamos las funciones locales (animación en pantalla)
            if (isGraphAlgo(currentAlgorithm)) {
                const traversalContent = document.getElementById("traversalContent");
                const tree = currentTree || generateTreeData();
                const order = currentAlgorithm === "dfs" ? dfsTraversal(tree) : bfsTraversal(tree);

                if (traversalContent) {
                    traversalContent.innerHTML = "";

                    for (let val of order) {
                        const div = document.createElement("div");
                        div.textContent = val;
                        div.className = "px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold shadow";
                        traversalContent.appendChild(div);

                        const nodeElement = document.getElementById(`node-${val}`);
                        if (nodeElement) {
                            nodeElement.classList.add("bg-yellow-500", "text-black", "font-bold");
                        }

                        await sleep(700);

                        // Marcar como visitado
                        div.classList.remove("bg-yellow-500");
                        div.classList.add("bg-green-600", "text-white");

                        if (nodeElement) {
                            nodeElement.classList.remove("bg-yellow-500");
                            nodeElement.classList.add("bg-green-600", "text-white");
                        }
                    }
                }
                return;
            }

            // Rutas para otros algoritmos (ordenamiento/búsqueda en array, grafos avanzados)
            let scriptPath = "";
            if (["bubbleSort", "insertionSort", "selectionSort", "quickSort", "mergeSort", "heapSort"].includes(currentAlgorithm)) {
                scriptPath = `sorting/${currentAlgorithm}.js`;
            }
            else if (["linearSearch", "binarySearch"].includes(currentAlgorithm)) {
                scriptPath = `searching/${currentAlgorithm}.js`;
            }
            else if (["dijkstra", "aStar"].includes(currentAlgorithm)) {
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
            }
            else {
                await window[currentAlgorithm](currentArray);
            }
        });
    }
});

/* ---------------------------
   Carga dinámica y utilidades
--------------------------- */
function loadAlgorithm(path) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}