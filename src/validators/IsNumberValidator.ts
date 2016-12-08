"use strict";

import { PropertyValidator } from "./PropertyValidator";

/**
 * Validates if input is a real number.
 * 
 * @export
 * @class IsNumberValidator
 * @implements {PropertyValidator<any>}
 */
export class IsNumberValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return input instanceof Number || typeof input === "number";
    }
}