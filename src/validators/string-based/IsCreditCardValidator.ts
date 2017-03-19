import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsCreditCardValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isCreditCard(input);
        }
        return false;
    }
}