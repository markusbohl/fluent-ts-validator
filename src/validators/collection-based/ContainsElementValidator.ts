import {PropertyValidator} from "../PropertyValidator";

export class ContainsElementValidator<TProperty> implements PropertyValidator<Iterable<TProperty>> {

    constructor(private seed: TProperty) {
    }

    isValid(input: Iterable<TProperty> | undefined): boolean {
        if (input) {
            for (let element of input) {
                if (element === this.seed) {
                    return true;
                }
            }
        }
        return false;
    }
}
