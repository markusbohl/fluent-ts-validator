import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given number is greater than zero.
 *
 * @export
 * @class IsPositiveValidator
 * @implements {PropertyValidator<number>}
 */
export class IsPositiveValidator implements PropertyValidator<number> {

    isValid(input: number | undefined): boolean {
        if (input) {
            return input > 0;
        }
        return false;
    }
}
