import {WhenNotEmptyCondition} from "./WhenNotEmptyCondition";

describe("WhenNotEmptyCondition", () => {
    let condition: WhenNotEmptyCondition<TestClass>;
    let testObject: TestClass;

    beforeEach(() => {
        condition = new WhenNotEmptyCondition((t: TestClass) => t.property);
        testObject = new TestClass();
    });

    describe("shouldDoValidation()", () => {
        it("should return true when property has a non empty value", () => {
            testObject.property = "not an empty value";

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(true);
        });

        it("should return false when property has an empty value", () => {
            testObject.property = "";

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });

        it("should return false when property has a null value", () => {
            testObject.property = null;

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });

        it("should return false when property is undefined", () => {
            testObject.property = undefined;

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });
    });
});

class TestClass {
    property: string;
}
