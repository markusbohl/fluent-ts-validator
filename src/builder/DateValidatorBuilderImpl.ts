"use strict";

import {
    CommonValidatorBuilderImpl,
    DateValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

import {
    ValidationRule
} from "../validation";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import {
    IsBeforeValidator,
    IsSameAsValidator,
    IsAfterValidator,
    IsSameOrBeforeValidator,
    IsSameOrAfterValidator,
    IsBetweenValidator
} from "../validators/date-based";

export class DateValidatorBuilderImpl<T> extends CommonValidatorBuilderImpl<T, Date> implements
    DateValidatorBuilder<T> {

    constructor(validationRule: ValidationRule<T, Date | Iterable<Date>>) {
        super(validationRule);
    }

    private buildRuleWith(validator: PropertyValidator<Date>): this {
        this.validationRule.addValidator(validator);

        return this;
    }

    /*
    * ===========================
    * Date-based validation rules
    * ===========================
    */
    isBefore(date: Date): this {
        return this.buildRuleWith(new IsBeforeValidator(date));
    }

    isSameAs(date: Date): this {
        return this.buildRuleWith(new IsSameAsValidator(date));
    }

    isAfter(date: Date): this {
        return this.buildRuleWith(new IsAfterValidator(date));
    }

    isSameOrBefore(date: Date): this {
        return this.buildRuleWith(new IsSameOrBeforeValidator(date));
    }

    isSameOrAfter(date: Date): this {
        return this.buildRuleWith(new IsSameOrAfterValidator(date));
    }

    isBetween(date1: Date, date2: Date, lowerBoundary: "(" | "[" = "(", upperBoundary: ")" | "]" = ")"): this {
        return this.buildRuleWith(new IsBetweenValidator(date1, date2, lowerBoundary, upperBoundary));
    }
}