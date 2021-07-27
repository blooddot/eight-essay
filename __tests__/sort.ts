import { performance } from 'perf_hooks';
import { genArr } from '../src/utils/ generator';
import logger from '../src/utils/logger';
import { bubbleSort, bubbleSort1 } from '../src/algorithms/sort/bubbleSort';
import { heapSort } from '../src/algorithms/sort/heapSort';
import { insertionSort, insertionSort1 } from '../src/algorithms/sort/insertionSort';
import { mergeSort } from '../src/algorithms/sort/mergeSort';
import { quickSort } from '../src/algorithms/sort/quickSort';
import { selectionSort } from '../src/algorithms/sort/selectionSort';

function sort(arr: number[], sortFn: (_: number[]) => number[]): void {
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
