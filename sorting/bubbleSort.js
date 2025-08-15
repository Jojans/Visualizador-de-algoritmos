async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            drawArray(arr, [j, j + 1]);
            await sleep(500);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                drawArray(arr, [j, j + 1]);
                await sleep(500);
            }
        }
    }
    // Cuando termina, pintamos todos de verde
    drawArray(arr, [], true);
}