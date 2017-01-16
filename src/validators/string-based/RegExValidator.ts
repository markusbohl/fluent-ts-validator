"use strict";

import { PropertyValidator } from "../PropertyValidator";
import * as validatorJS from "validator";

export class RegExValidator implements PropertyValidator<string> {

    constructor(private pattern: RegExp, private modifiers?: string) { }

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.matches(input, this.pattern, this.modifiers);
    }
}