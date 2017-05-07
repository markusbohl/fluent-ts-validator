import {PropertyValidator} from "../PropertyValidator";
import {hasLength, hasSize} from "../../shared/";

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
        if (this.isIterable(input)) {
            if (hasLength(input)) {
                return input.length === 0;
            } else if (hasSize(input)) {
                return input.size === 0;
            }
        }
        return false;
    }

    private isIterable(input: any): input is Iterable<any> {
        return input[Symbol.iterator] !== undefined;
    }
}
