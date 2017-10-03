import * as validatorJS from "validator";
import {PropertyValidator} from "../PropertyValidator";
import {PostalCodeLocale} from "../../shared/PostalCodeLocale";

export class IsPostalCodeValidator implements PropertyValidator<string> {

    constructor(private locale: PostalCodeLocale) {}

    isValid(input: any | string): boolean {
        if (input) {
            return validatorJS.isPostalCode(input, this.locale);
        }

        return false;
    }
}
