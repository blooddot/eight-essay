/** 快速排序 */
export function quickSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    return sort(arr, 0, arr.length - 1);
}

function sort(arr: number[], low: number, high: number): number[] {
    if (low < high) {
        const pivot = partition(arr, low, high);
        sort(arr, low, pivot - 1);
        sort(arr, pivot + 1, high);
    }

    return arr;
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[low];

    while (low < high) {
        while (low < high && arr[high] >= pivot) {
            high--;
        }
        arr[low] = arr[high];

        while (low < high && arr[low] <= pivot) {
            low++;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;

    return low;
}
