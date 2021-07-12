import { consoleTreeNode } from "../core/consoler";
import { genBinaryTree } from "../core/ generator";
import logger from "../core/logger";
import { TreeNode } from "../struct/tree";
import { getNextNode } from "../temp/getNextNode";

const tree = genBinaryTree(10, 20);
// tree.inOrder((node: TreeNode) => {
//     logger.trace(`val:${node.val}`);
// });

consoleTreeNode(tree.root);

const node = tree.root.right;
const nextNode = getNextNode(node);
logger.trace(`getNextNode node:${node.val} nextNode:${nextNode.val}`);