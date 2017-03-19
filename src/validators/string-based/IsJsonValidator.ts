import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsJsonValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isJSON(input);
    }
}