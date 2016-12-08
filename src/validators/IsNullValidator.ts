"use strict";

import { PropertyValidator } from "./PropertyValidator";

/**
 * Validates if a value is null (=== null).
 * 
 * @export
 * @class IsNullValidator
 * @implements {PropertyValidator<any>}
 */
export class IsNullValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input === null;
    }
}