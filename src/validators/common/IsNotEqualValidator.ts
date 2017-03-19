import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if a value does not match ("!==") the comparison.
 *
 * @export
 * @class IsNotEqualValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsNotEqualValidator<T> implements PropertyValidator<T> {

    constructor(private comparison: T) {
    }

    isValid(input: T) {
        return this.comparison !== input;
    }
}