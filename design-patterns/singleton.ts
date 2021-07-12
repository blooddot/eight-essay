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

        private static m_ins: unknown = null;

        /** 获取单例对象 */
        public static get ins(): T {
            if (Singleton.m_ins === null) {
                Singleton.m_ins = new this();
            }
            return Singleton.m_ins as T;
        }
    }

    return Singleton;
}

/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getInstance() 版本
 */
export class BaseMgr {
    private static m_instance: BaseMgr;

    public static getInstance<T extends typeof BaseMgr>(this: T): InstanceType<T> {
        if (!this.m_instance) {
            this.m_instance = new this(true);
        }
        return this.m_instance as InstanceType<T>;
    }

    public constructor(flag?: boolean) {
        if (!flag) {
            throw new Error('Manager can not direct constructor, please use instance !');
        }
    }
}