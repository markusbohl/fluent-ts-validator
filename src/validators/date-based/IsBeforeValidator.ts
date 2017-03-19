import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given date is before specified date.
 *
 * @export
 * @class IsBeforeValidator
 * @implements {PropertyValidator<Date>}
 */
export class IsBeforeValidator implements PropertyValidator<Date> {

    constructor(private date: Date) { }

    isValid(input: Date): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }

        return input.getTime() < this.date.getTime();
    }
}