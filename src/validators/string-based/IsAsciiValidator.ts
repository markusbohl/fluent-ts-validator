import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsAsciiValidator implements PropertyValidator<string> {

    isValid(input: string | undefined): boolean {
        if (input) {
            return validatorJS.isAscii(input);
        }
        return false;
    }
}
