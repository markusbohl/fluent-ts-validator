import {PropertyValidator} from "../PropertyValidator";

export class DoesNotContainElementValidator<TProperty> implements PropertyValidator<Iterable<TProperty>> {

    constructor(private nonSeed: TProperty) {
    }

    isValid(input: Iterable<TProperty> | undefined): boolean {
        if (input) {
            for (let element of input) {
                if (element === this.nonSeed) {
                    return false;
                }
            }

            return true;
        }
        return false;
    }
}
