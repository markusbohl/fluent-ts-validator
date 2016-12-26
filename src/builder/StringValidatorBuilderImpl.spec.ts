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
    IsFqdnValidator,
    IsHexadecimalValidator,
    IsIso8601Validator,
    IsLengthValidator,
    IsLowercaseValidator,
    IsJsonValidator,
    IsMobilePhoneValidator,
    IsNumericStringValidator,
    IsUrlValidator,
    IsUppercaseValidator,
    IsUuidValidator,
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
        spyOn(validationRule, "addValidator");
        validatorBuilder = new ValidatorBuilder(validationRule);
    });

    describe("isBooleanString()", () => {
        it("should set IsBooleanStringValidator to validation rule", () => {
            validatorBuilder.isBooleanString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBooleanString();

            expect(result).not.toBeNull();
        });
    });

    describe("isDateString()", () => {
        it("should set IsDateStringValidator to validation rule", () => {
            validatorBuilder.isDateString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsDateStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDateString();

            expect(result).not.toBeNull();
        });
    });

    describe("isNumericString()", () => {
        it("should set IsNumericStringValidator to validation rule", () => {
            validatorBuilder.isNumericString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNumericStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNumericString();

            expect(result).not.toBeNull();
        });
    });

    describe("isAlpha()", () => {
        it("should set IsAlphaValidator to validation rule", () => {
            validatorBuilder.isAlpha();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAlphaValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAlpha();

            expect(result).not.toBeNull();
        });
    });

    describe("isAlphanumeric()", () => {
        it("should set IsAlphanumericValidator to validation rule", () => {
            validatorBuilder.isAlphanumeric();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAlphanumericValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAlphanumeric();

            expect(result).not.toBeNull();
        });
    });

    describe("contains()", () => {
        it("should set containsValidator to validation rule", () => {
            validatorBuilder.contains("foo");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(ContainsValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.contains("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("isAscii()", () => {
        it("should set IsAsciiValidator to validation rule", () => {
            validatorBuilder.isAscii();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAsciiValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAscii();

            expect(result).not.toBeNull();
        });
    });

    describe("isBase64()", () => {
        it("should set IsBase64Validator to validation rule", () => {
            validatorBuilder.isBase64();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBase64Validator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBase64();

            expect(result).not.toBeNull();
        });
    });

    describe("isCurrency()", () => {
        it("should set IsCurrencyValidator to validation rule", () => {
            validatorBuilder.isCurrency();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsCurrencyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isCurrency();

            expect(result).not.toBeNull();
        });
    });

    describe("isDecimalString()", () => {
        it("should set IsDecimalStringValidator to validation rule", () => {
            validatorBuilder.isDecimalString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsDecimalStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDecimalString();

            expect(result).not.toBeNull();
        });
    });

    describe("isEmail()", () => {
        it("should set IsEmailValidator to validation rule", () => {
            validatorBuilder.isEmail();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsEmailValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEmail();

            expect(result).not.toBeNull();
        });
    });

    describe("isFqdn()", () => {
        it("should set IsFqdnValidator to validation rule", () => {
            validatorBuilder.isFqdn();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsFqdnValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isFqdn();

            expect(result).not.toBeNull();
        });
    });

    describe("isHexadecimal()", () => {
        it("should set IsHexadecimalValidator to validation rule", () => {
            validatorBuilder.isHexadecimal();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsHexadecimalValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isHexadecimal();

            expect(result).not.toBeNull();
        });
    });

    describe("isIso8601()", () => {
        it("should set IsIso8601Validator to validation rule", () => {
            validatorBuilder.isIso8601();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsIso8601Validator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isIso8601();

            expect(result).not.toBeNull();
        });
    });

    describe("isJson()", () => {
        it("should set IsJsonValidator to validation rule", () => {
            validatorBuilder.isJson();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsJsonValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isJson();

            expect(result).not.toBeNull();
        });
    });

    describe("isMobilePhone()", () => {
        it("should set IsMobilePhoneValidator to validation rule", () => {
            validatorBuilder.isMobilePhone("ja-JP");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsMobilePhoneValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isMobilePhone("en-CA");

            expect(result).not.toBeNull();
        });
    });

    describe("isUppercase()", () => {
        it("should set isUppercaseValidator to validation rule", () => {
            validatorBuilder.isUppercase();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUppercaseValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isUppercase();

            expect(result).not.toBeNull();
        });
    });

    describe("isLength()", () => {
        it("should set isLengthValidator to validation rule", () => {
            validatorBuilder.isLength({ min: 4 });

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsLengthValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isLength({ max: 10 });

            expect(result).not.toBeNull();
        });
    });

    describe("isLowercase()", () => {
        it("should set isLowercaseValidator to validation rule", () => {
            validatorBuilder.isLowercase();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsLowercaseValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isLowercase();

            expect(result).not.toBeNull();
        });
    });

    describe("isUrl()", () => {
        it("should set IsUrlValidator to validation rule", () => {
            validatorBuilder.isUrl();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUrlValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isUrl();

            expect(result).not.toBeNull();
        });
    });

    describe("isUuid()", () => {
        it("should set IsUuidValidator to validation rule", () => {
            validatorBuilder.isUuid();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUuidValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isUuid();

            expect(result).not.toBeNull();
        });
    });

    describe("matches()", () => {
        it("should set RegExValidator to validation rule", () => {
            validatorBuilder.matches(new RegExp("foo"));

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(RegExValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.matches(new RegExp("foo"));

            expect(result).not.toBeNull();
        });
    });
});