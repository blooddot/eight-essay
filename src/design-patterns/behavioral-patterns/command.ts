/**
 * @author 雪糕
 * @description 命令模式
 */

/**
 * @interface 命令接口定义
 */
interface ICommand {
    execute(isRedo: boolean): void;
    unExecute?(): void;
    destroy?(): void;
}

/**
 * @abstract 命令抽象类
 */
export abstract class Command implements ICommand {
    protected _executed: boolean;
    public constructor(..._: unknown[]) {
        //
    }

    /** 执行命令-外部调用 */
    public execute(isRedo: boolean): void {
        if (this._executed) return;

        this._executed = true;
        this.onExecute(isRedo);
    }

    /** 当执行命令-内部实现 */
    protected abstract onExecute(isRedo: boolean): void;

    /** 撤销命令-外部调用 */
    public unExecute(): void {
        if (!this._executed) return;

        this._executed = false;
        this.onUnExecute();
    }

    /** 当撤销命令-内部实现 */
    protected abstract onUnExecute(): void;

    /** 销毁 */
    public destroy(): void {
        //
    }
}

type TCommandConstructor = [new (...param: unknown[]) => ICommand, ...unknown[]] | (new (...param: unknown[]) => ICommand);

const createCmdQueue = (...cmdCtorQueue: TCommandConstructor[]): ICommand[] => {
    return cmdCtorQueue.map(cmdCtor => {
        if (Array.isArray(cmdCtor)) {
            const [C, ...param] = cmdCtor;
            return new C(...param);
        }

        const C = cmdCtor;
        return new C();
    });
};

/** 
 * @Description 复合型命令 里面有多条命令 可以用在多选什么批量命令上
 */
export class MultipleCommand extends Command {

    protected _cmdQueue: ICommand[];

    public constructor(...cmdCtorQueue: TCommandConstructor[]) {
        super();
        this._cmdQueue = createCmdQueue(...cmdCtorQueue);
    }

    protected onExecute(isRedo: boolean): void {
        if (!this._cmdQueue || this._cmdQueue.length <= 0) return;

        this._cmdQueue.forEach(cmd => cmd.execute(isRedo));
    }

    protected onUnExecute(): void {
        if (!this._cmdQueue || this._cmdQueue.length <= 0) return;

        //反向撤销
        this._cmdQueue.reverse().forEach(cmd => cmd.unExecute());
    }

    /**初始添加子命令 一旦开始执行或者撤销就不允许再添加命令 否则会错乱*/
    public addCmd(...cmdCtorQueue: TCommandConstructor[]): void {
        const cmdQueue = createCmdQueue(...cmdCtorQueue);
        this._cmdQueue = { ...this._cmdQueue, ...cmdQueue };
    }
}

/**
 * @abstract 复杂命令抽象类（通过Receiver执行逻辑）
 */
export abstract class ComplexCommand implements ICommand {
    protected _executeReceiver: Receiver;
    public constructor(C: new () => Receiver, ..._: unknown[]) {
        this._executeReceiver = new C();
    }

    public abstract execute(isRedo: boolean): void;

    public abstract unExecute(): void;
}

/**
 * @abstract 命令执行者抽象类
 */
export abstract class Receiver {
    public abstract action(...param: unknown[]): void;
}

/**
 * 命令管理者
 */
export class Invoker {
    private _pendingCmdQueue: ICommand[];  //预处理命令队列
    private _executedCmdDeque: ICommand[];   //已执行命令双端队列
    private _undoCmdStack: ICommand[];   //撤销命令栈
    private _maxCmdSize: number;    //记录命令最大数 小于等于0为无限

    public constructor(maxCmdSize: number = 0) {
        this._maxCmdSize = maxCmdSize;
        this._pendingCmdQueue = [];
        this._executedCmdDeque = [];
        this._undoCmdStack = [];
    }

    /** 添加预处理命令 */
    public addPendingCmd(...cmdCtorQueue: TCommandConstructor[]): void {
        if (!cmdCtorQueue || cmdCtorQueue.length <= 0) return;

        const cmdQueue = createCmdQueue(...cmdCtorQueue);
        this._pendingCmdQueue = [...this._pendingCmdQueue, ...cmdQueue];
    }

    /** 执行预处理命令队列 */
    public executePendingCmdQueue(): void {
        if (!this._pendingCmdQueue || this._pendingCmdQueue.length <= 0) return;

        this._pendingCmdQueue.forEach(cmd => this.executeCmdInstance(cmd));
        this._pendingCmdQueue.length = 0;
    }

    /** 执行命令 */
    public executeCmd(...cmdCtorQueue: TCommandConstructor[]): void {
        if (!cmdCtorQueue || cmdCtorQueue.length <= 0) return;

        createCmdQueue(...cmdCtorQueue).forEach(cmd => this.executeCmdInstance(cmd));
    }

    /** 执行指定命令实例 */
    private executeCmdInstance(cmd: ICommand): void {
        this._executedCmdDeque.push(cmd);
        if (this._maxCmdSize > 0 && this._executedCmdDeque.length > this._maxCmdSize) {
            const element = this._executedCmdDeque.shift();
            element.destroy();
        }

        this._undoCmdStack.length = 0;  //执行新命令，清空撤销栈

        cmd.execute(false);
    }

    /** 撤销命令 */
    public undoCmd(): void {
        if (!this.checkCanUndo()) return;

        const cmd = this._executedCmdDeque.pop();
        this._undoCmdStack.push(cmd);
        cmd?.unExecute();
    }

    /** 重做命令 */
    public redoCmd(): void {
        if (!this.checkCanRedo()) return;

        const cmd = this._undoCmdStack.pop();
        this._executedCmdDeque.push(cmd);
        cmd.execute(true);
    }

    /** 检查是否可以重做 */
    public checkCanRedo(): boolean {
        return this._undoCmdStack?.length > 0;
    }

    /** 检查是否可以撤销 */
    public checkCanUndo(): boolean {
        return this._executedCmdDeque?.length > 0;
    }
}