import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given value is not in the array of allowed values.
 *
 * @export
 * @class IsNotInValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsNotInValidator<T> implements PropertyValidator<T> {

    constructor(private iterable: Iterable<T>) {
    }

    isValid(input: T): boolean {
        for (let element of this.iterable) {
            if (element === input) {
                return false;
            }
        }
        return true;
    }
}
