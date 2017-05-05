import {ValidationRule} from "../validation/ValidationRule";
import {HasNumberOfElementsValidator} from "../validators/collection-based/HasNumberOfElementsValidator";
import {CommonCollectionValidatorBuilder} from "./CommonCollectionValidatorBuilder";
import {CommonValidatorBuilderImpl} from "./CommonValidatorBuilderImpl";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export class CommonCollectionValidatorBuilderImpl<T, CommonCollection>
    extends CommonValidatorBuilderImpl<T, CommonCollection>
    implements CommonCollectionValidatorBuilder<T, CommonCollection> {

    constructor(validationRule: ValidationRule<T, CommonCollection>) {
        super(validationRule);
    }

    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new HasNumberOfElementsValidator(elementCount));

        return this;
    }

    hasMinNumberOfElements(min: number): this & ValidationOptionsBuilder<T> {
        throw new Error("Method not implemented.");
    }

    hasMaxNumberOfElements(max: number): this & ValidationOptionsBuilder<T> {
        throw new Error("Method not implemented.");
    }

    hasNumberOfElementsBetween(min: number, max: number): this & ValidationOptionsBuilder<T> {
        throw new Error("Method not implemented.");
    }
}
