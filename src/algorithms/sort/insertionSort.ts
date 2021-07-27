import logger from "../../utils/logger";
/** 插入排序 */
export function insertionSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    let count: number = 0;

    let preIndex: number;
    for (let i = 1; i < arr.length; i++) {
        preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] > arr[i]) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
            count++;
        }
        arr[preIndex + 1] = arr[i];
    }

    logger.trace(`count: ${count}`);

    return arr;
}

export function insertionSort1(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    let count: number = 0;

    let preIndex: number;
    for (let i = 1; i < arr.length; i++) {
        preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] > arr[i]) {
            arr[i] = arr[preIndex];
            preIndex--;
            count++;
        }
        arr[preIndex] = arr[i];
    }

    logger.trace(`count: ${count}`);

    return arr;
}
