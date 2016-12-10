"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given number is less than the threshold value.
 * 
 * @export
 * @class IsLessThanValidator
 * @implements {PropertyValidator<number>}
 */
export class IsLessThanValidator implements PropertyValidator<number> {

    constructor(private threshold: number) {}

    isValid(input: number): boolean {
        return input < this.threshold;
    }
}