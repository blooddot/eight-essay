import { BinaryTree, TreeNode } from "../struct/tree";

export function getNextNode(node: TreeNode): TreeNode {
    if (!node) return null;

    let rootNode = null;
    let temp = node;
    // 第一步
    while (temp) {
        rootNode = temp;
        temp = temp.next;
    }

    // 第二步
    const arr: TreeNode[] = [];
    const tree = new BinaryTree(rootNode);
    tree.preOrder((node: TreeNode) => {
        arr.push(node);
    });

    // 第三步
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].val === node.val && i !== arr.length - 1) {
            return arr[i + 1];
        }
    }

    return null;
}