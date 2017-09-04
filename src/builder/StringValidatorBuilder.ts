import {CommonValidatorBuilder, ValidationOptionsBuilder} from "./";
import {
    AlphaLocale,
    AlphanumericLocale,
    CurrencyOptions,
    EmailOptions,
    FqdnOptions,
    MobilePhoneLocale,
    UrlOptions,
    UuidVersion
} from "../shared";
import {PostalCodeLocale} from "../shared/PostalCodeLocale";

export interface StringValidatorBuilder<T> extends CommonValidatorBuilder<T, string> {

    /**
     * Checks if a string contains a substring or seed.
     *
     * @param seed
     */
    contains(seed: string): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is alphanumeric.
     *
     * @param locale: AlphanumericLocale
     */
    isAlphanumeric(locale?: AlphanumericLocale): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string contains only letters (a-zA-Z).
     *
     * @param locale: AlphaLocale
     */
    isAlpha(locale?: AlphaLocale): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string contains ASCII chars only.
     */
    isAscii(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is Base64 encoded.
     */
    isBase64(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a boolean.
     */
    isBooleanString(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a valid currency amount.
     *
     * The optional parameter defaults to `CurrencyOptions: { symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_space_after_digits: false }`.
     *
     * @param options: CurrencyOptions
     */
    isCurrency(options?: CurrencyOptions): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string represents a decimal number, such as 0.1, .3, 1.1, 1 .00003, 4.0, etc.
     */
    isDecimalString(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is an email.
     *
     * The optional parameter defaults to `EmailOptions: { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true }`.
     *
     * @param options: EmailOptions
     */
    isEmail(options?: EmailOptions): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a fully qualified domain name (e.g. domain.com).
     *
     * The optional parameter is an option that defaults to `FqdnOptions: { require_tld: true, allow_underscores: false, allow_trailing_dot: false }`.
     *
     * If `allow_display_name` is set to `true`, the validator will also match `Display Name <email-address>`. If `require_display_name` is set to `true`, the validator will reject strings without the format `Display Name <email-address>`. If `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part. If `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched.
     *
     * @param options: FqdnOptions
     */
    isFqdn(options?: FqdnOptions): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a hexadecimal number.
     */
    isHexadecimal(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a valid ISO 8601 date.
     */
    isIso8601(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is valid JSON (note: uses `JSON.parse`).
     */
    isJson(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a postal code.
     *
     * If `locale` is set to `"any"`, will check if any of the locales match.
     *
     * @param locale: PostalCodeLocale
     */
    isPostalCode(locale: PostalCodeLocale): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a valid latitude-longitude coordinate.
     */
    isLatLong(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string has exactly the given `length`.
     *
     * @param length
     */
    hasLength(length: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string falls in a the `min` - `max` range.
     *
     * Length-check includes `min` and `max`.
     *
     * @param min
     * @param max
     */
    hasLengthBetween(min: number, max: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string has at least `min` length.
     *
     * @param min
     */
    hasMinLength(min: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string has at most `max` length.
     *
     * @param max
     */
    hasMaxLength(max: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is all lowercase.
     */
    isLowercase(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a mobile phone number.
     *
     * @param locale: MobilePhoneLocale
     */
    isMobilePhoneNo(locale: MobilePhoneLocale): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string contains only numbers.
     */
    isNumericString(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a URL.
     *
     * The optional parameter defaults to `UrlOptions: { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }`.
     *
     * @param options: UrlOptions
     */
    isUrl(options?: UrlOptions): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is all uppercase.
     */
    isUppercase(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string is a UUID.
     *
     * Optional `version` is one value of UuidVersion = "3" | "4" | "5" | "all"; Defaults to "all".
     *
     * @param version: UuidVersion
     */
    isUuid(version?: UuidVersion): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a string matches a pattern.
     *
     * @param pattern: the RegEx pattern
     * @param modifiers: optional `modifiers` are the same as a RegExp constructor would accept (e.g. "i" for ignore case, or "g" for global match, etc.)
     */
    matches(pattern: RegExp, modifiers?: string): this & ValidationOptionsBuilder<T>;
}
