import { Command, ComplexCommand, Invoker, MultipleCommand, Receiver } from "../../../src/design-patterns/behavioral-patterns/command";
import singleton from "../../../src/design-patterns/creational-patterns/singleton";

/** 计算器数据 */
class CalculateModel extends singleton<CalculateModel>() {
    public num: number = 0;
}

/** 
 * @abstract 计算器命令抽象类
 */
abstract class CalculateCmd extends Command {
    protected _preNumber: number;

    protected _numbers: number[];
    public get model(): CalculateModel {
        return CalculateModel.ins;
    }

    public constructor(...numbers: number[]) {
        super();
        this._numbers = numbers;
    }

    protected onExecute(_: boolean): void {
        this._preNumber = this.model.num;
    }

    protected onUnExecute(): void {
        this.model.num = this._preNumber;
    }
}

/** 清除 */
class AllClearCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);
        this.model.num = 0;
    }
}

/** 赋值 */
class AssignCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        if (this._numbers.length > 0) {
            this.model.num = this._numbers[this._numbers.length - 1];
        }
    }
}

/** 加法 */
class AddCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this._numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue + currentValue;
        }, this.model.num);
    }
}

/** 减法 */
class SubtractCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this._numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue - currentValue;
        }, this.model.num);
    }
}

/** 乘法 */
class MultiplyCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this._numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue * currentValue;
        }, this.model.num);
    }
}

/** 除法 */
class DivideCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this._numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue / currentValue;
        }, this.model.num);
    }
}

/** 开平方根 */
class SqrtCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = Math.sqrt(this.model.num);
    }
}

/** 乘方  */
class PowCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this._numbers.reduce((previousValue: number, currentValue: number) => {
            return Math.pow(previousValue, currentValue);
        }, this.model.num);
    }
}

/** 圆的面积 */
class CircleAreaCmd extends MultipleCommand {
    public get model(): CalculateModel {
        return CalculateModel.ins;
    }

    public constructor(r: number) {
        super(
            [AssignCmd, r],
            [MultiplyCmd, 2],
            [PowCmd, 2]
        );
    }
}

/** 勾股定理最长边 */
class PythagoreanLongSideCmd extends ComplexCommand {
    protected _executeReceiver: PythagoreanLongSideReceiver;
    protected _preNumber: number;
    protected _numbers: number[];

    public constructor(C: new () => PythagoreanLongSideReceiver, ...numbers: number[]) {
        super(C);
        this._numbers = numbers;
    }
    public execute(isRedo: boolean): void {
        this._preNumber = this._executeReceiver.model.num;
        this._executeReceiver.action(...this._numbers);
    }

    public unExecute(): void {
        this._executeReceiver.model.num = this._preNumber;
    }
}

/** 勾股定理最长边执行者 */
class PythagoreanLongSideReceiver extends Receiver {
    public get model(): CalculateModel {
        return CalculateModel.ins;
    }

    public action(...numbers: number[]): void {
        if (!numbers || numbers.length <= 0) return;

        this.model.num = Math.sqrt(numbers.reduce((previousValue: number, currentValue: number) => previousValue + Math.pow(currentValue, 2), 0));
    }

}

describe('command UNIT', () => {
    const invoker = new Invoker();
    const model = CalculateModel.ins;
    const originalNum = model.num = 0;
    const calNum = 2;

    test('add command', () => {
        const result = originalNum + calNum;

        invoker.executeCmd(AllClearCmd, [AddCmd, calNum]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('subtract command', () => {
        const result = originalNum - calNum;

        invoker.executeCmd(AllClearCmd, [SubtractCmd, calNum]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);

        invoker.redoCmd();
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('multiply command', () => {
        const assignNum = 10;
        const result = assignNum * calNum;

        invoker.addPendingCmd([AssignCmd, assignNum], [MultiplyCmd, calNum]);
        invoker.executePendingCmdQueue();

        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(assignNum);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('divide command', () => {
        const assignNum = 10;
        const result = assignNum / calNum;

        invoker.executeCmd([AssignCmd, assignNum], [DivideCmd, calNum]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(assignNum);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('sqrt command', () => {
        const assignNum = 10;
        const result = Math.sqrt(assignNum);

        invoker.executeCmd([AssignCmd, assignNum], SqrtCmd);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(assignNum);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('circle area command', () => {
        const radius = 10;
        const result = Math.pow(2 * radius, 2);

        invoker.executeCmd([CircleAreaCmd, radius]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('pythagorean theorem long side command', () => {
        const sideA = 3;
        const sideB = 4;
        const result = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));

        invoker.executeCmd([PythagoreanLongSideCmd, PythagoreanLongSideReceiver, sideA, sideB]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });
});