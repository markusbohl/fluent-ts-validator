/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    Severity,
    ValidationFailure
} from "../shared";

import {
    ValidationRule,
    ValidationCondition,
    UnlessCondition,
    WhenCondition
} from "../validation";

import {
    ValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

describe("ValidationOptionsBuilderImpl", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validationOptionsBuilder: ValidationOptionsBuilder<TestClass>;
    let validatorBuilder: ValidatorBuilder<TestClass, string>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        validatorBuilder = new ValidatorBuilder(validationRule);
    });

    describe("withErrorCode()", () => {
        it("should set error code to validation rule", () => {
            spyOn(validationRule, "setErrorCode");

            validatorBuilder.withErrorCode("error-code");

            expect(validationRule.setErrorCode).toHaveBeenCalledWith("error-code");
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.withErrorCode("error-code");

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("withErrorMessage()", () => {
        it("should set error message to validation rule", () => {
            spyOn(validationRule, "setErrorMessage");

            validatorBuilder.withErrorMessage("error-message");

            expect(validationRule.setErrorMessage).toHaveBeenCalledWith("error-message");
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.withErrorMessage("error-message");

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("withName", () => {
        it("should set (property) name to validation rule", () => {
            spyOn(validationRule, "setPropertyName");

            validatorBuilder.withName("A better property name");

            expect(validationRule.setPropertyName).toHaveBeenCalledWith("A better property name");
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.withName("A better property name");

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("withSeverity()", () => {
        it("should set severity to validation rule", () => {
            spyOn(validationRule, "setSeverity");

            validatorBuilder.withSeverity(Severity.WARNING);

            expect(validationRule.setSeverity).toHaveBeenCalledWith(Severity.WARNING);
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.withSeverity(Severity.WARNING);

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("when()", () => {
        it("should set a WhenCondition to the validation rule", () => {
            spyOn(validationRule, "setCondition");
            validatorBuilder.when((input: TestClass) => { return true; });

            expect(validationRule.setCondition).toHaveBeenCalledWith(jasmine.any(WhenCondition));
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.when((input: TestClass) => { return true; });

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("unless()", () => {
        it("should set a UnlessCondition to the validation rule", () => {
            spyOn(validationRule, "setCondition");

            validatorBuilder.unless((input: TestClass) => { return true; });

            expect(validationRule.setCondition).toHaveBeenCalledWith(jasmine.any(UnlessCondition));
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.unless((input: TestClass) => { return true; });

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("onFailure()", () => {
        it("should set on-failure-callback to validation rule", () => {
            spyOn(validationRule, "onFailure");
            let callback = (failure: ValidationFailure) => { };

            validatorBuilder.onFailure(callback);

            expect(validationRule.onFailure).toHaveBeenCalledWith(callback);
        });

        it("should return current builder instance", () => {
            let callback = (failure: ValidationFailure) => { };

            let result = validatorBuilder.onFailure(callback);

            expect(result).toBe(validatorBuilder);
        });
    });
});

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}