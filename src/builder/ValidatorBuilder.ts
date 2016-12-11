"use strict";

import {
    ValidationRule
} from "../validation";

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
    CommonValidatorBuilder,
    NumberValidatorBuilder,
    ValidationOptionsBuilder,
    ValidationOptionsBuilderImpl
} from "./";

export class ValidatorBuilder<T, TProperty> implements CommonValidatorBuilder<T, TProperty>, NumberValidatorBuilder<T> {

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
} 