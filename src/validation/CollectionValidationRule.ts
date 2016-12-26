"use strict";

import {
    ValidationRule
} from "./";

import { RuleApplicationOutcome } from "./RuleApplicationOutcome";

export class CollectionValidationRule<T, TProperty extends Iterable<any>> extends ValidationRule<T, TProperty> {

    apply(input: T): RuleApplicationOutcome {
        let outcome = new RuleApplicationOutcome();

        if (this.isNoValidationRequired(input)) {
            return outcome;
        }

        for (let element of this.lambdaExpression(input)) {
            this.processElementValidation(input, element, outcome);
        }

        return outcome;
    }

    private processElementValidation(input: T, element: TProperty, outcome: RuleApplicationOutcome) {
        if (this.validators.some(validator => validator.isValid(element) === false)) {
            let failure = this.createValidationFailure(input, element);
            this.invokeCallbackWith(failure);
            outcome.addValidationFailure(failure);
        }
    }
}