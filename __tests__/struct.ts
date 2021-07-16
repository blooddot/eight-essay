import { consoleTreeNode } from "../src/core/consoler";
import { genBinaryTree } from "../src/core/ generator";
import logger from "../src/core/logger";
import { TreeNode } from "../src/struct/tree";
import { getNextNode } from "../src/temp/getNextNode";

const tree = genBinaryTree(10, 20);
// tree.inOrder((node: TreeNode) => {
//     logger.trace(`val:${node.val}`);
// });

consoleTreeNode(tree.root);

const node = tree.root.right;
const nextNode = getNextNode(node);
logger.trace(`getNextNode node:${node.val} nextNode:${nextNode.val}`);