import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given number is less than the threshold value.
 *
 * @export
 * @class IsLessThanValidator
 * @implements {PropertyValidator<number>}
 */
export class IsLessThanValidator implements PropertyValidator<number> {

    constructor(private threshold: number) {
    }

    isValid(input: number | undefined): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return input < this.threshold;
    }
}
