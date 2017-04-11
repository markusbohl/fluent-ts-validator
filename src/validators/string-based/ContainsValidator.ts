import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class ContainsValidator implements PropertyValidator<string> {

    constructor(private seed: string) {
    }

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.contains(input, this.seed);
        } else {
            return false;
        }
    }
}