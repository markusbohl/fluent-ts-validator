"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { AlphanumericLocale } from "../../shared";

import * as validatorJS from "validator";

export class IsAlphanumericValidator implements PropertyValidator<string> {

    constructor(private locale?: AlphanumericLocale) { }

    isValid(input: string): boolean {
        return validatorJS.isAlphanumeric(input, this.locale);
    }
}