import {ValidationRule} from "../validation/ValidationRule";
import {
    IsEmptyValidator,
    IsNotEmptyValidator,
    HasMaxNumberOfElementsValidator,
    HasMinMaxNumberOfElementsValidator,
    HasMinNumberOfElementsValidator,
    HasNumberOfElementsValidator
} from "../validators/collection-based/index";
import {CommonCollectionValidatorBuilder} from "./CommonCollectionValidatorBuilder";
import {CommonValidatorBuilderImpl} from "./CommonValidatorBuilderImpl";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export class CommonCollectionValidatorBuilderImpl<T, CommonCollection>
    extends CommonValidatorBuilderImpl<T, CommonCollection>
    implements CommonCollectionValidatorBuilder<T, CommonCollection> {

    constructor(validationRule: ValidationRule<T, CommonCollection>) {
        super(validationRule);
    }

    isEmpty(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsEmptyValidator());

        return this;
    }

    isNotEmpty(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNotEmptyValidator());

        return this;
    }

    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new HasNumberOfElementsValidator(elementCount));

        return this;
    }

    hasMinNumberOfElements(minElementCount: number): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new HasMinNumberOfElementsValidator(minElementCount));

        return this;
    }

    hasMaxNumberOfElements(maxElementCount: number): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new HasMaxNumberOfElementsValidator(maxElementCount));

        return this;
    }

    hasNumberOfElementsBetween(minElementCount: number, maxElementCount: number): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new HasMinMaxNumberOfElementsValidator(minElementCount, maxElementCount));

        return this;
    }
}
