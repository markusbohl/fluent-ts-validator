import { PropertyValidator } from "../PropertyValidator";

/**
 *  Validates if given value is empty (=== '', === null, === undefined)
 *  or in case of collections (Array, Set, Map) if they do not contain any element
 *  (length === 0, size === 0).
 * 
 * @export
 * @class IsEmptyValidator
 * @implements {PropertyValidator<any>}
 */
export class IsEmptyValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input === "" || input === null || input === undefined ||
            this.isEmptyCollection(input);
    }

    private isEmptyCollection(input: any): boolean {
        return (input instanceof Array && input.length === 0) ||
            (input instanceof Set && input.size === 0) ||
            (input instanceof Map && input.size === 0);
    }
}