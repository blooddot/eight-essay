import { TreeNode } from "../algorithms/struct/tree";
import logger from "./logger";

/**
 * @author 雪糕
 * @description 打印指定数据结构
 */

export function consoleTreeNode(node: TreeNode): void {
    if (!node) return;

    logger.trace(`node val:${node.val} left.val:${node.left && node.left.val} right.val:${node.right && node.right.val}`);
    if (node.left) {
        consoleTreeNode(node.left);
    }
    if (node.right) {
        consoleTreeNode(node.right);
    }
}