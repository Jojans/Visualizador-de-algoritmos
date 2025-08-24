async function bfsTraversal(root) {
    let result = [];
    let queue = [root];
    while (queue.length > 0) {
        let node = queue.shift();
        result.push(node);
        queue.push(...node.children);
    }
    return result;
}