import {PropertyValidator} from "../PropertyValidator";
import {UuidVersion} from "../../shared/";
import * as validatorJS from "validator";

export class IsUuidValidator implements PropertyValidator<string> {

    constructor(private version?: UuidVersion) {
    }

    isValid(input: string | undefined): boolean {
        if (input) {
            return validatorJS.isUUID(input, this.version);
        }
        return false;
    }
}
