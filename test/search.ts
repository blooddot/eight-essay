import { genArr } from "../core/generater";
import logger from "../core/logger";
import { sequenceSearch } from "../search/sequenceSearch";
import { performance } from 'perf_hooks';
import { quickSort } from "../sort/quickSort";
import { binarySearch } from "../search/binarySearch";
import { insertionSearch } from "../search/insertionSearch";

function search(arr: number[], searchFn: (arr: number[], val: number) => number, val: number, sort?: boolean): void {
    if (sort) {
        arr = quickSort(arr);
    }

    const beforeTime = performance.now();
    const index = searchFn(arr, val);
    const afterTime = performance.now();
    logger.trace(`${searchFn.name} cost time: ${afterTime - beforeTime}ms`);
    logger.trace(`${searchFn.name} arr: `, arr)
    if (index !== -1) {
        logger.info(`${searchFn.name} found val:${val} index:${index}`);
    } else {
        logger.error(`${searchFn.name} not found val:${val} index:${index}`);
    }
}

const len = 100;
const val = Math.floor(Math.random() * len);
const arr = genArr(len);
search(arr.concat(), insertionSearch, val, true);
