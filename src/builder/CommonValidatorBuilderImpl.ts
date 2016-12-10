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
    CommonValidatorBuilder,
    ValidationOptionsBuilder,
    ValidationOptionsBuilderImpl
} from "./";


export class CommonValidatorBuilderImpl<T, TProperty> implements CommonValidatorBuilder<T, TProperty> {

    constructor(protected validationRule: ValidationRule<T, TProperty>) { }

    protected addToRule(validator: PropertyValidator<TProperty>) {
        this.validationRule.setValidator(validator);
    }

    protected newValidationOptionsBuilder(): ValidationOptionsBuilder<T> {
        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

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
} 