import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given number is greater than the threshold value.
 * 
 * @export
 * @class IsGreaterThanValidator
 * @implements {PropertyValidator<number>}
 */
export class IsGreaterThanValidator implements PropertyValidator<number> {

    constructor(private threshold: number) {}

    isValid(input: number): boolean {
        return input > this.threshold;
    }
}