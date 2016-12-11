"use strict";

import {
    ValidationOptionsBuilder
} from "./";

export interface NumberValidatorBuilder<T> {
    isPositive(): ValidationOptionsBuilder<T>;
    isNegative(): ValidationOptionsBuilder<T>;
    isGreaterThan(threshold: number): ValidationOptionsBuilder<T>;
    isGreaterThanOrEqual(threshold: number): ValidationOptionsBuilder<T>;
    isLessThan(threshold: number): ValidationOptionsBuilder<T>;
    isLessThanOrEqual(threshold: number): ValidationOptionsBuilder<T>;
}