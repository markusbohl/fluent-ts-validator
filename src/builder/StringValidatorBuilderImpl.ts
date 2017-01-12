"use strict";

import {
    CommonValidatorBuilderImpl,
    StringValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

import {
    ValidationRule
} from "../validation";

import {
    AlphaLocale,
    AlphanumericLocale,
    CurrencyOptions,
    EmailOptions,
    FqdnOptions,
    MobilePhoneLocale,
    LengthOptions,
    UrlOptions,
    UuidVersion,
} from "../shared";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import {
    ContainsValidator,
    IsBooleanStringValidator,
    IsDateStringValidator,
    IsNumericStringValidator,
    IsAlphaValidator,
    IsAlphanumericValidator,
    IsAsciiValidator,
    IsBase64Validator,
    IsCurrencyValidator,
    IsDecimalStringValidator,
    IsEmailValidator,
    IsFqdnValidator,
    IsHexadecimalValidator,
    IsIso8601Validator,
    IsJsonValidator,
    IsLengthValidator,
    IsLowercaseValidator,
    IsMobilePhoneValidator,
    IsUrlValidator,
    IsUppercaseValidator,
    IsUuidValidator,
    RegExValidator
} from "../validators/string-based";

export class StringValidatorBuilderImpl<T> extends CommonValidatorBuilderImpl<T, string> implements
    StringValidatorBuilder<T> {

    constructor(validationRule: ValidationRule<T, string | Iterable<string>>) {
        super(validationRule);
    }

    private buildRuleWith(validator: PropertyValidator<string>): this {
        this.validationRule.addValidator(validator);

        return this;
    }

    /*
* =============================
* String-based validation rules
* =============================
*/
    isBooleanString(): this {
        return this.buildRuleWith(new IsBooleanStringValidator());
    }

    isDateString(): this {
        return this.buildRuleWith(new IsDateStringValidator());
    }

    isNumericString(): this {
        return this.buildRuleWith(new IsNumericStringValidator());
    }

    isAlpha(locale?: AlphaLocale): this {
        return this.buildRuleWith(new IsAlphaValidator(locale));
    }

    isAlphanumeric(locale?: AlphanumericLocale): this {
        return this.buildRuleWith(new IsAlphanumericValidator(locale));
    }

    contains(seed: string): this {
        return this.buildRuleWith(new ContainsValidator(seed));
    }

    isAscii(): this {
        return this.buildRuleWith(new IsAsciiValidator());
    }

    isBase64(): this {
        return this.buildRuleWith(new IsBase64Validator());
    }

    isCurrency(options?: CurrencyOptions): this {
        return this.buildRuleWith(new IsCurrencyValidator(options));
    }

    isDecimalString(): this {
        return this.buildRuleWith(new IsDecimalStringValidator());
    }

    isEmail(options?: EmailOptions): this {
        return this.buildRuleWith(new IsEmailValidator(options));
    }

    isFqdn(options?: FqdnOptions): this {
        return this.buildRuleWith(new IsFqdnValidator(options));
    }

    isHexadecimal(): this {
        return this.buildRuleWith(new IsHexadecimalValidator());
    }

    isIso8601(): this {
        return this.buildRuleWith(new IsIso8601Validator());
    }
    isJson(): this {
        return this.buildRuleWith(new IsJsonValidator());
    }

    isLength(options: LengthOptions): this {
        return this.buildRuleWith(new IsLengthValidator(options));
    }

    isLowercase(): this {
        return this.buildRuleWith(new IsLowercaseValidator());
    }

    isMobilePhone(locale: MobilePhoneLocale): this {
        return this.buildRuleWith(new IsMobilePhoneValidator(locale));
    }

    isUppercase(): this {
        return this.buildRuleWith(new IsUppercaseValidator());
    }

    isUrl(options?: UrlOptions): this {
        return this.buildRuleWith(new IsUrlValidator(options));
    }

    isUuid(version?: UuidVersion): this {
        return this.buildRuleWith(new IsUuidValidator(version));
    }

    matches(pattern: RegExp, modifiers?: string): this {
        return this.buildRuleWith(new RegExValidator(pattern, modifiers));
    }
}