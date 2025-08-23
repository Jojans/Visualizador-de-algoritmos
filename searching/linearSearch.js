async function linearSearch(arr, target) {
    const container = document.getElementById("arrayContainer");
    const found = [];

    // Estado inicial
    drawArray({ arr, container });

    for (let i = 0; i < arr.length; i++) {
        // Comparando -> rojo temporal
        drawArray({ arr, highlighted: [i], found, container });
        await sleep(300);

        if (arr[i] === target) {
            found.push(i);
            // Mostrar encontrados en verde (sin rojo)
            drawArray({ arr, found, container });
            await sleep(300);
        }
    }

    if (found.length === 0) {
        // No hubo coincidencias: todo rojo
        drawArray({ arr, notFound: arr.map((_, i) => i), container });
    } else {
        // Final: solo los encontrados en verde, resto normal
        drawArray({ arr, found, container });
    }
}