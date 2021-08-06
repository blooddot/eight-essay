import PoolMgr, { IPoolObject, IPoolObjectConstructor } from "@/design-patterns/game-patterns/pool";

class Test_PoolMgr extends PoolMgr {
    public getPoolObjectSize<T extends IPoolObject>(C: IPoolObjectConstructor<T>, keyPrefix?: string): number {
        const poolKey = this.getPoolKey(C, keyPrefix);
        const poolData = this.poolMap.get(poolKey);
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
    public static className = "Test_PoolObject";
    public poolKey: string;
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

describe('pool UNIT', () => {
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
        Test_PoolMgr.ins.clear(Test_PoolObject.className);
        expect(Test_PoolMgr.ins.getPoolObjectSize(Test_PoolObject)).toEqual(0);
    });
});
