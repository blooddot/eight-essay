/** 堆排序(升序) */
export function heapSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;
    // 把无序数组构建成最大堆, 这里-2,是因为从索引0开始、另外就是叶子节点【最后一层是不需要堆化的】
    for (let i = (arr.length - 2) >> 1; i >= 0; i--) {
        downAdjust(arr, i, arr.length);
    }

    // 循环删除堆顶元素，并且移到集合尾部，调整堆产生新的堆顶
    for (let i = arr.length - 1; i > 0; i--) {
        // 交换最后一个元素与第一个元素
        [arr[0], arr[i]] = [arr[i], arr[0]];
        // 下沉调整最大堆
        downAdjust(arr, 0, i);
    }

    return arr;
}

/** 下沉操作 */
function downAdjust(arr: number[], parentIndex: number, len: number): void {
    // temp保存父节点的值，用于最后赋值
    let temp = arr[parentIndex];
    let childrenIndex = parentIndex * 2 + 1;
    while (childrenIndex < len) {
        // 如果有右孩子，且右孩子大于左孩子的值，则定位到右孩子
        // 这里其实是比较左、右子树的大小，选择更大的
        if (childrenIndex + 1 < len && arr[childrenIndex + 1] > arr[childrenIndex]) {
            childrenIndex++;
        }

        // 如果父节点大于任何一个孩子得值，则直接跳出
        if (temp >= arr[childrenIndex]) {
            break;
        }

        // 当左、右子树比父节点更大，进行交换
        arr[parentIndex] = arr[childrenIndex];
        parentIndex = childrenIndex;
        childrenIndex = parentIndex * 2 + 1
    }
    arr[parentIndex] = temp;
}