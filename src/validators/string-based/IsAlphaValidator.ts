import {PropertyValidator} from "../PropertyValidator";
import {AlphaLocale} from "../../shared";
import * as validatorJS from "validator";

export class IsAlphaValidator implements PropertyValidator<string> {

    constructor(private locale?: AlphaLocale) {
    }

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isAlpha(input, this.locale);
    }
}