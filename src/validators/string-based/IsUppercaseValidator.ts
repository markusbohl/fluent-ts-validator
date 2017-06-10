import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsUppercaseValidator implements PropertyValidator<string> {

    isValid(input: string | undefined): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isUppercase(input);
    }
}
