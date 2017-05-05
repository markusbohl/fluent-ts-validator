import {PropertyValidator} from "../PropertyValidator";
import {CommonCollection} from "../../shared/CommonCollection";
import {hasLength, hasSize} from "./CollectionGuard";

export class HasMaxNumberOfElementsValidator implements PropertyValidator<CommonCollection> {

    constructor(private maxElementCount: number) {}

    isValid(input: CommonCollection): boolean {
        if (hasLength(input)) {
            return input.length <= this.maxElementCount;
        } else if (hasSize(input)) {
            return input.size <= this.maxElementCount;
        } else {
            return false;
        }
    }
}
