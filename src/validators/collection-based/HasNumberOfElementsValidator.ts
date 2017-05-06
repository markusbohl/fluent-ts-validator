import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {hasLength, hasSize} from "./CollectionGuard";

export class HasNumberOfElementsValidator implements PropertyValidator<SizedIterable<any>> {

    constructor(private numberOfElements: number) {
    }

    isValid(input: SizedIterable<any>): boolean {
        if (hasLength(input)) {
            return input.length === this.numberOfElements;
        } else if (hasSize(input)) {
            return input.size === this.numberOfElements;
        } else {
            return false;
        }
    }
}
