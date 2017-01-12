"use strict";

import {
    ValidationOptionsBuilder
} from "./";

import {
    Validatable
} from "../shared";

export interface CommonValidatorBuilder<T, TProperty> {
    isDefined(): ValidationOptionsBuilder<T>;
    isNull(): ValidationOptionsBuilder<T>;
    isNotNull(): ValidationOptionsBuilder<T>;
    isEmpty(): ValidationOptionsBuilder<T>;
    isNotEmpty(): ValidationOptionsBuilder<T>;
    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T>;
    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T>;
    isIn(array: Array<TProperty>): ValidationOptionsBuilder<T>;
    isNotIn(array: Array<TProperty>): ValidationOptionsBuilder<T>;
    must(validationExpression: (input: TProperty) => boolean): ValidationOptionsBuilder<T>;
    addValidator(validator: Validatable<TProperty>): ValidationOptionsBuilder<T>;
}