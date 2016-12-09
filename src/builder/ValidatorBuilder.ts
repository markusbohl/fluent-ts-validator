"use strict";

import {
    ValidationOptionsBuilder
} from "./";

export interface ValidatorBuilder<T, TProperty> {
    isDefined(): ValidationOptionsBuilder<T>;
    isNull(): ValidationOptionsBuilder<T>;
    isNotNull(): ValidationOptionsBuilder<T>;
    isEmpty(): ValidationOptionsBuilder<T>;
    isNotEmpty(): ValidationOptionsBuilder<T>;
    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T>;
    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T>;
    isIn(array: Array<TProperty>): ValidationOptionsBuilder<T>;
    isNotIn(array: Array<TProperty>): ValidationOptionsBuilder<T>;
    isArray(): ValidationOptionsBuilder<T>;
    isBoolean(): ValidationOptionsBuilder<T>;
    isDate(): ValidationOptionsBuilder<T>;
    isNumber(): ValidationOptionsBuilder<T>;
    isString(): ValidationOptionsBuilder<T>;
}