import {PropertyValidator} from "../PropertyValidator";

export class IsUndefinedValidator implements PropertyValidator<any> {

    isValid(input: any): boolean {
        return typeof input === "undefined";
    }
}