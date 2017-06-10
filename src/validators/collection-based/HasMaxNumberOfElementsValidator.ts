import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {hasLength} from "../../shared/HasLength";
import {hasSize} from "../../shared/HasSize";

export class HasMaxNumberOfElementsValidator implements PropertyValidator<Iterable<any>> {

    constructor(private maxElementCount: number) {}

    isValid(input: Iterable<any> | undefined): boolean {
        if (hasLength(input)) {
            return input.length <= this.maxElementCount;
        } else if (hasSize(input)) {
            return input.size <= this.maxElementCount;
        } else {
            return false;
        }
    }
}
