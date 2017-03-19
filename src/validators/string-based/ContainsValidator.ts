import { PropertyValidator } from "../PropertyValidator";

import * as validatorJS from "validator";

export class ContainsValidator implements PropertyValidator<string> {

    constructor(private seed: string) { }

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        } else {
            return validatorJS.contains(input, this.seed);
        }
    }
}