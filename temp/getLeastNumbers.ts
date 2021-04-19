export function GetLeastNumbers_Solution(input: number[], k: number): number[] {
    // write code here
    if (!input || input.length < k) return [];

    let low = 0;
    let high = input.length - 1;
    let result = [];
    while (low < high) {
        const pivot = partition(input, low, high);
        if (pivot === k - 1) {
            return input.slice(0, k);
        }

        if (pivot < k - 1) {
            low = pivot + 1;
        }
        else {
            high = pivot;
        }
    }
    return result;
}

function partition(arr: number[], low: number, high: number): number {
    let pivot = arr[low];
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

const result = GetLeastNumbers_Solution([4, 5, 1, 6, 2, 7, 3, 8], 4);
console.log(`result:`, result);