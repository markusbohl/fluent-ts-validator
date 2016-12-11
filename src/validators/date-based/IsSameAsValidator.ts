"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given date is same as specified date.
 * 
 * @export
 * @class IsSameAsValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsSameAsValidator implements PropertyValidator<Date> {

    constructor(private date: Date) {}

    isValid(input: Date): boolean {
        return input.getTime() === this.date.getTime();
    }
}