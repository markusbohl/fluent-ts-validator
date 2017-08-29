import {ValidationRule, WhenNotEmptyCondition} from "../validation";
import {
    ContainsValidator,
    HasLengthValidator,
    IsAlphanumericValidator,
    IsAlphaValidator,
    IsAsciiValidator,
    IsBase64Validator,
    IsBooleanStringValidator,
    IsCurrencyValidator,
    IsDecimalStringValidator,
    IsEmailValidator,
    IsFqdnValidator,
    IsHexadecimalValidator,
    IsIso8601Validator,
    IsJsonValidator,
    IsLowercaseValidator,
    IsMobilePhoneValidator,
    IsNumericStringValidator,
    IsUppercaseValidator,
    IsUrlValidator,
    IsUuidValidator,
    RegExValidator
} from "../validators/string-based";
import {StringValidatorBuilderImpl} from "./";
import {PostalCodeLocale} from "../shared/PostalCodeLocale";
import {IsPostalCodeValidator} from "../validators/string-based/IsPostalCodeValidator";

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

describe("StringValidatorBuilderImpl", () => {
    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: StringValidatorBuilderImpl<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => {
            return input.property;
        });
        spyOn(validationRule, "addValidator");
        validatorBuilder = new StringValidatorBuilderImpl(validationRule);
    });

    describe("whenNotEmpty()()", () => {
        it("should set a WhenCondition to the validation rule", () => {
            spyOn(validationRule, "addCondition");
            validatorBuilder.whenNotEmpty();

            expect(validationRule.addCondition).toHaveBeenCalledWith(jasmine.any(WhenNotEmptyCondition));
        });

        it("should return current builder instance", () => {
            let result = validatorBuilder.whenNotEmpty();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isBooleanString()", () => {
        it("should set IsBooleanStringValidator to validation rule", () => {
            validatorBuilder.isBooleanString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanStringValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isBooleanString();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isNumericString()", () => {
        it("should set IsNumericStringValidator to validation rule", () => {
            validatorBuilder.isNumericString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNumericStringValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isNumericString();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isAlpha()", () => {
        it("should set IsAlphaValidator to validation rule", () => {
            validatorBuilder.isAlpha();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAlphaValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isAlpha();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isAlphanumeric()", () => {
        it("should set IsAlphanumericValidator to validation rule", () => {
            validatorBuilder.isAlphanumeric();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAlphanumericValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isAlphanumeric();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("contains()", () => {
        it("should set containsValidator to validation rule", () => {
            validatorBuilder.contains("foo");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(ContainsValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.contains("foo");

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isAscii()", () => {
        it("should set IsAsciiValidator to validation rule", () => {
            validatorBuilder.isAscii();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAsciiValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isAscii();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isBase64()", () => {
        it("should set IsBase64Validator to validation rule", () => {
            validatorBuilder.isBase64();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBase64Validator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isBase64();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isCurrency()", () => {
        it("should set IsCurrencyValidator to validation rule", () => {
            validatorBuilder.isCurrency();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsCurrencyValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isCurrency();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isDecimalString()", () => {
        it("should set IsDecimalStringValidator to validation rule", () => {
            validatorBuilder.isDecimalString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsDecimalStringValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isDecimalString();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isEmail()", () => {
        it("should set IsEmailValidator to validation rule", () => {
            validatorBuilder.isEmail();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsEmailValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isEmail();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isFqdn()", () => {
        it("should set IsFqdnValidator to validation rule", () => {
            validatorBuilder.isFqdn();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsFqdnValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isFqdn();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isHexadecimal()", () => {
        it("should set IsHexadecimalValidator to validation rule", () => {
            validatorBuilder.isHexadecimal();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsHexadecimalValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isHexadecimal();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isIso8601()", () => {
        it("should set IsIso8601Validator to validation rule", () => {
            validatorBuilder.isIso8601();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsIso8601Validator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isIso8601();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isJson()", () => {
        it("should set IsJsonValidator to validation rule", () => {
            validatorBuilder.isJson();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsJsonValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isJson();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isMobilePhoneNo()", () => {
        it("should set IsMobilePhoneValidator to validation rule", () => {
            validatorBuilder.isMobilePhoneNo("ja-JP");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsMobilePhoneValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isMobilePhoneNo("en-CA");

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isUppercase()", () => {
        it("should set isUppercaseValidator to validation rule", () => {
            validatorBuilder.isUppercase();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUppercaseValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isUppercase();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("hasLengthBetween()", () => {
        it("should set hasLengthValidator to validation rule", () => {
            validatorBuilder.hasLengthBetween(4, 8);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasLengthValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.hasLengthBetween(10, 20);

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("hasLength()", () => {
        it("should set hasLengthValidator to validation rule", () => {
            validatorBuilder.hasLength(5);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasLengthValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.hasLength(5);

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("hasMinLength()", () => {
        it("should set hasLengthValidator to validation rule", () => {
            validatorBuilder.hasMinLength(4);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasLengthValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.hasMinLength(10);

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("hasMaxLength()", () => {
        it("should set hasLengthValidator to validation rule", () => {
            validatorBuilder.hasMaxLength(40);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasLengthValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.hasMaxLength(30);

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isLowercase()", () => {
        it("should set isLowercaseValidator to validation rule", () => {
            validatorBuilder.isLowercase();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsLowercaseValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isLowercase();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isUrl()", () => {
        it("should set IsUrlValidator to validation rule", () => {
            validatorBuilder.isUrl();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUrlValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isUrl();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isUuid()", () => {
        it("should set IsUuidValidator to validation rule", () => {
            validatorBuilder.isUuid();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUuidValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isUuid();

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("matches()", () => {
        it("should set RegExValidator to validation rule", () => {
            validatorBuilder.matches(new RegExp("foo"));

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(RegExValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.matches(new RegExp("foo"));

            expect(result).toBe(validatorBuilder);
        });
    });

    describe("isPostalCode()", () => {
        it("should set IsPostalCodeValidator to validation rule", () => {
            validatorBuilder.isPostalCode("US");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsPostalCodeValidator));
        });

        it("should return reference to builder to adhere to fluent pattern", () => {
            let result = validatorBuilder.isPostalCode("any");

            expect(result).toBe(validatorBuilder);
        });
    });
});
