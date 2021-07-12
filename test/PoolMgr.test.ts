import logger from "../core/logger";
import PoolMgr, { IPoolObject } from "../design-patterns/PoolMgr";

/**
 * @author 雪糕
 * @description
 */
class PoolObject implements IPoolObject {
    public inited = false;
    public param1: number;
    public paramA: string;

    onAcquire(param1: number, paramA: string): void {
        this.inited = true;
        this.param1 = param1;
        this.paramA = paramA;
    }

    onRelease(..._: unknown[]): void {
        this.inited = false;
        this.param1 = null;
        this.paramA = null;
    }

}
const obj = PoolMgr.ins.acquire(PoolObject, '', 1, 'a');
logger.trace(`PoolObject.name:${PoolObject.name} obj.constructor.name:${obj.constructor.name}`);
logger.trace(`acquire obj inited:${obj.inited} param1:${obj.param1} paramA:${obj.paramA}`);
PoolMgr.ins.release(obj);
logger.trace(`release obj inited:${obj.inited} param1:${obj.param1} paramA:${obj.paramA}`);