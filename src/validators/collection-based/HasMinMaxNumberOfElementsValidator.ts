import {PropertyValidator} from "../PropertyValidator";
import {SizedIterable} from "../../shared/SizedIterable";
import {HasMinNumberOfElementsValidator} from "./HasMinNumberOfElementsValidator";
import {HasMaxNumberOfElementsValidator} from "./HasMaxNumberOfElementsValidator";

export class HasMinMaxNumberOfElementsValidator implements PropertyValidator<Iterable<any>> {

    private minValidator: HasMinNumberOfElementsValidator;
    private maxValidator: HasMaxNumberOfElementsValidator;

    constructor(minElementCount: number, maxElementCount: number) {
        this.minValidator = new HasMinNumberOfElementsValidator(minElementCount);
        this.maxValidator = new HasMaxNumberOfElementsValidator(maxElementCount);
    }

    isValid(input: Iterable<any>): boolean {
        return this.minValidator.isValid(input) && this.maxValidator.isValid(input);
    }
}
