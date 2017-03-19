import { ValidationCondition } from "./ValidationCondition";
import { UnlessCondition } from "./UnlessCondition";

describe("UnlessCondition", () => {
    describe("shouldDoValidation", () => {
        it("should return false if given expression evaluates to true", () => {
            let condition = new UnlessCondition<TestClass>((input: TestClass) => input.property === null);

            expect(condition.shouldDoValidation(new TestClass(null))).toBeFalsy();
        });

        it("should return true if given expression evaluates to false", () => {
            let condition = new UnlessCondition<TestClass>((input: TestClass) => input.property === null);

            expect(condition.shouldDoValidation(new TestClass("to-be-validated"))).toBeTruthy();
        });
    });
});

class TestClass {
    readonly property: string;

    constructor(property: string) {
        this.property = property;
    }
}