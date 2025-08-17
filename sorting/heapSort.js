async function heapSort(arr) {
    const container = document.getElementById("arrayContainer");
    let n = arr.length;
    let sorted = []; // índices que ya están en su posición definitiva

    // Función para hacer heapify
    async function heapify(n, i) {
        if (stopExecution) return;

        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            if (stopExecution) return;
            drawArray(arr, [i, largest], sorted, container); // mantener verdes

            if (stopExecution) return;
            await sleep(600);

            await heapify(n, largest);
        }
    }

    // 1. Construir heap máximo
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (stopExecution) return;
        await heapify(n, i);
    }

    // 2. Extraer elementos del heap uno por uno
    for (let i = n - 1; i > 0; i--) {
        if (stopExecution) return;

        [arr[0], arr[i]] = [arr[i], arr[0]];
        sorted.push(i); // este índice ya está ordenado

        if (stopExecution) return;
        drawArray(arr, [0, i], sorted, container);

        if (stopExecution) return;
        await sleep(500);

        await heapify(i, 0);
    }

    if (stopExecution) return;

    // El último elemento en arr[0] también queda ordenado
    sorted.push(0);

    // Pintar todo como ordenado
    drawArray(arr, [], sorted, container);
}