/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidationRule } from "./ValidationRule";
import { ValidationFailure } from "./ValidationFailure";
import { Severity } from "./Severity";
import { PropertyValidator } from "../validators/PropertyValidator";
import { RuleApplicationOutcome } from "./RuleApplicationOutcome";

describe("ValidationRule", () => {
    let rule: ValidationRule<ToBeValidated, string>;
    let validator: PropertyValidator<string>;

    beforeEach(() => {
        validator = new PropertyValidator();
        rule = new ValidationRule((input: ToBeValidated) => { return input.property; }, validator);
    });

    describe("apply()", () => {
        it("should invoke validator with result from lambda expression", () => {
            validator = jasmine.createSpyObj("validator", ["isValid"]);
            rule = new ValidationRule((input: ToBeValidated) => { return input.property; }, validator);

            let result = rule.apply(new ToBeValidated("valid property value"));

            expect(validator.isValid).toHaveBeenCalledWith("valid property value");
        });

        it("should return successful validation outcome for valid input", () => {
            spyOn(validator, "isValid").and.returnValue(true);

            let result = rule.apply(new ToBeValidated("valid property value"));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should return failure outcome for invalid input", () => {
            spyOn(validator, "isValid").and.returnValue(false);

            let result = rule.apply(new ToBeValidated("invalid property value"));

            expect(result.isFailure()).toBeTruthy();
        });

        it("should provide details about the validation failure in case of invalid input", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            let toBeValidated = new ToBeValidated("invalid property value");

            let failure = rule.apply(toBeValidated).getValidationFailure();

            expect(failure.target).toBe(toBeValidated);
            expect(failure.attemptedValue).toBe("invalid property value");
            expect(failure.severity).toBe(Severity.ERROR);
        });
    });

    describe("onFailure()", () => {
        it("should invoke registered callback function in case of validation failure", () => {
            let callback = jasmine.createSpy("callback");
            let toBeValidated = new ToBeValidated("invalid property value");
            spyOn(validator, "isValid").and.returnValue(false);
            rule.onFailure(callback);

            let result = rule.apply(toBeValidated);

            expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                target: toBeValidated
            }));
        });
    });

    describe("setErrorCode()", () => {
        it("should set errorCode for use in validation failure", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            rule.setErrorCode("error-code");

            let result = rule.apply(new ToBeValidated("invalid property value"));

            expect(result.getValidationFailure().errorCode).toBe("error-code");
        });
    });

    describe("setErrorMessage()", () => {
        it("should set errorMessage for use in validation failure", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            rule.setErrorMessage("error-message");

            let result = rule.apply(new ToBeValidated("invalid property value"));

            expect(result.getValidationFailure().errorMessage).toBe("error-message");
        });
    });

    describe("setSeverity()", () => {
        it("should set severity for use in validation failure", () => {
            spyOn(validator, "isValid").and.returnValue(false);
            rule.setSeverity(Severity.INFO);

            let result = rule.apply(new ToBeValidated("invalid property value"));

            expect(result.getValidationFailure().severity).toBe(Severity.INFO);
        });
    });
});

class ToBeValidated {
    readonly property: string;

    constructor(property: string) {
        this.property = property;
    }
}