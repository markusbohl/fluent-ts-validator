import {IterableValidatorBuilder} from "./IterableValidatorBuilder";
import {CommonValidatorBuilderImpl} from "./CommonValidatorBuilderImpl";
import {ValidationRule} from "../validation/ValidationRule";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {ContainsElementValidator} from "../validators/collection-based/ContainsElementValidator";
import {DoesNotContainElementValidator} from "../validators/collection-based/DoesNotContainElementValidator";

export class IterableValidatorBuilderImpl<T, TProperty>
    extends CommonValidatorBuilderImpl<T, Iterable<TProperty>>
    implements IterableValidatorBuilder<T, TProperty> {

    constructor(validationRule: ValidationRule<T, Iterable<TProperty>>) {
        super(validationRule);
    }

    contains(element: TProperty): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new ContainsElementValidator(element));

        return this;
    }

    doesNotContain(element: TProperty): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new DoesNotContainElementValidator(element));

        return this;
    }
}
