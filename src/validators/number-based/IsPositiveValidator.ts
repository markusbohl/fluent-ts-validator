"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given number is greater than zero.
 * 
 * @export
 * @class IsPositiveValidator
 * @implements {PropertyValidator<number>}
 */
export class IsPositiveValidator implements PropertyValidator<number> {

    isValid(input: number): boolean {
        return input > 0;
    }
}