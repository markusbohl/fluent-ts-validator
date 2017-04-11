import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsIso8601Validator implements PropertyValidator<string> {
    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isISO8601(input);
        }
        return false;
    }
}