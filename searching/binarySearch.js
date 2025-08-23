async function binarySearch(arr, target) {
    const container = document.getElementById("arrayContainer");

    // Asegurar orden para binaria
    const a = [...arr].sort((x, y) => x - y);
    drawArray({ arr: a, container });
    await sleep(200);

    let l = 0, r = a.length - 1;

    while (l <= r) {
        const m = Math.floor((l + r) / 2);

        // Comparando el medio
        drawArray({ arr: a, highlighted: [m], container });
        await sleep(400);

        if (a[m] === target) {
            drawArray({ arr: a, found: [m], container });
            return;
        }
        if (a[m] < target) l = m + 1;
        else r = m - 1;
    }

    // No encontrado
    drawArray({ arr: a, notFound: a.map((_, i) => i), container });
}