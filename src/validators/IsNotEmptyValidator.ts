"use strict";

import {
    PropertyValidator,
    IsEmptyValidator
} from "./";

/**
 * Validates if given value is not empty (!== '', !== null, !== undefined)
 *  or in case of collections (Array, Set, Map) if they do contain any elements
 *  (length > 0, size > 0).
 * 
 * @export
 * @class IsNotEmptyValidator
 * @implements {PropertyValidator<any>}
 */
export class IsNotEmptyValidator implements PropertyValidator<any> {

    private isEmptyValidator = new IsEmptyValidator();

    isValid(input: any): boolean {
        return !this.isEmptyValidator.isValid(input);
    }
}