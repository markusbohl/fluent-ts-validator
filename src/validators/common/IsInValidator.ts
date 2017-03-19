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

    constructor(private array: Array<T>) {
    }

    isValid(input: T): boolean {
        return this.array.some((value => value === input));
    }
}