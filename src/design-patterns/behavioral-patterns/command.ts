/**
 * @author 雪糕
 * @description 命令模式
 */

abstract class Command {
    private _executed: boolean;
    protected constructor(..._: unknown[]) {
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

class Invoker {
    private _executedCmdDeque: Command[];   //已执行命令双端队列
    private _undoCmdStack: Command[];   //撤销命令栈
    private _maxCmdSize: number;    //记录命令最大数

    public constructor(maxCmdSize: number) {
        this._maxCmdSize = maxCmdSize;
        this._executedCmdDeque = [];
        this._undoCmdStack = [];
    }

    /** 执行命令 */
    public executeCmd<T extends Command>(C: new (...param: unknown[]) => T, ...param: unknown[]): void {
        if (!C) return;

        const cmd = new C(...param);
        this._executedCmdDeque.push(cmd);
        if (this._executedCmdDeque.length > this._maxCmdSize) {
            const element = this._executedCmdDeque.shift();
            element.destroy();
        }

        this.clearUndoCmdStack();  //执行新命令，清空撤销栈

        cmd.execute(false);
    }

    /** 撤销命令 */
    public undoCmd(): void {
        if (this._executedCmdDeque.length <= 0) return;

        const cmd = this._executedCmdDeque.pop();
        this._undoCmdStack.push(cmd);
        cmd.unExecute();
    }

    /** 重做命令 */
    public redoCmd(): void {
        if (this._undoCmdStack.length <= 0) return;

        const cmd = this._undoCmdStack.pop();
        this._executedCmdDeque.push(cmd);
        cmd.execute(true);
    }

    private clearUndoCmdStack(): void {
        this._undoCmdStack.length = 0;
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