import { consoleTreeNode } from "@/utils/consoler";
import { genBinaryTree } from "@/utils/creator";
import logger from "@/utils/logger";
import { TreeNode } from "@/algorithms/struct/tree";
import { getNextNode } from "@/algorithms/temp/getNextNode";

const tree = genBinaryTree(10, 20);
// tree.inOrder((node: TreeNode) => {
//     logger.trace(`val:${node.val}`);
// });

consoleTreeNode(tree.root);

const node = tree.root.right;
const nextNode = getNextNode(node);
logger.trace(`getNextNode node:${node.val} nextNode:${nextNode.val}`);