import singleton from './singleton';

/**
 * @author 雪糕
 * @description 对象池管理类
 * acquire和release方法名来源 - 安卓对象池源码 https://android.googlesource.com/platform/frameworks/support/+/1fcce44/v4/java/android/support/v4/util/Pools.java
 */
export default class PoolMgr extends singleton<PoolMgr>() {
    /** 池子数据 */
    protected _poolMap: Map<string, IPoolData> = new Map();

    /**
     * 设置最大池子数量 当设置数量小于当前池子数量时，也能设置成功，后续从池子中拿出不会再回收到池子内
     * @param maxPoolSize 最大池子数量
     * @param CLS 对象定义
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     */
    public setMaxPoolSize<T extends IPoolObject>(maxPoolSize: number, CLS: new (...param: Array<unknown>) => T, keyPrefix?: string): void {
        const poolKey = this.getPoolKey(CLS.name, keyPrefix);
        const poolData = this.getPoolData(poolKey);

        poolData.maxPoolSize = maxPoolSize;
    }

    /**
     * 从池中取出
     * @param CLS 对象定义
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     * @param params 取出时传入的动态参数
     * @returns 创建好的实例
     */
    public acquire<T extends IPoolObject>(CLS: new (...param: Array<unknown>) => T, keyPrefix?: string, ...params: Array<unknown>): T {
        if (!CLS) return;

        const poolKey = this.getPoolKey(CLS.name, keyPrefix);
        const { poolObjects } = this.getPoolData(poolKey);

        let obj: T = null;
        if (poolObjects.length === 0) {
            obj = new CLS();
        } else {
            obj = poolObjects.pop() as T;
        }

        obj.onAcquire(...params);

        return obj;
    }

    /**
     * 回收到池中
     * @param obj 目标对象
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     * @param params 回收时传入的动态参数
     */
    public release<T extends IPoolObject>(obj: T, keyPrefix?: string, ...params: Array<unknown>): boolean {
        if (!obj) return;

        const poolKey = this.getPoolKey(obj.constructor.name, keyPrefix);
        const { poolObjects, maxPoolSize: maxSize } = this.getPoolData(poolKey);

        // 为了性能 只找上一个和本个 一般都是连续推入多次
        if (poolObjects.length > 0 && obj === poolObjects[poolObjects.length - 1]) {
            throw new Error('Already in the pool!');
        }

        obj.onRelease(...params);

        // 当前池子数量大于等于最大数量时，不回收
        if (maxSize !== 0 && poolObjects.length >= maxSize) {
            return false;
        }

        poolObjects.push(obj);
        return true;
    }

    /**
     * 清除指定池子
     * @param value 目标对象 | 对象定义
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     * @returns
     */
    public clear<T extends IPoolObject>(value: new (...param: Array<unknown>) => T | T, keyPrefix?: string): void {
        const poolKey = this.getPoolKey(value.name, keyPrefix);
        const poolData = this._poolMap.get(poolKey);
        if (!poolData) return;
        poolData.poolObjects.length = 0;
        this._poolMap.delete(poolKey);
    }


    protected getPoolKey(className: string, keyPrefix?: string): string {
        return keyPrefix ? `${keyPrefix}_${className}` : className;
    }

    protected getPoolData(poolKey: string): IPoolData {
        let poolData = this._poolMap.get(poolKey);
        if (!poolData) {
            poolData = {
                poolObjects: [],
                maxPoolSize: 0
            };
            this._poolMap.set(poolKey, poolData);
        }

        return poolData;
    }
}

interface IPoolData {
    poolObjects: Array<IPoolObject>; // 池子对象实例
    maxPoolSize: number; // 池子最大数量，0代表无限制
}

export interface IPoolObject {
    /** 当从对象池中取出时，初始化方法 */
    onAcquire(...params: Array<unknown>): void;
    /** 当释放回到对象池时，回收的方法 */
    onRelease(...params: Array<unknown>): void;
}
