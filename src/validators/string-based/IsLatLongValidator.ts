import * as validatorJS from "validator";
import {PropertyValidator} from "../PropertyValidator";

export class IsLatLongValidator implements PropertyValidator<string> {

    isValid(input: any | string): boolean {
        if (input) {
            return validatorJS.isLatLong(input);
        }

        return false;
    }
}
