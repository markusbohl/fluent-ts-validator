import {ValidationRule} from './';
import {RuleApplicationOutcome} from './RuleApplicationOutcome';

export class CollectionValidationRule<T, TProperty extends Iterable<any>> extends ValidationRule<T, TProperty> {

    apply(input: T): RuleApplicationOutcome {
        const outcome = new RuleApplicationOutcome();
        const collection = this.lambdaExpressionResultWith(input);

        if (this.isNoValidationRequired(input) || collection == null) {
            return outcome;
        }

        for (let element of collection) {
            this.processElementValidation(input, element, outcome);
        }

        return outcome;
    }

    private processElementValidation(input: T, element: any, outcome: RuleApplicationOutcome) {
        if (this.validators.some(validator => validator.isValid(element) === false)) {
            const failure = this.createValidationFailure(input, element);
            this.invokeCallbackWith(failure);
            outcome.addValidationFailure(failure);
        }
    }
}
