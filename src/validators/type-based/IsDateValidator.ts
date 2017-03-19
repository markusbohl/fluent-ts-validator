import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if input is a real Date.
 *
 * @export
 * @class IsDateValidator
 * @implements {PropertyValidator<any>}
 */
export class IsDateValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input instanceof Date;
    }
}