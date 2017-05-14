import {PropertyValidator} from "../PropertyValidator";
import {isIterable, isIterableEmtpy} from "../../shared/";

/**
 *  Validates if given value is empty (=== '', === null, === undefined)
 *  or in case of certain iterables if they do not contain any element
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
        if (isIterable(input)) {
            return isIterableEmtpy(input);
        }
        return false;
    }
}
