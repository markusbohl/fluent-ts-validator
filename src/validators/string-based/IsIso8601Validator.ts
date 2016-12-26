"use strict";

import { PropertyValidator } from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsIso8601Validator implements PropertyValidator<string> {
    isValid(input: string): boolean {
        return validatorJS.isISO8601(input);
    }
}