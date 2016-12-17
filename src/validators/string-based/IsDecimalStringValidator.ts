"use strict";

import * as validatorJS from "validator";

import { PropertyValidator } from "../PropertyValidator";

export class IsDecimalStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isDecimal(input);
    }
}