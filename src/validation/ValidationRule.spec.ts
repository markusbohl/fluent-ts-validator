import {Severity} from "../shared";
import {PropertyValidator} from "../validators/PropertyValidator";
import {ValidationRule, ValidationCondition} from "./";

describe("ValidationRule", () => {
    let rule: ValidationRule<TestClass, string>;

    beforeEach(() => {
        rule = new ValidationRule((input: TestClass) => {
            return input.property;
        });
    });

    describe("addValidator()", () => {
        it("should set validator which is used for validation process", () => {
            let validator: PropertyValidator<string> = getPositiveValidator();
            spyOn(validator, "isValid");
            rule.addValidator(validator);

            rule.apply(new TestClass("property value"));

            expect(validator.isValid).toHaveBeenCalledWith("property value");
        });
    });

    describe("apply()", () => {
        it("should invoke validator with result from lambda expression", () => {
            let validator: PropertyValidator<string> = getNegativeValidator();
            spyOn(validator, "isValid");
            rule.addValidator(validator);

            let result = rule.apply(new TestClass("valid property value"));

            expect(validator.isValid).toHaveBeenCalledWith("valid property value");
        });

        it("should return successful validation outcome for valid input", () => {
            rule.addValidator(getPositiveValidator());

            let result = rule.apply(new TestClass("valid property value"));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should return successful validation outcome when validation was performed due to specified validation condition", () => {
            rule.addValidator(getPositiveValidator());
            let validation: ValidationCondition<TestClass> = {
                shouldDoValidation(input: TestClass) {
                    return false;
                }
            };
            rule.setCondition(validation);

            let result = rule.apply(new TestClass("some value"));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should return failure outcome for invalid input", () => {
            rule.addValidator(getNegativeValidator());

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.isFailure()).toBeTruthy();
        });

        it("should return true if all validators validate successfully", () => {
            rule.addValidator(getPositiveValidator());
            rule.addValidator(getPositiveValidator());
            rule.addValidator(getPositiveValidator());

            let result = rule.apply(new TestClass("valid value"));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should return false if at least one validator does not validate successfully", () => {
            rule.addValidator(getPositiveValidator());
            rule.addValidator(getPositiveValidator());
            rule.addValidator(getNegativeValidator());

            let result = rule.apply(new TestClass("invalid value"));

            expect(result.isFailure()).toBeTruthy();
        });

        it("should provide details about the validation failure in case of invalid input", () => {
            rule.addValidator(getNegativeValidator());
            let toBeValidated = new TestClass("invalid property value");

            let failure = rule.apply(toBeValidated).getValidationFailures()[0];

            expect(failure.target).toBe(toBeValidated);
            expect(failure.propertyName).toBe("property");
            expect(failure.message).toBe("property is invalid");
            expect(failure.attemptedValue).toBe("invalid property value");
            expect(failure.severity).toBe(Severity[Severity.ERROR]);
        });

        it("should provide property name in validation failure in case of invalid input", () => {
            let rule: ValidationRule<TestClass, number> = new ValidationRule((input: TestClass) => input.leOtherProperty1);
            let toBeValidated = new TestClass("invalid property value");
            rule.addValidator(getNegativeValidator());

            let failure = rule.apply(toBeValidated).getValidationFailures()[0];

            expect(failure.propertyName).toBe("leOtherProperty1");
        });

        it("should provide standard error message in validation failure if no specific message has been set", () => {
            let rule: ValidationRule<TestClass, number> = new ValidationRule((input: TestClass) => {
                return input.leOtherProperty1;
            });
            let toBeValidated = new TestClass("invalid property value");
            rule.addValidator(getNegativeValidator());

            let failure = rule.apply(toBeValidated).getValidationFailures()[0];

            expect(failure.message).toBe("leOtherProperty1 is invalid");
        });

        it("should provide given provide property name in validation failure in case of invalid input", () => {
            let rule: ValidationRule<TestClass, number> = new ValidationRule((input: TestClass) => input.leOtherProperty1);
            let toBeValidated = new TestClass("invalid property value");
            rule.addValidator(getNegativeValidator());
            rule.setPropertyName("you know what I'm talking about");

            let failure = rule.apply(toBeValidated).getValidationFailures()[0];

            expect(failure.propertyName).toBe("you know what I'm talking about");
        });

        it("should provide undefined for property name in case of 'flat' input", () => {
            let rule: ValidationRule<number, number> = new ValidationRule((input: number) => {
                return input;
            });
            rule.addValidator(getNegativeValidator());

            let failure = rule.apply(42).getValidationFailures()[0];

            expect(failure.propertyName).toBe(undefined);
        });
    });

    describe("onFailure()", () => {
        it("should invoke registered callback function in case of validation failure", () => {
            let callback = jasmine.createSpy("callback");
            let toBeValidated = new TestClass("invalid property value");
            rule.addValidator(getNegativeValidator());
            rule.onFailure(callback);

            let result = rule.apply(toBeValidated);

            expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                target: toBeValidated,
                propertyName: "property",
                attemptedValue: "invalid property value",
                severity: Severity[Severity.ERROR]
            }));
        });
    });

    describe("setErrorCode()", () => {
        it("should set code for use in validation failure", () => {
            rule.addValidator(getNegativeValidator());
            rule.setErrorCode("error-code");

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.getValidationFailures()[0].code).toBe("error-code");
        });
    });

    describe("setErrorMessage()", () => {
        it("should set message for use in validation failure", () => {
            rule.addValidator(getNegativeValidator());
            rule.setErrorMessage("error-message");

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.getValidationFailures()[0].message).toBe("error-message");
        });
    });

    describe("setSeverity()", () => {
        it("should set severity for use in validation failure", () => {
            rule.addValidator(getNegativeValidator());
            rule.setSeverity(Severity.INFO);

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.getValidationFailures()[0].severity).toBe(Severity[Severity.INFO]);
        });
    });

    describe("setCondition()", () => {
        it("should allow validation if no validation condition is set", () => {
            let validator: PropertyValidator<string> = getPositiveValidator();
            spyOn(validator, "isValid");
            rule.addValidator(validator);
            rule.setCondition(null);

            rule.apply(new TestClass("some value"));

            expect(validator.isValid).toHaveBeenCalled();
        });

        it("should allow validation if validation condition evaluates to true", () => {
            let validator: PropertyValidator<string> = getPositiveValidator();
            spyOn(validator, "isValid");
            rule.addValidator(validator);
            let condition: ValidationCondition<TestClass> = {
                shouldDoValidation(input: TestClass) {
                    return true;
                }
            };
            rule.setCondition(condition);

            rule.apply(new TestClass("some value"));

            expect(validator.isValid).toHaveBeenCalled();
        });

        it("should not allow validation if validation condition evaluates to false", () => {
            let validator: PropertyValidator<string> = getPositiveValidator();
            spyOn(validator, "isValid");
            rule.addValidator(validator);
            let validation: ValidationCondition<TestClass> = {
                shouldDoValidation(input: TestClass) {
                    return false;
                }
            };
            rule.setCondition(validation);

            rule.apply(new TestClass("some value"));

            expect(validator.isValid).not.toHaveBeenCalled();
        });
    });
});

class TestClass {
    readonly property: string;
    readonly leOtherProperty1: number = 0;

    constructor(property: string) {
        this.property = property;
    }
}

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