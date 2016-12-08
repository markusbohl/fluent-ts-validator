/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidationOptionsBuilder } from "./ValidationOptionsBuilder";
import { ValidationOptionsBuilderImpl } from "./ValidationOptionsBuilderImpl";
import { ValidationCondition } from "../validation/ValidationCondition";
import { WhenCondition } from "../validation/WhenCondition";
import { UnlessCondition } from "../validation/UnlessCondition";
import { ValidationFailure } from "../validation/ValidationFailure";
import { ValidationRule } from "../validation/ValidationRule";
import { Severity } from "../validation/Severity";

describe("ValidationOptionsBuilderImpl", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validationOptionsBuilder: ValidationOptionsBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        validationOptionsBuilder = new ValidationOptionsBuilderImpl(validationRule);
    });

    describe("withErrorCode()", () => {
        it("should set error code to validation rule", () => {
            spyOn(validationRule, "setErrorCode");

            validationOptionsBuilder.withErrorCode("error-code");

            expect(validationRule.setErrorCode).toHaveBeenCalledWith("error-code");
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withErrorCode("error-code");

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("withErrorMessage()", () => {
        it("should set error message to validation rule", () => {
            spyOn(validationRule, "setErrorMessage");

            validationOptionsBuilder.withErrorMessage("error-message");

            expect(validationRule.setErrorMessage).toHaveBeenCalledWith("error-message");
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withErrorMessage("error-message");

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("withSeverity()", () => {
        it("should set severity to validation rule", () => {
            spyOn(validationRule, "setSeverity");

            validationOptionsBuilder.withSeverity(Severity.WARNING);

            expect(validationRule.setSeverity).toHaveBeenCalledWith(Severity.WARNING);
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withSeverity(Severity.WARNING);

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("when()", () => {
        it("should set a WhenCondition to the validation rule", () => {
            spyOn(validationRule, "setCondition");
            validationOptionsBuilder.when((input: TestClass) => { return true; });

            expect(validationRule.setCondition).toHaveBeenCalledWith(jasmine.any(WhenCondition));
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.when((input: TestClass) => { return true; });

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("unless()", () => {
        it("should set a UnlessCondition to the validation rule", () => {
            spyOn(validationRule, "setCondition");
            validationOptionsBuilder.unless((input: TestClass) => { return true; });

            expect(validationRule.setCondition).toHaveBeenCalledWith(jasmine.any(UnlessCondition));
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.unless((input: TestClass) => { return true; });

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("onFailure()", () => {
        it("should set on-failure-callback to validation rule", () => {
            spyOn(validationRule, "onFailure");
            let callback = (failure: ValidationFailure) => { };

            validationOptionsBuilder.onFailure(callback);

            expect(validationRule.onFailure).toHaveBeenCalledWith(callback);
        });

        it("should return current builder instance", () => {
            let callback = (failure: ValidationFailure) => { };

            let result = validationOptionsBuilder.onFailure(callback);

            expect(result).toBe(validationOptionsBuilder);
        });
    });
});

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}