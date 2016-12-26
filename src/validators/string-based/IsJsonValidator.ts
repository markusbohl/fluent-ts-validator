"use strict";

import { PropertyValidator } from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsJsonValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isJSON(input);
    }
}