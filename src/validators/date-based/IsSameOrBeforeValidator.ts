import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given date is same as or before than specified date.
 *
 * @export
 * @class IsSameOrBeforeValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsSameOrBeforeValidator implements PropertyValidator<Date> {

    constructor(private date: Date) {
    }

    isValid(input: Date | undefined): boolean {
        if (input) {
            return input.getTime() <= this.date.getTime();
        }
        return false;
    }
}
