"use strict";

import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsDateStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isDate(input);
    }
}