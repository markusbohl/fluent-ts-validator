import {WhenNotEmptyCondition} from "./WhenNotEmptyCondition";

describe("WhenNotEmptyCondition", () => {
    let condition: WhenNotEmptyCondition<TestClass>;
    let testObject: TestClass;

    describe("shouldDoValidation()", () => {
        beforeEach(() => {
            condition = new WhenNotEmptyCondition((t: TestClass) => t.property);
            testObject = new TestClass();
        });

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

    describe("shouldDoValidation() - Iterables", () => {
        beforeEach(() => {
            condition = new WhenNotEmptyCondition((t: TestClass) => t.anArray);
            testObject = new TestClass();
        });

        it("should return false when anArray is undefined", () => {
            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });

        it("should return false when anArray is null", () => {
            testObject.anArray = null;

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });

        it("should return false when anArray is empty", () => {
            testObject.anArray = [];

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });

        it("should return true when anArray is not empty", () => {
            testObject.anArray = [1, 2, 3];

            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(true);
        });
    });

    describe("shouldDoValidation() - exception handling", () => {
        beforeEach(() => {
            condition = new WhenNotEmptyCondition((t: TestClass) => t.inner.property);
            testObject = new TestClass();
        });

        it("should return false and stay calm in case exception is thrown during lambda expression execution", () => {
            const result = condition.shouldDoValidation(testObject);

            expect(result).toBe(false);
        });
    });
});

class TestClass {
    property: string;
    anArray: number[];
    inner: InnerClass;
}

class InnerClass {
    property: string;
}
