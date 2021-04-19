/** 选择排序 */
export function selectionSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    let minIndex: number;
    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }

    return arr;
}