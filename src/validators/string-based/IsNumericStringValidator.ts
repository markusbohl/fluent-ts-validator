"use strict";

import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsNumericStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isNumeric(input);
    }
}