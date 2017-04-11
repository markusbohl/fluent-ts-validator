import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given value is a real boolean.
 *
 * @export
 * @class IsBooleanValidator
 * @implements {PropertyValidator<any>}
 */
export class IsBooleanValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input instanceof Boolean || typeof input === "boolean";
    }
}