import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsNumericStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isNumeric(input);
    }
}