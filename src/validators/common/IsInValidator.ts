import {PropertyValidator} from "../PropertyValidator";
import {isIterable} from "../../shared/IsIterable";

/**
 * Validates if given value is in a collection of allowed values.
 *
 * @export
 * @class IsInValidator
 * @implements {PropertyValidator<T>}
 * @template T
 */
export class IsInValidator<T> implements PropertyValidator<T> {

    constructor(private obj: Iterable<T> | any) {
    }

    isValid(input: any): boolean {
        if (isIterable(this.obj)) {
            return this.isElementOfIterable(input);
        } else {
            return this.isValueInObject(input);
        }
    }

    private isElementOfIterable(input: any): boolean {
        for (let element of this.obj) {
            if (element === input) {
                return true;
            }
        }
        return false;
    }

    private isValueInObject(input: any) {
        return Object.keys(this.obj).find(key => this.obj[key] === input) != null;
    }
}
