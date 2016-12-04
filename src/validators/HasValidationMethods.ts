"use strict";

import {
    IsCurrencyOptions,
    IsURLOptions,
    IsEmailOptions,
    IsFQDNOptions
} from "./ValidationTypeOptions";

export interface HasValidationMethods {

    /**
     * Checks if value is defined ("!==undefined").
     */
    isDefined(value: any): boolean;
    /** 
     * Checks if value matches ("===") the comparison.
    */
    equals<T>(value: T, comparison: T): boolean;
    /** 
     * Checks if value does not match ("!==") the comparison.
     */
    notEquals<T>(value: T, comparison: T): boolean;
    /** 
     * Checks if given value is empty (=== '', === null, === undefined).
     */
    isEmpty(value: any): boolean;
    /** 
     * Checks if given value is not empty (!== '', !== null, !== undefined).
     */
    isNotEmpty(value: any): boolean;
    /** 
     * Checks if given value is in a array of allowed values.
     */
    isIn<T>(value: T, possibleValues: Array<T>): boolean;
    /** 
     * Checks if given value not in a array of allowed values.
     */
    isNotIn<T>(value: T, possibleValues: Array<T>): boolean;

    /**
     * Checks if a given value is a real boolean.
     */
    isBoolean(value: any): boolean;

    /**
     * Checks if a given value is a real date.
     */
    isDate(value: any): boolean;

    /**
     * Checks if a given value is a real string.
     */
    isString(value: any): boolean;

    /**
     * Checks if a given value is an array.
     */
    isArray(value: any): boolean;

    /**
     * Checks if a given value is a real number.
     */
    isNumber(value: any): boolean;

    /**
     * Checks if value is an integer.
     */
    isInt(value: any): boolean;


    /**
     * Checks if value is a number that's divisible by another.
     */
    isDivisibleBy(value: number, num: number): boolean;

    /**
     * Checks if the value is a positive number.
     */
    isPositive(value: number): boolean;

    /**
     * Checks if the value is a negative number.
     */
    isNegative(value: number): boolean;

    /**
     * Checks if the first number is greater than second.
     */
    max(num: number, max: number): boolean;

    /**
     * Checks if the first number is less than second.
     */
    min(num: number, min: number): boolean;


    /**
     * Checks if the value is a date that's after the specified date.
     */
    minDate(date: Date, minDate: Date): boolean;

    /**
     * Checks if the value is a date that's before the specified date.
     */
    maxDate(date: Date, minDate: Date): boolean;


    /**
     * Checks if a string is a boolean.
     */
    isBooleanString(str: string): boolean;

    /**
     * Checks if the string is a date.
     */
    isDateString(str: string): boolean;

    /**
     * Checks if the string is numeric.
     */
    isNumberString(str: string): boolean;


    /**
     * Checks if the string contains the seed.
     */
    contains(str: string, seed: string): boolean;

    /**
     * Checks if the string does not contain the seed.
     */
    notContains(str: string, seed: string): boolean;

    /**
     * Checks if the string contains only letters (a-zA-Z).
     */
    isAlpha(str: string): boolean;

    /**
     * Checks if the string contains only letters and numbers.
     */
    isAlphanumeric(str: string): boolean;

    /**
     * Checks if the string contains ASCII chars only.
     */
    isAscii(str: string): boolean;

    /**
     * Checks if a string is base64 encoded.
     */
    isBase64(str: string): boolean;

    /**
     * Checks if the string's length (in bytes) falls in a range.
     */
    isByteLength(str: string, min: number, max: number): boolean;

    /**
     * Checks if the string is a credit card.
     */
    isCreditCard(str: string): boolean;

    /**
     * Checks if the string is a valid currency amount.
     */
    isCurrency(str: string, options: IsCurrencyOptions): boolean;

    /**
     * Checks if the string is an email.
     */
    isEmail(str: string, options: IsEmailOptions): boolean;

    /**
     * Checks if the string is a fully qualified domain name (e.g. domain.com).
     */
    isFQDN(str: string, options: IsFQDNOptions): boolean;

    /**
     * Checks if the string contains any full-width chars.
     */
    isFullWidth(str: string): boolean;

    /**
     * Checks if the string contains any half-width chars.
     */
    isHalfWidth(str: string): boolean;

    /**
     * Checks if the string contains variable-width chars.
     */
    isVariableWidth(str: string): boolean;

    /**
     * Checks if the string is a hexadecimal color.
     */
    isHexColor(str: string): boolean;

    /**
     * Checks if the string is a hexadecimal number.
     */
    isHexadecimal(str: string): boolean;

    /**
     * Checks if the string is an IP (version 4 or 6).
     */
    isIP(str: string, version: "4" | "6"): boolean;

    /**
     * Checks if the string is an ISBN (version 10 or 13).
     */
    isISBN(str: string, version: "10" | "13"): boolean;

    /**
     * Checks if the string is an ISIN (stock/security identifier).
     */
    isISIN(str: string): boolean;

    /**
     * Checks if the string is a valid ISO 8601 date.
     */
    isISO8601(str: string): boolean;

    /**
     * Checks if the string is valid JSON (note: uses JSON.parse).
     */
    isJSON(str: string): boolean;

    /**
     * Checks if the string is lowercase.
     */
    isLowercase(str: string): boolean;

    /**
     * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
     */
    isMongoId(str: string): boolean;

    /**
     * Checks if the string contains one or more multibyte chars.
     */
    isMultibyte(str: string): boolean;

    /**
     * Checks if the string contains any surrogate pairs chars.
     */
    isSurrogatePair(str: string): boolean;

    /**
     * Checks if the string is an url.
     */
    isURL(str: string, options: IsURLOptions): boolean;

    /**
     * Checks if the string is a UUID (version 3, 4 or 5).
     */
    isUUID(str: string, version: "3" | "4" | "5"): boolean;

    /**
     * Checks if the string is uppercase.
     */
    isUppercase(str: string): boolean;

    /**
     * Checks if the string's length falls in a range.
     */
    length(str: string, min: number, max: number): boolean;

    /**
     * Checks if the string's length is not less than given number.
     */
    minLength(str: string, min: number): boolean;

    /**
     * Checks if the string's length is not more than given number.
     */
    maxLength(str: string, max: number): boolean;

    /**
     * Checks if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
     */
    matches(str: string, pattern: string, modifiers?: string): boolean;

    /**
     * Checks if the string is a valid representation of military time in the format HH:MM.
     */
    isMilitaryTime(str: string): boolean;


    /**
     * Checks if array contains all values from the given array of values.
     */
    arrayContains<T>(array: Array<T>, values: T): boolean;

    /**
     * Checks if array does not contain any of the given values.
     */
    arrayNotContains<T>(array: Array<T>, values: T): boolean;

    /**
     * Checks if given array is not empty.
     */
    arrayNotEmpty(array: Array<any>): boolean;

    /**
     * Checks if array's length is at least `min` number.
     */
    arrayMinSize(array: Array<any>, min: number): boolean;

    /**
     * Checks if array's length is as most `max` number.
     */
    arrayMaxSize(array: Array<any>, max: number): boolean;

    /**
     * Checks if all array's values are unique. Comparison for objects is reference-based.
     */
    arrayUnique(array: Array<any>): boolean;

}