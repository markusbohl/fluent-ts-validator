import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsDateStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isDate(input);
        }
        return false;
    }
}