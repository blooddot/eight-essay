/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getter instance 版本
 */
export default function singleton<T>() {
    class C {
        // eslint-disable-next-line no-useless-constructor
        protected constructor() {
            // 设置constructor为protected 防止直接通过new创建实例
        }

        protected static _ins: unknown = null;

        /** 获取单例对象 */
        public static get ins(): T {
            if (C._ins === null) {
                C._ins = new this();
            }
            return C._ins as T;
        }
    }

    return C;
}

/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getInstance() 版本
 */
export class Singleton {
    protected static _instance: Singleton;

    public static getInstance<T extends typeof Singleton>(this: T): InstanceType<T> {
        if (!this._instance) {
            this._instance = new this(true);
        }
        return this._instance as InstanceType<T>;
    }

    public constructor(flag?: boolean) {
        if (!flag) {
            throw new Error('Manager can not direct constructor, please use instance !');
        }
    }
}