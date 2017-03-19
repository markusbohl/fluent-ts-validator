import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if input is an Array.
 * 
 * @export
 * @class IsArrayValidator
 * @implements {PropertyValidator<any>}
 */
export class IsArrayValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input instanceof Array;
    }
}