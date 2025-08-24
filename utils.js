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

/* -------------------------------
   Árbol binario fijo para DFS/BFS
--------------------------------- */
function generateTreeData() {
    return {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    { value: 4, children: [] },
                    { value: 5, children: [] }
                ]
            },
            {
                value: 3,
                children: [
                    { value: 6, children: [] },
                    { value: 7, children: [] }
                ]
            }
        ]
    };
}

/* -------------------------------
   Dibujar árbol con IDs por nodo
--------------------------------- */
function drawTree(node, container = document.getElementById("treeContainer"), options = {}) {
    const { highlighted = null, found = null, notFound = null } = options;
    container.innerHTML = "";

    function createNodeElement(node) {
        const el = document.createElement("div");
        el.classList.add("tree-node");
        el.id = `node-${node.value}`; // ✅ ID único
        el.textContent = node.value;

        // 🎨 Colorear según estado
        if (found === node.value) {
            el.style.backgroundColor = "lightgreen"; // encontrado
        } else if (notFound === node.value) {
            el.style.backgroundColor = "tomato"; // no encontrado
        } else if (highlighted === node.value) {
            el.style.backgroundColor = "salmon"; // visitando
        } else {
            el.style.backgroundColor = "lightblue"; // inicial
        }

        if (node.children.length > 0) {
            const childrenContainer = document.createElement("div");
            childrenContainer.classList.add("tree-children");
            node.children.forEach(child => {
                childrenContainer.appendChild(createNodeElement(child));
            });
            el.appendChild(childrenContainer);
        }

        return el;
    }

    container.appendChild(createNodeElement(node));
}