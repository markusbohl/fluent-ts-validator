import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given value is in array of allowed values.
 *
 * @export
 * @class IsInValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsInValidator<T> implements PropertyValidator<T> {

    constructor(private iterable: Iterable<T>) {
    }

    isValid(input: T): boolean {
        for (let element of this.iterable) {
            if (element === input) {
                return true;
            }
        }
        return false;
    }
}
