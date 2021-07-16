import PoolMgr, { IPoolObject } from "../../src/design-patterns/PoolMgr";

class Test_PoolMgr extends PoolMgr {
    public getPoolObjectSize<T extends IPoolObject>(value: new (...param: Array<unknown>) => T | T, keyPrefix?: string): number {
        const poolKey = this.getPoolKey(value.name, keyPrefix);
        const poolData = this._poolMap.get(poolKey);
        if (!poolData) return 0;
        return poolData.poolObjects.length;
    }

    public static get ins(): Test_PoolMgr {
        if (Test_PoolMgr._ins === null) {
            Test_PoolMgr._ins = new this();
        }
        return Test_PoolMgr._ins as Test_PoolMgr;
    }
}

class Test_PoolObject implements IPoolObject {
    public inited = false;
    public param1: number;
    public paramA: string;

    public onAcquire(param1: number, paramA: string): void {
        this.inited = true;
        this.param1 = param1;
        this.paramA = paramA;
    }


    public onRelease(): void {
        this.inited = false;
        this.param1 = null;
        this.paramA = null;
    }
}

describe('PoolMgr UNIT', () => {
    let obj: Test_PoolObject;
    test('PoolMgr acquire', () => {
        obj = Test_PoolMgr.ins.acquire(Test_PoolObject, '', 1, 'a');
        expect(obj).toBeDefined();
        expect(obj.inited).toBeTruthy();
    });
    test('PoolObject param init', () => {
        expect(obj.param1).toEqual(1);
        expect(obj.paramA).toEqual('a');
    });

    test('PoolMgr release', () => {
        Test_PoolMgr.ins.release(obj);
        expect(obj.inited).toBeFalsy();
    });
    test('PoolObject param clear', () => {
        expect(obj.param1).toBeNull();
        expect(obj.paramA).toBeNull();
    });
    test('PoolMgr PoolObject size', () => {
        expect(Test_PoolMgr.ins.getPoolObjectSize(Test_PoolObject)).toEqual(1);
    });

    test('PoolMgr clear', () => {
        Test_PoolMgr.ins.clear(Test_PoolObject);
        expect(Test_PoolMgr.ins.getPoolObjectSize(Test_PoolObject)).toEqual(0);
    });
});
