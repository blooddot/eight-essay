import singleton from '../creational-patterns/singleton';

/**
 * @author 雪糕
 * @description 对象池管理类
 * @see acquire和release方法名来源 https://android.googlesource.com/platform/frameworks/support/+/1fcce44/v4/java/android/support/v4/util/Pools.java
 */
export default class PoolMgr extends singleton<PoolMgr>() {
    /** 池子数据 */
    protected poolMap: Map<string, IPoolData> = new Map();

    /**
     * 设置最大池子数量 当设置数量小于当前池子数量时，也能设置成功，后续从池子中拿出不会再回收到池子内
     * @param maxPoolSize 最大池子数量
     * @param C 对象定义
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     */
    public setMaxPoolSize<T extends IPoolObject>(maxPoolSize: number, C: IPoolObjectConstructor<T>, keyPrefix?: string): void {
        const poolKey = this.getPoolKey(C, keyPrefix);
        const poolData = this.getPoolData(poolKey);

        poolData.maxPoolSize = maxPoolSize;
    }

    /**
     * 从池中取出
     * @param C 对象定义
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     * @param params 取出时传入的动态参数
     * @returns 创建好的实例
     */
    public acquire<T extends IPoolObject>(C: IPoolObjectConstructor<T>, keyPrefix?: string, ...params: Array<unknown>): T {
        if (!C) return null;

        const poolKey = this.getPoolKey(C, keyPrefix);
        const poolData = this.getPoolData(poolKey);

        let obj: T;
        if (poolData?.poolObjects?.length > 0) {
            obj = poolData.poolObjects.pop() as T;
        } else {
            obj = new C();
        }

        obj.poolKey = poolKey;
        obj.onAcquire(...params);

        return obj;
    }

    /**
     * 回收到池中
     * @param obj 目标对象
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     * @param params 回收时传入的动态参数
     */
    public release<T extends IPoolObject>(obj: T, ...params: Array<unknown>): boolean {
        if (!obj) return false;

        const { poolObjects, maxPoolSize: maxSize } = this.getAddPoolData(obj.poolKey);

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
     * @param poolKey 池子key
     */
    public clear(poolKey: string): void {
        const poolData = this.poolMap.get(poolKey);
        if (!poolData) return;
        poolData.poolObjects.length = 0;
        this.poolMap.delete(poolKey);
    }

    /**
     * 通过类型获取池子key
     * @param C 对象定义
     * @param keyPrefix 可选参数 对象池key前缀，默认不传使用类名当key
     * @returns 返回拼接后的池子key
     */
    protected getPoolKey<T extends IPoolObject>(C: IPoolObjectConstructor<T>, keyPrefix?: string): string {
        const className: string = C.className;
        return keyPrefix ? `${keyPrefix}_${className}` : className;
    }

    /**
     * 根据key获取PoolData 不存在的情况返回空
     * @param poolKey 池子key
     * @returns 池子数据
     */
    protected getPoolData(poolKey: string): IPoolData {
        return this.poolMap.get(poolKey);
    }

    /**
     * 根据key获取PoolData 不存在的情况会自动添加一个空的PoolData对象
     * @param poolKey 池子key
     * @returns 池子数据
     */
    protected getAddPoolData(poolKey: string): IPoolData {
        let poolData = this.getPoolData(poolKey);
        if (!poolData) {
            poolData = {
                poolObjects: [],
                maxPoolSize: 0
            };
            this.poolMap.set(poolKey, poolData);
        }

        return poolData;
    }
}

interface IPoolData {
    poolObjects: Array<IPoolObject>; // 池子对象实例
    maxPoolSize: number; // 池子最大数量，0代表无限制
}

/** 对象池实例结构 */
export interface IPoolObject {
    /** 对应的池子key */
    poolKey: string;
    /** 当从对象池中取出时，初始化方法 */
    onAcquire(...params: Array<unknown>): void;
    /** 当释放回到对象池时，回收的方法 */
    onRelease(...params: Array<unknown>): void;
}

/** 对象池实例结构 构造接口 */
export interface IPoolObjectConstructor<T extends IPoolObject> {
    new(): T;
    /** 类名 */
    readonly className: string;
}
