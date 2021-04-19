/** 插值查找 */
export function insertionSearch(arr: number[], val: number): number {
    if (!arr || arr.length === 0) return -1;

    // return search(arr, val);
    return recursionSearch(arr, val, 0, arr.length - 1);
}

function search(arr: number[], val: number): number {
    let low = 0;
    let high = arr.length - 1;
    let mid: number;
    while (low < high) {
        mid = low + Math.ceil((val - arr[low]) / (arr[high] - arr[low]) * (high - low));
        if (val === arr[mid]) {
            return mid;
        }
        if (val < arr[mid]) {
            high = mid - 1;
        }
        if (val > arr[mid]) {
            low = mid + 1;
        }
    }

    return -1;
}

function recursionSearch(arr: number[], val: number, low: number, high: number): number {
    if (low < high) {
        let mid = low + Math.ceil((val - arr[low]) / (arr[high] - arr[low]) * (high - low));
        if (val === arr[mid]) {
            return mid;
        }
        if (val < arr[mid]) {
            return recursionSearch(arr, val, low, mid - 1);
        }
        if (val > arr[mid]) {
            return recursionSearch(arr, val, mid + 1, high);
        }
    }

    return -1;
}