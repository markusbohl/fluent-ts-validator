"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { EmailOptions } from "../../shared";

import * as validatorJS from "validator";

export class IsEmailValidator implements PropertyValidator<string> {

    constructor(private options?: EmailOptions) { }

    isValid(input: string): boolean {
        return input && validatorJS.isEmail(input, this.options);
    }
}