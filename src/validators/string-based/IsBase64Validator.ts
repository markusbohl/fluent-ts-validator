"use strict";

import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsBase64Validator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isBase64(input);
    }
}