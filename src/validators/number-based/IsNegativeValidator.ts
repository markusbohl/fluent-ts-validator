"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given number is less than zero.
 * 
 * @export
 * @class IsNegativeValidator
 * @implements {PropertyValidator<number>}
 */
export class IsNegativeValidator implements PropertyValidator<number> {

    isValid(input: number): boolean {
        return input < 0;
    }
}