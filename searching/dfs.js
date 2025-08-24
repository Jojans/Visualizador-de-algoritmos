async function dfsTraversal(root) {
    let result = [];
    function dfs(node) {
        if (!node) return;
        result.push(node);
        node.children.forEach(child => dfs(child));
    }
    dfs(root);
    return result;
}