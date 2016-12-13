"use strict";

import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsBooleanStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isBoolean(input);
    }
}