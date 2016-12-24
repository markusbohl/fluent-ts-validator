"use strict";

import {
    ValidationOptionsBuilder
} from "./";

import {
    AlphaLocale,
    AlphanumericLocale,
    CurrencyOptions,
    EmailOptions,
    FqdnOptions,
    UrlOptions,
    UuidVersion
} from "../shared";

export interface StringValidatorBuilder<T> {
    contains(seed: string): ValidationOptionsBuilder<T>;
    isAlphanumericString(locale?: AlphanumericLocale): ValidationOptionsBuilder<T>;
    isAlphaString(locale?: AlphaLocale): ValidationOptionsBuilder<T>;
    isAscii(): ValidationOptionsBuilder<T>;
    isBase64(): ValidationOptionsBuilder<T>;
    isBooleanString(): ValidationOptionsBuilder<T>;
    isCurrency(options?: CurrencyOptions): ValidationOptionsBuilder<T>;
    isDateString(): ValidationOptionsBuilder<T>;
    isDecimalString(): ValidationOptionsBuilder<T>;
    isEmail(options?: EmailOptions): ValidationOptionsBuilder<T>;
    isFQDN(options?: FqdnOptions): ValidationOptionsBuilder<T>;
    isLowercase(): ValidationOptionsBuilder<T>;
    isNumericString(): ValidationOptionsBuilder<T>;
    isUrl(options?: UrlOptions): ValidationOptionsBuilder<T>;
    isUppercase(): ValidationOptionsBuilder<T>;
    isUUID(version?: UuidVersion): ValidationOptionsBuilder<T>;
    matches(pattern: RegExp, modifiers?: string): ValidationOptionsBuilder<T>;
}