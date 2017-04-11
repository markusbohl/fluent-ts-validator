import {CollectionValidationRule, ValidationCondition} from "./";
import {Severity} from "../shared";
import {PropertyValidator} from "../validators/PropertyValidator";


class TestClass {
    readonly array: string[];
    readonly set: Set<number>;

    constructor(array?: string[], set?: Set<number>) {
        this.array = array;
        this.set = set;
    }
}

describe("CollectionValidationRule", () => {
    let testClass: TestClass;

    beforeEach(() => {
        testClass = new TestClass(["foo", "bar"], new Set([1, 2, 3]));
    });

    describe("tests with an array", () => {
        let validationRule: CollectionValidationRule<TestClass, string[]>;

        beforeEach(() => {
            validationRule = new CollectionValidationRule<TestClass, string[]>((input: TestClass) => {
                return input.array;
            });
        });

        describe("apply()", () => {
            it("should validate every element of the array", () => {
                let validator = getPositiveValidator();
                spyOn(validator, "isValid");
                validationRule.addValidator(validator);

                validationRule.apply(testClass);

                expect(validator.isValid).toHaveBeenCalledWith("foo");
                expect(validator.isValid).toHaveBeenCalledWith("bar");
            });

            it("should return a postive outcome if every element is valid", () => {
                validationRule.addValidator(getPositiveValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeTruthy();
            });

            it("should return a negative outcome if element are invalid", () => {
                validationRule.addValidator(getNegativeValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeFalsy();
            });

            it("should return a positive outcome if every element is validated successfully with every validator", () => {
                validationRule.addValidator(getPositiveValidator());
                validationRule.addValidator(getPositiveValidator());
                validationRule.addValidator(getPositiveValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeTruthy();
            });

            it("should return a negative outcome if not all validators validate successfully - test 1", () => {
                validationRule.addValidator(getPositiveValidator());
                validationRule.addValidator(getPositiveValidator());
                validationRule.addValidator(getNegativeValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeFalsy();
            });

            it("should return a negative outcome if not all validators validate successfully - test 2", () => {
                validationRule.addValidator(getNegativeValidator());
                validationRule.addValidator(getPositiveValidator());
                validationRule.addValidator(getPositiveValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeFalsy();
            });

            it("should return a negative outcome with detailed validation failures if element are invalid", () => {
                validationRule.addValidator(getNegativeValidator());

                let result = validationRule.apply(testClass);

                expect(result.getValidationFailures()[0]).toEqual(jasmine.objectContaining({
                    target: testClass,
                    propertyName: "array",
                    attemptedValue: "foo",
                    severity: Severity[Severity.ERROR]
                }));
                expect(result.getValidationFailures()[1]).toEqual(jasmine.objectContaining({
                    target: testClass,
                    propertyName: "array",
                    attemptedValue: "bar",
                    severity: Severity[Severity.ERROR]
                }));
            });

            it("should invoke callbacks in case of failures", () => {
                let callback = jasmine.createSpy("callback");
                validationRule.onFailure(callback);
                validationRule.addValidator(getNegativeValidator());

                validationRule.apply(testClass);

                expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                    target: testClass,
                    propertyName: "array",
                    attemptedValue: "foo",
                    severity: Severity[Severity.ERROR]
                }));
                expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                    target: testClass,
                    propertyName: "array",
                    attemptedValue: "bar",
                    severity: Severity[Severity.ERROR]
                }));
            });

            it("should not invoke validator if specified condition omits validation", () => {
                let validator = getNegativeValidator();
                spyOn(validator, "isValid").and.callThrough();
                validationRule.addValidator(validator);
                validationRule.setCondition(getNegativeCondition());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeTruthy();
                expect(validator.isValid).not.toHaveBeenCalled();
            });

            it("should invoke validator if specified condition does not omits validation", () => {
                let validator = getNegativeValidator();
                spyOn(validator, "isValid").and.callThrough();
                validationRule.addValidator(validator);
                validationRule.setCondition(getPositiveCondition());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeFalsy();
                expect(validator.isValid).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe("tests with a set", () => {
        let validationRule: CollectionValidationRule<TestClass, Set<number>>;

        beforeEach(() => {
            validationRule = new CollectionValidationRule<TestClass, Set<number>>((input: TestClass) => {
                return input.set;
            });
        });

        describe("apply()", () => {
            it("should validate every element of the array", () => {
                let validator = getPositiveValidator();
                spyOn(validator, "isValid");
                validationRule.addValidator(validator);

                validationRule.apply(testClass);

                expect(validator.isValid).toHaveBeenCalledWith(1);
                expect(validator.isValid).toHaveBeenCalledWith(2);
                expect(validator.isValid).toHaveBeenCalledWith(3);
            });

            it("should return a postive outcome if every element is valid", () => {
                validationRule.addValidator(getPositiveValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeTruthy();
            });

            it("should return a negative outcome if element are invalid", () => {
                validationRule.addValidator(getNegativeValidator());

                let result = validationRule.apply(testClass);

                expect(result.isSuccess()).toBeFalsy();
            });
        });
    });

    describe("tests with null and undefined", () => {
        it("should not throw exception if array is undefined", () => {
            const validationRule = new CollectionValidationRule<TestClass, string[]>((input: TestClass) => {
                return input.array;
            });

            try {
                const result = validationRule.apply(new TestClass());
                expect(result.isFailure()).toBe(false);
            } catch (e) {
                fail(e);
            }
        });

        it("should not throw exception if array is null", () => {
            const validationRule = new CollectionValidationRule<TestClass, string[]>((input: TestClass) => {
                return input.array;
            });

            try {
                const result = validationRule.apply(new TestClass(null));
                expect(result.isFailure()).toBe(false);
            } catch (e) {
                fail(e);
            }
        });
    });
});


function getPositiveValidator<T>(): PropertyValidator<T> {
    return {
        isValid(input: T) {
            return true;
        }
    };
}

function getNegativeValidator<T>(): PropertyValidator<T> {
    return {
        isValid(input: T) {
            return false;
        }
    };
}

function getNegativeCondition<T>(): ValidationCondition<T> {
    return {
        shouldDoValidation(input: T) {
            return false;
        }
    };
}

function getPositiveCondition<T>(): ValidationCondition<T> {
    return {
        shouldDoValidation(input: T) {
            return true;
        }
    };
}