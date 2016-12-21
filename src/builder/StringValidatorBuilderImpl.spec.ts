/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    ContainsValidator,
    IsAlphanumericValidator,
    IsAlphaValidator,
    IsAsciiValidator,
    IsBase64Validator,
    IsBooleanStringValidator,
    IsCurrencyValidator,
    IsDateStringValidator,
    IsDecimalStringValidator,
    IsEmailValidator,
    IsFQDNValidator,
    IsNumericStringValidator,
    IsUUIDValidator,
    RegExValidator
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

    describe("contains()", () => {
        it("should set containsValidator to validation rule", () => {
            validatorBuilder.contains("foo");

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(ContainsValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.contains("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("isAscii()", () => {
        it("should set IsAsciiValidator to validation rule", () => {
            validatorBuilder.isAscii();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsAsciiValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAscii();

            expect(result).not.toBeNull();
        });
    });

    describe("isBase64()", () => {
        it("should set IsBase64Validator to validation rule", () => {
            validatorBuilder.isBase64();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsBase64Validator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBase64();

            expect(result).not.toBeNull();
        });
    });

    describe("isCurrency()", () => {
        it("should set IsCurrencyValidator to validation rule", () => {
            validatorBuilder.isCurrency();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsCurrencyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isCurrency();

            expect(result).not.toBeNull();
        });
    });

    describe("isDecimalString()", () => {
        it("should set IsDecimalStringValidator to validation rule", () => {
            validatorBuilder.isDecimalString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsDecimalStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDecimalString();

            expect(result).not.toBeNull();
        });
    });

    describe("isEmail()", () => {
        it("should set IsEmailValidator to validation rule", () => {
            validatorBuilder.isEmail();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsEmailValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEmail();

            expect(result).not.toBeNull();
        });
    });

    describe("isFQDN()", () => {
        it("should set IsFQDNValidator to validation rule", () => {
            validatorBuilder.isFQDN();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsFQDNValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isFQDN();

            expect(result).not.toBeNull();
        });
    });

    describe("isUUID()", () => {
        it("should set IsUUIDValidator to validation rule", () => {
            validatorBuilder.isUUID();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsUUIDValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isUUID();

            expect(result).not.toBeNull();
        });
    });

    describe("matches()", () => {
        it("should set RegExValidator to validation rule", () => {
            validatorBuilder.matches(new RegExp("foo"));

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(RegExValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.matches(new RegExp("foo"));

            expect(result).not.toBeNull();
        });
    });
});