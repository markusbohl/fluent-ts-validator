"use strict";
import { IsLowercaseValidator } from '../validators/string-based/IsLowercaseValidator';
import { IsUppercaseValidator } from '../validators/string-based/IsUppercaseValidator';
import { RegExValidator } from '../validators/string-based/RegExValidator';

import {
    ValidationRule
} from "../validation";

import {
    Validatable,
    AlphaLocale,
    AlphanumericLocale,
    CurrencyOptions,
    EmailOptions,
    FqdnOptions,
    UuidVersion
} from "../shared";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import {
    IsDefinedValidator,
    IsNullValidator,
    IsNotNullValidator,
    IsEmptyValidator,
    IsNotEmptyValidator,
    IsEqualValidator,
    IsNotEqualValidator,
    IsInValidator,
    IsNotInValidator,
    IsArrayValidator,
    IsBooleanValidator,
    IsDateValidator,
    IsNumberValidator,
    IsStringValidator
} from "../validators/common";

import {
    IsPositiveValidator,
    IsNegativeValidator,
    IsGreaterThanValidator,
    IsGreaterThanOrEqualToValidator,
    IsLessThanValidator,
    IsLessThanOrEqualToValidator
} from "../validators/number-based";

import {
    IsBeforeValidator,
    IsSameAsValidator,
    IsAfterValidator,
    IsSameOrBeforeValidator,
    IsSameOrAfterValidator,
    IsBetweenValidator
} from "../validators/date-based";

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
    IsFQDNValidator,
    IsUUIDValidator
} from "../validators/string-based";

import {
    CommonValidatorBuilder,
    NumberValidatorBuilder,
    DateValidatorBuilder,
    StringValidatorBuilder,
    ValidationOptionsBuilder,
    ValidationOptionsBuilderImpl
} from "./";

export class ValidatorBuilder<T, TProperty> implements
    CommonValidatorBuilder<T, TProperty>,
    NumberValidatorBuilder<T>,
    DateValidatorBuilder<T>,
    StringValidatorBuilder<T> {

    constructor(private validationRule: ValidationRule<T, any>) { }

    private buildRuleWith(validator: PropertyValidator<any>): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(validator);

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    /*
    * =======================
    * Common validation rules
    * =======================
    */
    isDefined(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsDefinedValidator());
    }

    isNull(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNullValidator());
    }

    isNotNull(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNotNullValidator());
    }

    isEmpty(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsEmptyValidator());
    }

    isNotEmpty(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNotEmptyValidator());
    }

    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsEqualValidator(comparison));
    }

    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNotEqualValidator(comparison));
    }

    isIn(array: Array<TProperty>): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsInValidator(array));
    }

    isNotIn(array: Array<TProperty>): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNotInValidator(array));
    }

    isArray(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsArrayValidator());
    }

    isBoolean(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsBooleanValidator());
    }

    isDate(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsDateValidator());
    }

    isNumber(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNumberValidator());
    }

    isString(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsStringValidator());
    }

    /*
    * ======================
    * Custom validation rule
    * ======================
    */
    must(validationExpression: (input: TProperty) => boolean): ValidationOptionsBuilder<T> {
        return this.buildRuleWith({
            isValid: function (input: TProperty): boolean {
                return validationExpression(input);
            }
        });
    }

    /*
    * =============================
    * Number-based validation rules
    * =============================
    */
    isPositive(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsPositiveValidator());
    }

    isNegative(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNegativeValidator());
    }

    isGreaterThan(threshold: number): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsGreaterThanValidator(threshold));
    }

    isGreaterThanOrEqual(threshold: number): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsGreaterThanOrEqualToValidator(threshold));
    }

    isLessThan(threshold: number): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsLessThanValidator(threshold));
    }

    isLessThanOrEqual(threshold: number): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsLessThanOrEqualToValidator(threshold));
    }

    /*
    * ===========================
    * Date-based validation rules
    * ===========================
    */
    isBefore(date: Date): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsBeforeValidator(date));
    }

    isSameAs(date: Date): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsSameAsValidator(date));
    }

    isAfter(date: Date): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsAfterValidator(date));
    }

    isSameOrBefore(date: Date): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsSameOrBeforeValidator(date));
    }

    isSameOrAfter(date: Date): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsSameOrAfterValidator(date));
    }

    isBetween(date1: Date, date2: Date, lowerBoundary: "(" | "[" = "(", upperBoundary: ")" | "]" = ")"): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsBetweenValidator(date1, date2, lowerBoundary, upperBoundary));
    }

    /*
    * =============================
    * String-based validation rules
    * =============================
    */
    isBooleanString(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsBooleanStringValidator());
    }

    isDateString(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsDateStringValidator());
    }

    isNumericString(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsNumericStringValidator());
    }

    isAlphaString(locale?: AlphaLocale): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsAlphaValidator(locale));
    }

    isAlphanumericString(locale?: AlphanumericLocale): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsAlphanumericValidator(locale));
    }

    contains(seed: string): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new ContainsValidator(seed));
    }

    isAscii(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsAsciiValidator());
    }

    isBase64(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsBase64Validator());
    }

    isCurrency(options?: CurrencyOptions): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsCurrencyValidator(options));
    }

    isDecimalString(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsDecimalStringValidator());
    }

    isEmail(options?: EmailOptions): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsEmailValidator(options));
    }

    isFQDN(options?: FqdnOptions): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsFQDNValidator(options));
    }

    isLowercase(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsLowercaseValidator());
    }

    isUppercase(): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsUppercaseValidator());
    }

    isUUID(version?: UuidVersion): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new IsUUIDValidator(version));
    }

    matches(pattern: RegExp, modifiers?: string): ValidationOptionsBuilder<T> {
        return this.buildRuleWith(new RegExValidator(pattern, modifiers));
    }

    /*
    * =======================
    * Custom validation rules
    * =======================
    */
    setValidator(validator: Validatable<TProperty>): ValidationOptionsBuilder<T> {
        return this.buildRuleWith({
            isValid: function (input: TProperty): boolean {
                return validator.validate(input).isValid();
            }
        });
    }
}