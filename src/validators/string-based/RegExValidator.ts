"use strict";

import { PropertyValidator } from "../PropertyValidator";
import * as validatorJS from "validator";

export class RegExValidator implements PropertyValidator<string> {

    constructor(private pattern: RegExp, private modifiers?: string) { }

    isValid(input: string): boolean {
        return validatorJS.matches(input, this.pattern, this.modifiers);
    }
}