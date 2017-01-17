"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { CurrencyOptions } from "../../shared";
import * as validatorJS from "validator";

export class IsCurrencyValidator implements PropertyValidator<string> {

    constructor(private options?: CurrencyOptions) { }

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isCurrency(input, this.options);
    }
}