import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {hasLength} from "../../shared/HasLength";
import {hasSize} from "../../shared/HasSize";

export class HasMinNumberOfElementsValidator implements PropertyValidator<SizedIterable<any>> {

    constructor(private minElementCount: number) {}

    isValid(input: SizedIterable<any>): boolean {
        if (hasLength(input)) {
            return input.length >= this.minElementCount;
        } else if (hasSize(input)) {
            return input.size >= this.minElementCount;
        } else {
            return false;
        }
    }
}
