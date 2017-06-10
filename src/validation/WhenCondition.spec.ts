import {WhenCondition} from "./WhenCondition";

describe("WhenCondition", () => {
    describe("shouldDoValidation()", () => {
        it("should return true if given expression evaluates to true", () => {
            let condition = new WhenCondition<TestClass>((input: TestClass) => input.property != null);

            expect(condition.shouldDoValidation(new TestClass("to-be-validated"))).toBeTruthy();
        });

        it("should return false if given expression evaluates to false", () => {
            let condition = new WhenCondition<TestClass>((input: TestClass) => input.property != null);

            expect(condition.shouldDoValidation(new TestClass())).toBeFalsy();
        });
    });
});

class TestClass {
    readonly property: string | undefined;

    constructor(property?: string) {
        this.property = property;
    }
}
