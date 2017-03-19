import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if a value matches ("===") the comparison.
 * 
 * @export
 * @class IsEqualValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsEqualValidator<T> implements PropertyValidator<T> {

    constructor(private comparison: T) {}

    isValid(input: T) {
        return this.comparison === input;
    }
}