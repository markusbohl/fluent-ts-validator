import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsJsonValidator implements PropertyValidator<string> {

    isValid(input: string | undefined): boolean {
        if (input) {
            return validatorJS.isJSON(input);
        }
        return false;
    }
}
