import * as validatorJS from "validator";
import {PropertyValidator} from "../PropertyValidator";

export class IsDecimalStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isDecimal(input);
        }
        return false;
    }
}