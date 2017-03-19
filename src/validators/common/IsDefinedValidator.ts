import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if given value is defined.
 * 
 * @export
 * @class IsDefinedValidator
 * @implements {PropertyValidator<any>}
 */
export class IsDefinedValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return typeof input !== "undefined";
    }
}