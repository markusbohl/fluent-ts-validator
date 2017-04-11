import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsBooleanStringValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isBoolean(input);
        }
        return false;
    }
}