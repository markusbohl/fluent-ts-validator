"use strict";

import {
    NumberValidatorBuilder,
    CommonValidatorBuilderImpl,
    ValidationOptionsBuilder
} from "./";

import {
    IsPositiveValidator
} from "../validators/number-based";

export class NumberValidatorBuilderImpl<T> extends CommonValidatorBuilderImpl<T, number> implements NumberValidatorBuilder<T> {

    isPositive(): ValidationOptionsBuilder<T> {
        this.addToRule(new IsPositiveValidator());

        return this.newValidationOptionsBuilder();
    }
} 