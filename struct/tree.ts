export class TreeNode {
    val: number;
    left: TreeNode;
    right: TreeNode;
    next: TreeNode;
    public constructor(val?: number, left?: TreeNode, right?: TreeNode, next?: TreeNode) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
        this.next = (next === undefined ? null : next);
    }
}

/** 二叉树 */
export class BinaryTree {
    public root: TreeNode;

    public constructor(root?: TreeNode) {
        this.root = root;
    }

    /** 插入 */
    public insert(val: number, typeNext: typeNext = "parent"): void {
        let node = new TreeNode(val, null, null);
        if (!this.root) {
            this.root = node;
            return;
        }

        let current: TreeNode = this.root;
        let parent: TreeNode;
        while (true) {
            parent = current;
            if (val < current.val) {
                current = current.left;
                if (current == null) {
                    parent.left = node;
                    break;
                }
            } else {
                current = current.right;
                if (current == null) {
                    parent.right = node;
                    break;
                }
            }
        }

        switch (typeNext) {
            case "left":
                node.next = node.left;
                break;
            case "right":
                node.next = node.right;
                break;
            case "parent":
            default:
                node.next = parent;
                break;
        }
    }

    /** 前序遍历 */
    public preOrder(callbackfn?: (node: TreeNode) => void, node: TreeNode = this.root): void {
        if (!node) return;
        callbackfn && callbackfn(node);
        this.preOrder(callbackfn, node.left);
        this.preOrder(callbackfn, node.right);
    }

    /** 中序遍历 */
    public inOrder(callbackfn?: (node: TreeNode) => void, node: TreeNode = this.root): void {
        if (!node) return;
        this.inOrder(callbackfn, node.left);
        callbackfn && callbackfn(node);
        this.inOrder(callbackfn, node.right);
    }

    /** 后序遍历 */
    public postOrder(callbackfn?: (node: TreeNode) => void, node: TreeNode = this.root): void {
        if (!node) return;
        this.postOrder(callbackfn, node.left);
        this.postOrder(callbackfn, node.right);
        callbackfn && callbackfn(node);
    }
}

export type typeNext = "left" | "right" | "parent";