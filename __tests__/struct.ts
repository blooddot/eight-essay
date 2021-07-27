import { consoleTreeNode } from "../src/utils/consoler";
import { genBinaryTree } from "../src/utils/ generator";
import logger from "../src/utils/logger";
import { TreeNode } from "../src/algorithms/struct/tree";
import { getNextNode } from "../src/algorithms/temp/getNextNode";

const tree = genBinaryTree(10, 20);
// tree.inOrder((node: TreeNode) => {
//     logger.trace(`val:${node.val}`);
// });

consoleTreeNode(tree.root);

const node = tree.root.right;
const nextNode = getNextNode(node);
logger.trace(`getNextNode node:${node.val} nextNode:${nextNode.val}`);