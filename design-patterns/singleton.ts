/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getter instance 版本
 */
export default function singleton<T>() {
    class Singleton {
        // eslint-disable-next-line no-useless-constructor
        protected constructor() {
            // 设置constructor为protected 防止直接通过new创建实例
        }

        protected static _ins: unknown = null;

        /** 获取单例对象 */
        public static get ins(): T {
            if (Singleton._ins === null) {
                Singleton._ins = new this();
            }
            return Singleton._ins as T;
        }
    }

    return Singleton;
}

/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getInstance() 版本
 */
export class BaseMgr {
    protected static _instance: BaseMgr;

    public static getInstance<T extends typeof BaseMgr>(this: T): InstanceType<T> {
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