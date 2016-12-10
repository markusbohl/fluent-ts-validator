"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given number is less than or equal to the threshold value.
 * 
 * @export
 * @class IsLessThanOrEqualValidator
 * @implements {PropertyValidator<number>}
 */
export class IsLessThanOrEqualValidator implements PropertyValidator<number> {

    constructor(private threshold: number) {}

    isValid(input: number): boolean {
        return input <= this.threshold;
    }
}