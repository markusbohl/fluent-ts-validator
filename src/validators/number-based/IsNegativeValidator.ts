import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given number is less than zero.
 *
 * @export
 * @class IsNegativeValidator
 * @implements {PropertyValidator<number>}
 */
export class IsNegativeValidator implements PropertyValidator<number> {

    isValid(input: number | undefined): boolean {
        if (input) {
            return input < 0;
        }

        return false;
    }
}
