import {PropertyValidator} from "../PropertyValidator";
import {CommonCollection} from "../../shared/CommonCollection";
import {hasLength, hasSize} from "./CollectionGuard";

export class IsEmptyValidator implements PropertyValidator<CommonCollection> {

    isValid(input: CommonCollection): boolean {
        if (hasLength(input)) {
            return input.length === 0;
        } else if (hasSize(input)) {
            return input.size === 0;
        } else {
            return false;
        }
    }
}
