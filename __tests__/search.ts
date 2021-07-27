import { genArr } from "../src/utils/ generator";
import logger from "../src/utils/logger";
import { sequenceSearch } from "../src/algorithms/search/sequenceSearch";
import { performance } from 'perf_hooks';
import { quickSort } from "../src/algorithms/sort/quickSort";
import { binarySearch } from "../src/algorithms/search/binarySearch";
import { insertionSearch } from "../src/algorithms/search/insertionSearch";

function search(arr: number[], searchFn: (_: number[], __: number) => number, val: number, sort?: boolean): void {
    if (sort) {
        arr = quickSort(arr);
    }

    const beforeTime = performance.now();
    const index = searchFn(arr, val);
    const afterTime = performance.now();
    logger.trace(`${searchFn.name} cost time: ${afterTime - beforeTime}ms`);
    logger.trace(`${searchFn.name} arr: `, arr);
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
