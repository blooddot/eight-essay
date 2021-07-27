import { performance } from 'perf_hooks';
import { creatArray } from "../src/utils/creator";
import logger from "../src/utils/logger";
import { quickSelect } from "../src/algorithms/select/quickSelect";

function select(arr: number[], selectFn: (_: number[], __: number) => number, k: number): void {
    const beforeTime = performance.now();
    const val = selectFn(arr, k);
    const afterTime = performance.now();
    logger.trace(`${selectFn.name} cost time: ${afterTime - beforeTime}ms`);
    logger.trace(`${selectFn.name} arr:`, arr);
    if (val !== null) {
        logger.info(`${selectFn.name} found k:${k} val:${val}`);
    } else {
        logger.error(`${selectFn.name} not found k:${k} val:${val} `);
    }
}

const len = 10;
const k = 1;
const arr = creatArray(len);
select(arr.concat(), quickSelect, k);
