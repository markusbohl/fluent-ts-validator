import {PropertyValidator} from "../PropertyValidator";
import {UrlOptions} from "../../shared/UrlOptions";
import * as validatorJS from "validator";

export class IsUrlValidator implements PropertyValidator<string> {

    constructor(private urlOptions?: UrlOptions) {
    }

    isValid(input: string | undefined): boolean {
        if (input) {
            return validatorJS.isURL(input, this.urlOptions);
        }
        return false;
    }
}
