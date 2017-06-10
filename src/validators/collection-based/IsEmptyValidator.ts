import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {hasLength} from "../../shared/HasLength";
import {hasSize} from "../../shared/HasSize";

export class IsEmptyValidator implements PropertyValidator<Iterable<any>> {

    isValid(input: Iterable<any> | undefined): boolean {
        if (hasLength(input)) {
            return input.length === 0;
        } else if (hasSize(input)) {
            return input.size === 0;
        } else {
            return false;
        }
    }
}
