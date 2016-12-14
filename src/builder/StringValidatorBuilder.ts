"use strict";

import {
    ValidationOptionsBuilder
} from "./";

import {
    AlphaLocale,
    AlphanumericLocale
} from "../shared";

export interface StringValidatorBuilder<T> {
    isBooleanString(): ValidationOptionsBuilder<T>;
    isDateString(): ValidationOptionsBuilder<T>;
    isNumericString(): ValidationOptionsBuilder<T>;
    isAlphaString(locale?: AlphaLocale): ValidationOptionsBuilder<T>;
    isAlphanumericString(locale?: AlphanumericLocale): ValidationOptionsBuilder<T>;
}