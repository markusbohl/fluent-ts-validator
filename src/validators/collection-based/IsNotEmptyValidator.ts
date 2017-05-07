import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {hasLength} from "../../shared/HasLength";
import {hasSize} from "../../shared/HasSize";

export class IsNotEmptyValidator implements PropertyValidator<SizedIterable<any>> {

    isValid(input: SizedIterable<any>): boolean {
        if (hasLength(input)) {
            return input.length > 0;
        } else if (hasSize(input)) {
            return input.size > 0;
        } else {
            return false;
        }
    }
}
