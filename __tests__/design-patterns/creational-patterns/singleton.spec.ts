import singleton, { Singleton } from "../../../src/design-patterns/creational-patterns/singleton";

class Test_SingletonFn extends singleton<Test_SingletonFn>() { }

class Test_Singleton extends Singleton { }

describe('singleton UNIT', () => {

    test('singleton function', () => {
        const s1 = Test_SingletonFn.ins;
        const s2 = Test_SingletonFn.ins;
        expect(s1).toBe(s2);
    });

    test('Singleton class', () => {
        const s1 = Test_Singleton.getInstance();
        const s2 = Test_Singleton.getInstance();
        expect(s1).toBe(s2);
    });
});