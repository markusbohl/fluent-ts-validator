/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidationRule } from "./ValidationRule";
import { ValidationFailure } from "./ValidationFailure";
import { Severity } from "./Severity";
import { PropertyValidator } from "../validators/PropertyValidator";
import { RuleApplicationOutcome } from "./RuleApplicationOutcome";
import { ValidationCondition } from "./ValidationCondition";

describe("ValidationRule", () => {
    let rule: ValidationRule<TestClass, string>;
    let validator: PropertyValidator<string>;

    beforeEach(() => {
        validator = { isValid(input: string) { return true; } };
        rule = new ValidationRule((input: TestClass) => { return input.property; }, validator);
    });

    describe("apply()", () => {
        it("should invoke validator with result from lambda expression", () => {
            spyOn(validator, "isValid");

            let result = rule.apply(new TestClass("valid property value"));

            expect(validator.isValid).toHaveBeenCalledWith("valid property value");
        });

        it("should return successful validation outcome for valid input", () => {
            spyOn(validator, "isValid").and.returnValue(true);

            let result = rule.apply(new TestClass("valid property value"));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should return successful validation outcome when validation was performed due to specified validation condition", () => {
            spyOn(validator, "isValid");
            let validation: ValidationCondition<TestClass> = {
                shouldDoValidation(input: TestClass) { return false; }
            };
            rule.setCondition(validation);

            let result = rule.apply(new TestClass("some value"));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should return failure outcome for invalid input", () => {
            spyOn(validator, "isValid").and.returnValue(false);

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.isFailure()).toBeTruthy();
        });

        it("should provide details about the validation failure in case of invalid input", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            let toBeValidated = new TestClass("invalid property value");

            let failure = rule.apply(toBeValidated).getValidationFailure();

            expect(failure.target).toBe(toBeValidated);
            expect(failure.propertyName).toBe("property");
            expect(failure.attemptedValue).toBe("invalid property value");
            expect(failure.severity).toBe(Severity.ERROR);
        });

        it("should provide property name in validation failure in case of invalid input", () => {
            let validator: PropertyValidator<number> = { isValid(input: number) { return true; } };
            let rule: ValidationRule<TestClass, number> = new ValidationRule((input: TestClass) => { return input.leOtherProperty1; }, validator);
            let toBeValidated = new TestClass("invalid property value");
            spyOn(validator, "isValid").and.returnValue(false);

            let failure = rule.apply(toBeValidated).getValidationFailure();

            expect(failure.propertyName).toBe("leOtherProperty1");
        });

        it("should provide null for property name in case of 'flat' input", () => {
            let validator: PropertyValidator<number> = { isValid(input: number) { return true; } };
            let rule: ValidationRule<number, number> = new ValidationRule((input: number) => { return input; }, validator);
            spyOn(validator, "isValid").and.returnValue(false);

            let failure = rule.apply(42).getValidationFailure();

            expect(failure.propertyName).toBe(null);
        });
    });

    describe("onFailure()", () => {
        it("should invoke registered callback function in case of validation failure", () => {
            let callback = jasmine.createSpy("callback");
            let toBeValidated = new TestClass("invalid property value");
            spyOn(validator, "isValid").and.returnValue(false);
            rule.onFailure(callback);

            let result = rule.apply(toBeValidated);

            expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                target: toBeValidated,
                propertyName: "property",
                attemptedValue: "invalid property value",
                severity: Severity.ERROR
            }));
        });
    });

    describe("setErrorCode()", () => {
        it("should set errorCode for use in validation failure", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            rule.setErrorCode("error-code");

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.getValidationFailure().errorCode).toBe("error-code");
        });
    });

    describe("setErrorMessage()", () => {
        it("should set errorMessage for use in validation failure", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            rule.setErrorMessage("error-message");

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.getValidationFailure().errorMessage).toBe("error-message");
        });
    });

    describe("setSeverity()", () => {
        it("should set severity for use in validation failure", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            rule.setSeverity(Severity.INFO);

            let result = rule.apply(new TestClass("invalid property value"));

            expect(result.getValidationFailure().severity).toBe(Severity.INFO);
        });
    });

    describe("setCondition()", () => {
        it("should allow validation if no validation condition is set", () => {
            spyOn(validator, "isValid");
            rule.setCondition(null);

            rule.apply(new TestClass("some value"));

            expect(validator.isValid).toHaveBeenCalled();
        });

        it("should allow validation if validation condition evaluates to true", () => {
            spyOn(validator, "isValid");
            let validation: ValidationCondition<TestClass> = {
                shouldDoValidation(input: TestClass) { return true; }
            };
            rule.setCondition(validation);

            rule.apply(new TestClass("some value"));

            expect(validator.isValid).toHaveBeenCalled();
        });

        it("should not allow validation if validation condition evaluates to false", () => {
            spyOn(validator, "isValid");
            let validation: ValidationCondition<TestClass> = {
                shouldDoValidation(input: TestClass) { return false; }
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