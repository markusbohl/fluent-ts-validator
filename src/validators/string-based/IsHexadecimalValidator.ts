import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsHexadecimalValidator implements PropertyValidator<string> {
    isValid(input: string | undefined): boolean {
        if (input) {
            return validatorJS.isHexadecimal(input);
        }
        return false;
    }
}
