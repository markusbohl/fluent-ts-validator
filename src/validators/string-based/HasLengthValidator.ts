import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class HasLengthValidator implements PropertyValidator<string> {

    constructor(private options: {min?: number, max?: number}) {
    }

    isValid(input: string | undefined): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isLength(input, this.options);
    }
}
