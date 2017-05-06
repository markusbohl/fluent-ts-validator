import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {hasLength, hasSize} from "./CollectionGuard";

export class HasMaxNumberOfElementsValidator implements PropertyValidator<SizedIterable<any>> {

    constructor(private maxElementCount: number) {}

    isValid(input: SizedIterable<any>): boolean {
        if (hasLength(input)) {
            return input.length <= this.maxElementCount;
        } else if (hasSize(input)) {
            return input.size <= this.maxElementCount;
        } else {
            return false;
        }
    }
}
