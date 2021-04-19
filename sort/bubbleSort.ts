import logger from "../core/logger";

/** 冒泡排序 */
export function bubbleSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    let count = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            count++;
        }
    }
    logger.trace(`bubbleSort count:${count}`);

    return arr;
}

export function bubbleSort1(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    let count = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            count++;
        }
    }
    logger.trace(`bubbleSort count:${count}`);

    return arr;
}