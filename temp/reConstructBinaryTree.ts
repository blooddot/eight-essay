import { TreeNode } from "../struct/tree";

/**
 * 假设有二叉树如下：
1
2
3
4
5
    1
   / \
  2   3
 / \
4   5
它的前序遍历的顺序是：1 2 4 5 3。中序遍历的顺序是：4 2 5 1 3

因为前序遍历的第一个元素就是当前二叉树的根节点。那么，这个值就可以将中序遍历分成 2 个部分。在以上面的例子，中序遍历就被分成了 4 2 5 和 3 两个部分。4 2 5就是左子树，3就是右子树。

最后，根据左右子树，继续递归即可。
 * 
 */
function reConstructBinaryTree(pre: number[], vin: number[]): TreeNode {
    if (!pre.length || !vin.length) return null;

    const rootVal = pre[0];
    let index = vin.length - 1; // index有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
    while (index >= 0) {
        if (vin[index] === rootVal) {
            break;
        }
        index--;
    }

    const node = new TreeNode(rootVal);
    node.left = reConstructBinaryTree(pre.slice(1, index + 1), vin.slice(0, index));
    node.right = reConstructBinaryTree(pre.slice(index + 1), vin.slice(index + 1));
    return node;
}

const result = reConstructBinaryTree([1, 2, 3, 4, 5, 6, 7], [3, 2, 4, 1, 6, 5, 7]);
console.log(`result:`, result);