import {PropertyValidator} from "../PropertyValidator";
import {hasLength} from "../../shared/HasLength";
import {hasSize} from "../../shared/HasSize";

export class HasMinNumberOfElementsValidator implements PropertyValidator<Iterable<any>> {

    constructor(private minElementCount: number) {
    }

    isValid(input: Iterable<any> | undefined): boolean {
        if (hasLength(input)) {
            return input.length >= this.minElementCount;
        } else if (hasSize(input)) {
            return input.size >= this.minElementCount;
        } else {
            return false;
        }
    }
}
