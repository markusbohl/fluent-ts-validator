import {PropertyValidator} from "../PropertyValidator";
import {isIterable} from "../../shared/IsIterable";

/**
 * Validates if given value is not in a collection of allowed values or in an object/enum.
 *
 * @export
 * @class IsNotInValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsNotInValidator<T> implements PropertyValidator<T> {

    constructor(private obj: Iterable<T> | any) {
    }

    isValid(input: T): boolean {
        if (isIterable(this.obj)) {
            return this.isElementNotInIterable(input);
        } else {
            return this.isValueNotInObject(input);
        }
    }

    private isElementNotInIterable(input: any) {
        for (let element of this.obj) {
            if (element === input) {
                return false;
            }
        }
        return true;
    }

    private isValueNotInObject(input: any) {
        return Object.keys(this.obj).find(key => this.obj[key] === input) == null;
    }
}
