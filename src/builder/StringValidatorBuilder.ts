"use strict";

import {
    CommonValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

import {
    AlphaLocale,
    AlphanumericLocale,
    CurrencyOptions,
    EmailOptions,
    FqdnOptions,
    LengthOptions,
    MobilePhoneLocale,
    UrlOptions,
    UuidVersion
} from "../shared";

export interface StringValidatorBuilder<T> extends CommonValidatorBuilder<T, string> {
    contains(seed: string): ValidationOptionsBuilder<T>;
    isAlphanumeric(locale?: AlphanumericLocale): ValidationOptionsBuilder<T>;
    isAlpha(locale?: AlphaLocale): ValidationOptionsBuilder<T>;
    isAscii(): ValidationOptionsBuilder<T>;
    isBase64(): ValidationOptionsBuilder<T>;
    isBooleanString(): ValidationOptionsBuilder<T>;
    isCurrency(options?: CurrencyOptions): ValidationOptionsBuilder<T>;
    isDateString(): ValidationOptionsBuilder<T>;
    isDecimalString(): ValidationOptionsBuilder<T>;
    isEmail(options?: EmailOptions): ValidationOptionsBuilder<T>;
    isFqdn(options?: FqdnOptions): ValidationOptionsBuilder<T>;
    isHexadecimal(): ValidationOptionsBuilder<T>;
    isIso8601(): ValidationOptionsBuilder<T>;
    isJson(): ValidationOptionsBuilder<T>;
    isLength(options: LengthOptions): ValidationOptionsBuilder<T>;
    isLowercase(): ValidationOptionsBuilder<T>;
    isMobilePhone(locale: MobilePhoneLocale): ValidationOptionsBuilder<T>;
    isNumericString(): ValidationOptionsBuilder<T>;
    isUrl(options?: UrlOptions): ValidationOptionsBuilder<T>;
    isUppercase(): ValidationOptionsBuilder<T>;
    isUuid(version?: UuidVersion): ValidationOptionsBuilder<T>;
    matches(pattern: RegExp, modifiers?: string): ValidationOptionsBuilder<T>;
}