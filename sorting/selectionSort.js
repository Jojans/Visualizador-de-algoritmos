async function selectionSort(arr) {
    const container = document.getElementById("arrayContainer");
    let n = arr.length;
    let sorted = [];

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (stopExecution) return; // abortar si se cambia de algoritmo
            drawArray(arr, [i, j], sorted, container);
            await sleep(500);

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            drawArray(arr, [i, minIndex], sorted, container);
            await sleep(500);
        }

        // marcar como ordenado
        sorted.push(i);
    }

    // al final todos quedan ordenados
    drawArray(arr, [], [...Array(n).keys()], container);
}