import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsLowercaseValidator implements PropertyValidator<string> {

    isValid(input: string | undefined): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isLowercase(input);
    }
}
