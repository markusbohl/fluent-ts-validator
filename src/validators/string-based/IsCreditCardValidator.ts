"use strict";

import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class IsCreditCardValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isCreditCard(input);
    }
}