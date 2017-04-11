import {PropertyValidator} from "../PropertyValidator";
import {FqdnOptions} from "../../shared";
import * as validatorJS from "validator";

export class IsFqdnValidator implements PropertyValidator<string> {

    constructor(private options?: FqdnOptions) {
    }

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isFQDN(input, this.options);
        }
        return false;
    }
}