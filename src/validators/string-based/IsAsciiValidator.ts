"use strict";

import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsAsciiValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isAscii(input);
    }
}