import {CommonValidatorBuilder, ValidationOptionsBuilder} from "./";
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
    contains(seed: string): this & ValidationOptionsBuilder<T>;
    isAlphanumeric(locale?: AlphanumericLocale): this & ValidationOptionsBuilder<T>;
    isAlpha(locale?: AlphaLocale): this & ValidationOptionsBuilder<T>;
    isAscii(): this & ValidationOptionsBuilder<T>;
    isBase64(): this & ValidationOptionsBuilder<T>;
    isBooleanString(): this & ValidationOptionsBuilder<T>;
    isCurrency(options?: CurrencyOptions): this & ValidationOptionsBuilder<T>;
    isDateString(): this & ValidationOptionsBuilder<T>;
    isDecimalString(): this & ValidationOptionsBuilder<T>;
    isEmail(options?: EmailOptions): this & ValidationOptionsBuilder<T>;
    isFqdn(options?: FqdnOptions): this & ValidationOptionsBuilder<T>;
    isHexadecimal(): this & ValidationOptionsBuilder<T>;
    isIso8601(): this & ValidationOptionsBuilder<T>;
    isJson(): this & ValidationOptionsBuilder<T>;
    isLength(options: LengthOptions): this & ValidationOptionsBuilder<T>;
    isLowercase(): this & ValidationOptionsBuilder<T>;
    isMobilePhone(locale: MobilePhoneLocale): this & ValidationOptionsBuilder<T>;
    isNumericString(): this & ValidationOptionsBuilder<T>;
    isUrl(options?: UrlOptions): this & ValidationOptionsBuilder<T>;
    isUppercase(): this & ValidationOptionsBuilder<T>;
    isUuid(version?: UuidVersion): this & ValidationOptionsBuilder<T>;
    matches(pattern: RegExp, modifiers?: string): this & ValidationOptionsBuilder<T>;
}