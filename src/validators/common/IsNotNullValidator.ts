"use strict";

import { PropertyValidator } from "../PropertyValidator";

/**
 * Validates if a value is not null (!== undefined, !== null).
 * 
 * @export
 * @class IsNotNullValidator
 * @implements {PropertyValidator<any>}
 */
export class IsNotNullValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input;
    }
}