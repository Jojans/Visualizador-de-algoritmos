async function quickSort(arr, left = 0, right = arr.length - 1, sorted = []) {
    const container = document.getElementById("arrayContainer");

    if (stopExecution) return; // Detener si se cambió de algoritmo

    if (left < right) {
        let pivotIndex = await partition(arr, left, right, sorted);
        if (stopExecution) return;

        // Marcar el pivote como "ordenado"
        sorted.push(pivotIndex);
        if (stopExecution) return;
        drawArray(arr, [], sorted, container);

        if (stopExecution) return;
        await sleep(500);

        // Llamadas recursivas
        await quickSort(arr, left, pivotIndex - 1, sorted);
        if (stopExecution) return;

        await quickSort(arr, pivotIndex + 1, right, sorted);
        if (stopExecution) return;
    }

    // Si está en la raíz (terminó todo), marcar array completo como ordenado
    if (!stopExecution && left === 0 && right === arr.length - 1) {
        drawArray(arr, [], [...Array(arr.length).keys()], container);
    }
}

async function partition(arr, left, right, sorted) {
    const container = document.getElementById("arrayContainer");
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (stopExecution) return;

        // Marcar comparación
        drawArray(arr, [j, right], sorted, container);
        if (stopExecution) return;
        await sleep(500);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            if (stopExecution) return;
            drawArray(arr, [i, j], sorted, container);

            if (stopExecution) return;
            await sleep(500);
        }
    }

    // Swap final: pivot a su lugar definitivo
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    if (stopExecution) return;
    drawArray(arr, [i + 1, right], sorted, container);

    if (stopExecution) return;
    await sleep(500);

    return i + 1; // índice final del pivote (queda fijo ya)
}