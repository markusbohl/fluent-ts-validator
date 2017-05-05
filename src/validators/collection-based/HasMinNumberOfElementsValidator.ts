import {PropertyValidator} from "../PropertyValidator";
import {CommonCollection} from "../../shared/CommonCollection";
import {hasLength, hasSize} from "./CollectionGuard";

export class HasMinNumberOfElementsValidator implements PropertyValidator<CommonCollection> {

    constructor(private minElementCount: number) {}

    isValid(input: CommonCollection): boolean {
        if (hasLength(input)) {
            return input.length >= this.minElementCount;
        } else if (hasSize(input)) {
            return input.size >= this.minElementCount;
        } else {
            return false;
        }
    }
}
