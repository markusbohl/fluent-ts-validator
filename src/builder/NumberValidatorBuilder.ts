"use strict";

import {
    ValidationOptionsBuilder,
    CommonValidatorBuilder
} from "./";

export interface NumberValidatorBuilder<T> extends CommonValidatorBuilder<T, number> {
    isPositive(): ValidationOptionsBuilder<T>;
    isNegative(): ValidationOptionsBuilder<T>;
    isGreaterThan(threshold: number): ValidationOptionsBuilder<T>;
    isGreaterThanOrEqual(threshold: number): ValidationOptionsBuilder<T>;
    isLessThan(threshold: number): ValidationOptionsBuilder<T>;
    isLessThanOrEqual(threshold: number): ValidationOptionsBuilder<T>;
}