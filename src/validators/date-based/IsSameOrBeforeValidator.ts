"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given date is same as or before than specified date.
 *
 * @export
 * @class IsSameOrBeforeValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsSameOrBeforeValidator implements PropertyValidator<Date> {

    constructor(private date: Date) { }

    isValid(input: Date): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return input.getTime() <= this.date.getTime();
    }
}