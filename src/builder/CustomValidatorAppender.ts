"use strict";

import {
    ValidationOptionsBuilder
} from "./";

import {
    Validatable
} from "../shared";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

export interface CustomValidatorAppender<T, TProperty> {
    setValidator(validator: Validatable<TProperty>): ValidationOptionsBuilder<T>;
}