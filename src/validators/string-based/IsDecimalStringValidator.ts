import * as validatorJS from "validator";
import {PropertyValidator} from "../PropertyValidator";

export class IsDecimalStringValidator implements PropertyValidator<string> {

    isValid(input: string | undefined): boolean {
        if (input) {
            return validatorJS.isDecimal(input);
        }
        return false;
    }
}
