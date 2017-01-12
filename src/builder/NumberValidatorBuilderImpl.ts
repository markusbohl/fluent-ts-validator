"use strict";

import {
    CommonValidatorBuilderImpl,
    NumberValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

import {
    ValidationRule
} from "../validation";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import {
    IsPositiveValidator,
    IsNegativeValidator,
    IsGreaterThanValidator,
    IsGreaterThanOrEqualToValidator,
    IsLessThanValidator,
    IsLessThanOrEqualToValidator
} from "../validators/number-based";

export class NumberValidatorBuilderImpl<T> extends CommonValidatorBuilderImpl<T, number> implements
    NumberValidatorBuilder<T> {

    constructor(validationRule: ValidationRule<T, number | Iterable<number>>) {
        super(validationRule);
    }

    private buildRuleWith(validator: PropertyValidator<number>): this {
        this.validationRule.addValidator(validator);

        return this;
    }

    /*
    * =============================
    * Number-based validation rules
    * =============================
    */
    isPositive(): this {
        return this.buildRuleWith(new IsPositiveValidator());
    }

    isNegative(): this {
        return this.buildRuleWith(new IsNegativeValidator());
    }

    isGreaterThan(threshold: number): this {
        return this.buildRuleWith(new IsGreaterThanValidator(threshold));
    }

    isGreaterThanOrEqual(threshold: number): this {
        return this.buildRuleWith(new IsGreaterThanOrEqualToValidator(threshold));
    }

    isLessThan(threshold: number): this {
        return this.buildRuleWith(new IsLessThanValidator(threshold));
    }

    isLessThanOrEqual(threshold: number): this {
        return this.buildRuleWith(new IsLessThanOrEqualToValidator(threshold));
    }
}