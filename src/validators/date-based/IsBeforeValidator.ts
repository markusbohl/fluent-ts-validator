import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given date is before specified date.
 *
 * @export
 * @class IsBeforeValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsBeforeValidator implements PropertyValidator<Date> {

    constructor(private date: Date) {
    }

    isValid(input: Date): boolean {
        if (input) {
            return input.getTime() < this.date.getTime();
        }
        return false;
    }
}