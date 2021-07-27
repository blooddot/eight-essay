/** 快速选择 */
export function quickSelect(arr: number[], k: number): number {
    if (k < 0 || k > arr.length) return null;
    let low = 0;
    let high = arr.length - 1;
    const index = arr.length - k;
    let pivot: number;
    while (low <= high) {
        pivot = partition(arr, low, high);
        if (pivot < index) {
            low = pivot + 1;
        } else if (pivot > index) {
            high = pivot - 1;
        } else {
            return arr[pivot];
        }
    }

    return null;
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