"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given number is greater than or equal to the threshold value.
 * 
 * @export
 * @class IsGreaterThanOrEqualToValidator
 * @implements {PropertyValidator<number>}
 */
export class IsGreaterThanOrEqualToValidator implements PropertyValidator<number> {

    constructor(private threshold: number) {}

    isValid(input: number): boolean {
        return input >= this.threshold;
    }
}