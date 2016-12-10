"use strict";

import {
    NumberValidatorBuilder,
    CommonValidatorBuilderImpl,
    ValidationOptionsBuilder
} from "./";

import {
    IsPositiveValidator,
    IsNegativeValidator,
    IsGreaterThanValidator,
    IsGreaterThanOrEqualValidator,
    IsLessThanValidator,
    IsLessThanOrEqualValidator
} from "../validators/number-based";

export class NumberValidatorBuilderImpl<T> extends CommonValidatorBuilderImpl<T, number> implements NumberValidatorBuilder<T> {

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
        this.addToRule(new IsGreaterThanOrEqualValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

    isLessThan(threshold: number): ValidationOptionsBuilder<T> {
        this.addToRule(new IsLessThanValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

    isLessThanOrEqual(threshold: number): ValidationOptionsBuilder<T> {
        this.addToRule(new IsLessThanOrEqualValidator(threshold));

        return this.newValidationOptionsBuilder();
    }

} 