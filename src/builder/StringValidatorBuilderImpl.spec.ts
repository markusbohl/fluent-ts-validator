/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsBooleanStringValidator,
    IsDateStringValidator,
    IsNumericStringValidator,
    IsAlphaValidator,
    IsAlphanumericValidator
} from "../validators/string-based";

import {
    ValidatorBuilder,
    StringValidatorBuilder
} from "./";

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

describe("ValidatorBuilder -> StringValidatorBuilder implementation", () => {
    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: StringValidatorBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator");
        validatorBuilder = new ValidatorBuilder(validationRule);
    });

    describe("isBooleanString()", () => {
        it("should set IsBooleanStringValidator to validation rule", () => {
            validatorBuilder.isBooleanString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBooleanString();

            expect(result).not.toBeNull();
        });
    });

    describe("isDateString()", () => {
        it("should set IsDateStringValidator to validation rule", () => {
            validatorBuilder.isDateString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsDateStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDateString();

            expect(result).not.toBeNull();
        });
    });

    describe("isNumericString()", () => {
        it("should set IsNumericStringValidator to validation rule", () => {
            validatorBuilder.isNumericString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNumericStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNumericString();

            expect(result).not.toBeNull();
        });
    });

    describe("isAlphaString()", () => {
        it("should set IsAlphaStringValidator to validation rule", () => {
            validatorBuilder.isAlphaString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsAlphaValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAlphaString();

            expect(result).not.toBeNull();
        });
    });

    describe("isAlphanumericString()", () => {
        it("should set IsAlphanumericStringValidator to validation rule", () => {
            validatorBuilder.isAlphanumericString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsAlphanumericValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAlphanumericString();

            expect(result).not.toBeNull();
        });
    });
});