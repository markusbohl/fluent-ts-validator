"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { LengthOptions } from "../../shared/LengthOptions";

import * as validatorJS from "validator";

export class IsLengthValidator implements PropertyValidator<string> {

    constructor(private options: LengthOptions) { }

    isValid(input: string): boolean {
        return validatorJS.isLength(input, this.options);
    }
}