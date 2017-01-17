"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if the given date lies between the lower and upper boundary.
 *
 * It can be specified whether the lower and/or upper boundary should be in- or excluded.
 *
 * '(' indicates exclusion of the lower boundary.
 * '[' indicates inclusion of the lower boundary.
 * ')' indicates exclusion of the upper boundary.
 * ']' indicates inclusion of the upper boundary.
 *
 * The IsBetweenValidator defaults to exclusion - ().
 *
 * @export
 * @class IsBetweenValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsBetweenValidator implements PropertyValidator<Date> {

    constructor(private lowerDate: Date, private upperDate: Date, private lowerBoundary: "(" | "[" = "(", private upperBoundary: ")" | "]" = ")") { }

    isValid(input: Date): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        } else if (this.lowerBoundary === "[" && this.upperBoundary === "]") {
            return this.lowerDate.getTime() <= input.getTime() && input.getTime() <= this.upperDate.getTime();
        } else if (this.lowerBoundary === "[" && this.upperBoundary === ")") {
            return this.lowerDate.getTime() <= input.getTime() && input.getTime() < this.upperDate.getTime();
        } else if (this.lowerBoundary === "(" && this.upperBoundary === "]") {
            return this.lowerDate.getTime() < input.getTime() && input.getTime() <= this.upperDate.getTime();
        } else {
            return this.lowerDate.getTime() < input.getTime() && input.getTime() < this.upperDate.getTime();
        }
    }
}