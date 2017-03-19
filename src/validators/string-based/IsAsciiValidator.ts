import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsAsciiValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isAscii(input);
    }
}