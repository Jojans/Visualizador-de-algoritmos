async function insertionSort(arr) {
    const container = document.getElementById("arrayContainer");
    let sorted = [];

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        drawArray(arr, [i], sorted, container);
        await sleep(200);

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;

            drawArray(arr, [j + 1, j + 2], sorted, container);
            await sleep(200);
        }
        arr[j + 1] = key;

        // marcar como "ordenado" hasta la posición i
        sorted = [...Array(i + 1).keys()];
    }

    drawArray(arr, [], sorted, container);
}
