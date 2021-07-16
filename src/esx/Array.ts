/**
 * @author 雪糕
 * @description
 */
declare global {
    interface Array<T> {
        allSync: (this: Array<T>) => void;
        all: (this: Array<T>) => Promise<unknown>;
    }
}

export default function array(): void {
    Array.prototype.allSync = async function <T>(this: Array<T>): Promise<void> {
        for (const iterator of this) {
            if (iterator instanceof Promise) {
                await iterator;
            }
        }

        // this.reduce((previousPromise: Promise<unknown>, nextPromise: unknown) => {
        //     return previousPromise.then(
        //         () => Promise.resolve(nextPromise)
        //     ).catch(() => {
        //         Promise.reject();
        //     });
        // },
        //     Promise.resolve()
        // );
    };

    Array.prototype.all = function <T>(this: Array<T>): Promise<unknown> {
        let resolved = 0;
        const results = [];
        return new Promise((resolve, reject) => {
            for (const promise of this) {
                if (promise instanceof Promise) {
                    promise
                        .then((result) => {
                            results.push(result);
                            if (++resolved === this.length) {
                                resolve(results);
                            }
                        })
                        .catch((e) => {
                            reject(e);
                        });
                }
            }
        });
    };
}

// export default Array;
// global.Array

// Promise.allSync = (values: Array<Promise<unknown>>): void => {
//     values.reduce((previousPromise, nextPromise) => previousPromise.then(() => nextPromise),
//         Promise.resolve()
//     );
// }



// const timeoutFn = (timeout: number, id: number) => {
//     return new Promise<void>((resolve, reject) => {
//         setTimeout(() => {
//             if (id === 2) {
//                 reject(new Error(`test reject`));
//             } else {
//                 resolve();
//             }
//             console.log("promise", id);
//         }, timeout);
//     });
// }

// const arr = [
//     timeoutFn(3000, 1),
//     timeoutFn(2000, 2),
//     timeoutFn(1000, 3),
// ]

// arr.allSync();

// const promiseAll = function (promises) {
//     return new Promise((resolve, reject) => {
//         let index = 0;
//         let result = [];
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             function processValue(i, data) {
//                 result[i] = data;
//                 if (++index === promises.length) {
//                     resolve(result);
//                 }
//             }
//             for (let i = 0; i < promises.length; i++) {
//                 //promises[i] 可能是普通值
//                 Promise.resolve(promises[i]).then((data) => {
//                     processValue(i, data);
//                 }, (err) => {
//                     reject(err);
//                     return;
//                 });
//             }
//         }
//     });
// }

// const promiseAll = async (promises) => {
//     const results = [];
//     for (const p of promises) {
//         results.push(await p);
//     }
//     return results;
// }

// const promiseAll = (promises: Array<Promise<void>>) => {
//     let resolved = 0;
//     let results = [];
//     return new Promise((resolve, reject) => {
//         for (let promise of promises) {
//             promise
//                 .then((result) => {
//                     results.push(result);
//                     if (++resolved === promises.length) resolve(results);
//                 })
//                 .catch((e) => {
//                     reject(e);
//                 });
//         }
//     })
// }


// promiseAll([
//     timeoutFn(3000, 1),
//     timeoutFn(2000, 2),
//     timeoutFn(1000, 3),
// ])

// for (const iterator of arr) {
//     iterator();
// }
