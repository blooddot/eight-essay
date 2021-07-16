import { performance } from 'perf_hooks';
import { genArr } from '../src/core/ generator';
import logger from '../src/core/logger';
import { bubbleSort, bubbleSort1 } from '../src/sort/bubbleSort';
import { heapSort } from '../src/sort/heapSort';
import { insertionSort, insertionSort1 } from '../src/sort/insertionSort';
import { mergeSort } from '../src/sort/mergeSort';
import { quickSort } from '../src/sort/quickSort';
import { selectionSort } from '../src/sort/selectionSort';

function sort(arr: number[], sortFn: (arr: number[]) => number[]): void {
    const len = arr.length;
    const beforeTime = performance.now();
    logger.trace(`${sortFn.name} before arr:`, arr);
    arr = sortFn(arr);
    const afterTime = performance.now();
    logger.trace(`${sortFn.name} after arr:`, arr);
    logger.trace(`${sortFn.name} cost time: ${afterTime - beforeTime}ms`);

    if (check(arr, len)) {
        logger.info(`${sortFn.name} success`);
    } else {
        logger.error(`${sortFn.name} failed`);
    }
}

function check(arr: number[], len: number): boolean {
    if (arr.length !== len) return false;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

const arr = genArr(1000);
sort(arr.concat(), heapSort);
