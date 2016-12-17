"use strict";

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

    private addToRule(validator: PropertyValidator<any>) {
        this.validationRule.setValidator(validator);
    }

    private newValidationOptionsBuilder(): ValidationOptionsBuilder<T> {
        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    /*
    * =======================
    * Common validation rules
    * =======================
    */
    isDefined(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsDefinedValidator());

        return this.newValidationOptionsBuilder();
    }

    isNull(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNullValidator());

        return this.newValidationOptionsBuilder();
    }

    isNotNull(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNotNullValidator());

        return this.newValidationOptionsBuilder();
    }

    isEmpty(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsEmptyValidator());

        return this.newValidationOptionsBuilder();
    }

    isNotEmpty(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNotEmptyValidator());

        return this.newValidationOptionsBuilder();
    }

    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        this.addToRule(new IsEqualValidator(comparison));

        return this.newValidationOptionsBuilder();
    }

    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNotEqualValidator(comparison));

        return this.newValidationOptionsBuilder();
    }

    isIn(array: Array<TProperty>): ValidationOptionsBuilder<T> {
        this.addToRule(new IsInValidator(array));

        return this.newValidationOptionsBuilder();
    }

    isNotIn(array: Array<TProperty>): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNotInValidator(array));

        return this.newValidationOptionsBuilder();
    }

    isArray(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsArrayValidator());

        return this.newValidationOptionsBuilder();
    }

    isBoolean(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsBooleanValidator());

        return this.newValidationOptionsBuilder();
    }

    isDate(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsDateValidator());

        return this.newValidationOptionsBuilder();
    }

    isNumber(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNumberValidator());

        return this.newValidationOptionsBuilder();
    }

    isString(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsStringValidator());

        return this.newValidationOptionsBuilder();
    }

    /*
    * ======================
    * Custom validation rule
    * ======================
    */
    must(validationExpression: (input: TProperty) => boolean): ValidationOptionsBuilder<T> {
        this.addToRule({
            isValid: function (input: TProperty): boolean {
                return validationExpression(input);
            }
        });

        return this.newValidationOptionsBuilder();
    }

    /*
    * =============================
    * Number-based validation rules
    * =============================
    */
    isPositive(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsPositiveValidator());

        return this.newValidationOptionsBuilder();
    }

    isNegative(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNegativeValidator());

        return this.newValidationOptionsBuilder();
    }

    isGreaterThan(threshold: number): ValidationOptionsBuilder<T> {
        this.addToRule(new IsGreaterThanValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

    isGreaterThanOrEqual(threshold: number): ValidationOptionsBuilder<T> {
        this.addToRule(new IsGreaterThanOrEqualToValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

    isLessThan(threshold: number): ValidationOptionsBuilder<T> {
        this.addToRule(new IsLessThanValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

    isLessThanOrEqual(threshold: number): ValidationOptionsBuilder<T> {
        this.addToRule(new IsLessThanOrEqualToValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

    /*
    * ===========================
    * Date-based validation rules
    * ===========================
    */
    isBefore(date: Date): ValidationOptionsBuilder<T> {
        this.addToRule(new IsBeforeValidator(date));

        return this.newValidationOptionsBuilder();
    }

    isSameAs(date: Date): ValidationOptionsBuilder<T> {
        this.addToRule(new IsSameAsValidator(date));

        return this.newValidationOptionsBuilder();
    }

    isAfter(date: Date): ValidationOptionsBuilder<T> {
        this.addToRule(new IsAfterValidator(date));

        return this.newValidationOptionsBuilder();
    }

    isSameOrBefore(date: Date): ValidationOptionsBuilder<T> {
        this.addToRule(new IsSameOrBeforeValidator(date));

        return this.newValidationOptionsBuilder();
    }

    isSameOrAfter(date: Date): ValidationOptionsBuilder<T> {
        this.addToRule(new IsSameOrAfterValidator(date));

        return this.newValidationOptionsBuilder();
    }

    isBetween(date1: Date, date2: Date, lowerBoundary: "(" | "[" = "(", upperBoundary: ")" | "]" = ")"): ValidationOptionsBuilder<T> {
        this.addToRule(new IsBetweenValidator(date1, date2, lowerBoundary, upperBoundary));

        return this.newValidationOptionsBuilder();
    }

    /*
    * =============================
    * String-based validation rules
    * =============================
    */
    isBooleanString(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsBooleanStringValidator());

        return this.newValidationOptionsBuilder();
    }

    isDateString(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsDateStringValidator());

        return this.newValidationOptionsBuilder();
    }

    isNumericString(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsNumericStringValidator());

        return this.newValidationOptionsBuilder();
    }

    isAlphaString(locale?: AlphaLocale): ValidationOptionsBuilder<T> {
        this.addToRule(new IsAlphaValidator(locale));

        return this.newValidationOptionsBuilder();
    }

    isAlphanumericString(locale?: AlphanumericLocale): ValidationOptionsBuilder<T> {
        this.addToRule(new IsAlphanumericValidator(locale));

        return this.newValidationOptionsBuilder();
    }

    contains(seed: string): ValidationOptionsBuilder<T> {
        this.addToRule(new ContainsValidator(seed));

        return this.newValidationOptionsBuilder();
    }

    isAscii(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsAsciiValidator());

        return this.newValidationOptionsBuilder();
    }

    isBase64(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsBase64Validator());

        return this.newValidationOptionsBuilder();
    }

    isCurrency(options?: CurrencyOptions): ValidationOptionsBuilder<T> {
        this.addToRule(new IsCurrencyValidator(options));

        return this.newValidationOptionsBuilder();
    }

    isDecimalString(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsDecimalStringValidator());

        return this.newValidationOptionsBuilder();
    }

    isEmail(options?: EmailOptions): ValidationOptionsBuilder<T> {
        this.addToRule(new IsEmailValidator(options));

        return this.newValidationOptionsBuilder();
    }

    isFQDN(options?: FqdnOptions): ValidationOptionsBuilder<T> {
        this.addToRule(new IsFQDNValidator(options));

        return this.newValidationOptionsBuilder();
    }

    isUUID(version?: UuidVersion): ValidationOptionsBuilder<T> {
        this.addToRule(new IsUUIDValidator(version));

        return this.newValidationOptionsBuilder();
    }

    /*
    * =======================
    * Custom validation rules
    * =======================
    */
    setValidator(validator: Validatable<TProperty>): ValidationOptionsBuilder<T> {
        this.addToRule({
            isValid: function (input: TProperty): boolean {
                return validator.validate(input).isValid();
            }
        });

        return this.newValidationOptionsBuilder();
    }
}