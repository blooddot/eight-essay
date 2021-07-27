/**
 * @author 雪糕
 * @description
 */

declare global {
    interface PromiseConstructor {
        allSync: (values: Array<Promise<unknown>>) => void;

    }
}

export default function promise(): void {
    Promise.allSync = (values: Array<Promise<unknown>>): void => {
        values.reduce((previousPromise, nextPromise) => previousPromise.then(() => nextPromise),
            Promise.resolve()
        );
    };
}




// Promise.allSync = async <T>(values: Array<((...param: unknown[]) => Promise<T>)>): Promise<void> => {
//     for (const value of values) {
//         await value();
//     }
// }

// const timeoutFn = (timeout: number, id: number) => () => {
//     return new Promise<void>(resolve => {
//         setTimeout(() => {
//             console.log("promise", id);
//             resolve();
//         }, timeout);
//     });
// }

// const arr = [
//     timeoutFn(3000, 1),
//     timeoutFn(2000, 2),
//     timeoutFn(1000, 3),
// ]

// Promise.allSync(arr);

// async function init() {
//     await Promise.all(arr);
// }