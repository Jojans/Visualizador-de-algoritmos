async function mergeSort(arr) {
    const container = document.getElementById("arrayContainer");
    let n = arr.length;

    async function mergeSortRecursive(left, right) {
        if (stopExecution) return;
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        await mergeSortRecursive(left, mid);
        if (stopExecution) return;

        await mergeSortRecursive(mid + 1, right);
        if (stopExecution) return;

        await merge(left, mid, right);
    }

    async function merge(left, mid, right) {
        if (stopExecution) return;

        let n1 = mid - left + 1;
        let n2 = right - mid;

        let L = [];
        let R = [];

        for (let i = 0; i < n1; i++) L.push(arr[left + i]);
        for (let j = 0; j < n2; j++) R.push(arr[mid + 1 + j]);

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (stopExecution) return;

            // Comparación
            if (stopExecution) return;
            drawArray(arr, [k], [], container);

            if (stopExecution) return;
            await sleep(500);

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;

            if (stopExecution) return;
            drawArray(arr, [k], [], container);

            if (stopExecution) return;
            await sleep(500);
        }

        while (i < n1) {
            if (stopExecution) return;
            arr[k] = L[i];
            i++;
            k++;

            if (stopExecution) return;
            drawArray(arr, [k], [], container);

            if (stopExecution) return;
            await sleep(500);
        }

        while (j < n2) {
            if (stopExecution) return;
            arr[k] = R[j];
            j++;
            k++;

            if (stopExecution) return;
            drawArray(arr, [k], [], container);

            if (stopExecution) return;
            await sleep(500);
        }
    }

    await mergeSortRecursive(0, n - 1);

    if (stopExecution) return;

    // Solo aquí se marcan todos como ordenados
    drawArray(arr, [], [...Array(n).keys()], container);
}