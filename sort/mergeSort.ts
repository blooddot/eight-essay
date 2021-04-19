/** 归并排序 */
export function mergeSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    const mid = arr.length >> 1;
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    return mergeArr(mergeSort(leftArr), mergeSort(rightArr));
}

function mergeArr(leftArr: number[], rightArr: number[]): number[] {
    const arr: number[] = [];
    while (leftArr.length > 0 && rightArr.length > 0) {
        if (leftArr[0] <= rightArr[0]) {
            arr.push(leftArr.shift() as number);
        } else {
            arr.push(rightArr.shift() as number);
        }
    }

    while (leftArr.length > 0) {
        arr.push(leftArr.shift() as number);
    }

    while (rightArr.length > 0) {
        arr.push(rightArr.shift() as number);
    }

    return arr;
}