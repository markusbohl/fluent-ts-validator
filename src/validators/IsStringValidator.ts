"use strict";

import { PropertyValidator } from "./PropertyValidator";

/**
 * Validates if input is a real string.
 * 
 * @export
 * @class IsStringValidator
 * @implements {PropertyValidator<any>}
 */
export class IsStringValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input instanceof String || typeof input === "string";
    }
}