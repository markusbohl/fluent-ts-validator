"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsNotNullValidator,
    IsEmptyValidator,
    IsEqualValidator,
    IsNotEqualValidator
} from "../validators";

import {
    ValidatorBuilder,
    ValidationOptionsBuilder,
    ValidationOptionsBuilderImpl
} from "./";

export class ValidatorBuilderImpl<T, TProperty> implements ValidatorBuilder<T, TProperty> {

    constructor(private validationRule: ValidationRule<T, TProperty>) {}

    isNotNull(): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsNotNullValidator());

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsEqualValidator(comparison));

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsNotEqualValidator(comparison));

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    isEmpty(): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsEmptyValidator());

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }
} 