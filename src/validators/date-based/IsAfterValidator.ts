import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given date is after specified date.
 *
 * @export
 * @class IsAfterValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsAfterValidator implements PropertyValidator<Date> {

    constructor(private date: Date) {
    }

    isValid(input: Date): boolean {
        if (input) {
            return input.getTime() > this.date.getTime();
        }
        return false;
    }
}