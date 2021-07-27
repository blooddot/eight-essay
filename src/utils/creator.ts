import { BinaryTree, tNext } from "../algorithms/struct/tree";

/**
 * @author 雪糕
 * @description 用于创建实例
 */

/**
 * 创建数组
 * @param len 长度
 * @param randomLen 随机长度
 * @returns 
 */
export function creatArray(len: number, randomLen?: number): number[] {
    const arr = [];
    randomLen = randomLen || len;
    for (let index = 0; index < len; index++) {
        arr.push(Math.floor(Math.random() * randomLen));
    }
    return arr;
}

/**
 * 创建二叉树
 * @param len 长度
 * @param randomLen 随机长度 
 * @param nextType 
 * @returns 二叉树实例
 */
export function genBinaryTree(len: number, randomLen?: number, nextType: tNext = "parent"): BinaryTree {
    const tree = new BinaryTree();
    const arr = creatArray(len, randomLen);
    for (let i = 0; i < arr.length; i++) {
        tree.insert(arr[i], nextType);
    }
    return tree;
}