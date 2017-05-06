import {ValidationRule} from "../validation/ValidationRule";
import {
    IsEmptyValidator,
    IsNotEmptyValidator,
    HasMaxNumberOfElementsValidator,
    HasMinMaxNumberOfElementsValidator,
    HasMinNumberOfElementsValidator,
    HasNumberOfElementsValidator
} from "../validators/collection-based/index";
import {SizedIterableValidatorBuilder} from "./SizedIterableValidatorBuilder";
import {CommonValidatorBuilderImpl} from "./CommonValidatorBuilderImpl";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {SizedIterable} from "../shared/SizedIterable";

export class SizedIterableValidatorBuilderImpl<T, TProperty>
    extends CommonValidatorBuilderImpl<T, SizedIterable<TProperty>>
    implements SizedIterableValidatorBuilder<T, TProperty> {

    constructor(validationRule: ValidationRule<T, SizedIterable<TProperty>>) {
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
