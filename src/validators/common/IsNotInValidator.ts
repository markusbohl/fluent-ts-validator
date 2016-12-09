"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given value is not in the array of allowed valuesl
 * 
 * @export
 * @class IsNotInValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsNotInValidator<T> implements PropertyValidator<T> {

    constructor(private array: Array<T>) {}

    isValid(input: T): boolean {
        return !this.array.some(value => value === input);
    }
}