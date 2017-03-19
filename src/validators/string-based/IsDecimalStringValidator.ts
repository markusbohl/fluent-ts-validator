import * as validatorJS from "validator";

import { PropertyValidator } from "../PropertyValidator";

export class IsDecimalStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isDecimal(input);
    }
}