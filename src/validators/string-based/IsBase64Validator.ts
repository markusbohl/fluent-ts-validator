import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsBase64Validator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isBase64(input);
    }
}