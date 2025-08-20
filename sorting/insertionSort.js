async function insertionSort(arr) {
    const container = document.getElementById("arrayContainer");

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        if (stopExecution) return; // Abortar si se cambió de algoritmo

        drawArray(arr, [i], [], container); // Solo resaltar el actual
        await sleep(500);

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;

            drawArray(arr, [j + 1, j + 2], [], container); // Resaltar comparación
            await sleep(500);
        }
        arr[j + 1] = key;

        drawArray(arr, [j + 1], [], container); // Mostrar inserción
        await sleep(500);
    }

    // Al final, marcar todo como ordenado
    drawArray(arr, [], [...Array(arr.length).keys()], container);
}