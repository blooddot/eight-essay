/** 顺序查找 */
export function sequenceSearch(arr: number[], val: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
    return -1;
}