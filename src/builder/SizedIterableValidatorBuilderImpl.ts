import {ValidationRule} from "../validation/ValidationRule";
import {
    ContainsElementValidator,
    DoesNotContainElementValidator,
    HasMaxNumberOfElementsValidator,
    HasMinMaxNumberOfElementsValidator,
    HasMinNumberOfElementsValidator,
    HasNumberOfElementsValidator,
    IsEmptyValidator,
    IsNotEmptyValidator
} from "../validators/collection-based";
import {CommonValidatorBuilderImpl} from "./CommonValidatorBuilderImpl";
import {SizedIterableValidatorBuilder} from "./SizedIterableValidatorBuilder";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {IterableValidationOptionsBuilder} from "./IterableValidationOptionsBuilder";
import {WhenNotEmptyCondition} from "../validation/WhenNotEmptyCondition";


export class SizedIterableValidatorBuilderImpl<T, TProperty>
    extends CommonValidatorBuilderImpl<T, Iterable<TProperty>>
    implements SizedIterableValidatorBuilder<T, TProperty>, IterableValidationOptionsBuilder<T> {

    constructor(validationRule: ValidationRule<T, Iterable<TProperty>>) {
        super(validationRule);
    }

    whenNotEmpty(): IterableValidationOptionsBuilder<T> {
        this.validationRule.addCondition(new WhenNotEmptyCondition(this.validationRule.lambdaExpression));

        return this;
    }

    contains(element: TProperty): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new ContainsElementValidator(element));

        return this;
    }

    doesNotContain(element: TProperty): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new DoesNotContainElementValidator(element));

        return this;
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
