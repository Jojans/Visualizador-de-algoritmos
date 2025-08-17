async function bubbleSort(arr) {
    const container = document.getElementById("arrayContainer");
    let n = arr.length;
    let sorted = [];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (stopExecution) return; // Abortar si se cambió de algoritmo
            // Marcar en rojo los que se comparan
            drawArray(arr, [j, j + 1], sorted, container);
            await sleep(500);

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                drawArray(arr, [j, j + 1], sorted, container);
                await sleep(500);
            }
        }
        // El último elemento de cada pasada queda ordenado
        sorted.unshift(n - i - 1);
    }

    // Marcar todo como ordenado al final
    drawArray(arr, [], [...Array(n).keys()], container);
}