"use strict";

import {
    ValidationResult
} from "./";

import {
    ValidationRule
} from "./validation";

import {
    CommonValidatorBuilder,
    CommonValidatorBuilderImpl,
    ValidationOptionsBuilder
} from "./builder";

export abstract class AbstractValidator<T> {

    private rules: any[] = [];

    protected ruleFor<T, TProperty>(lambdaExpression: (input: T) => TProperty): CommonValidatorBuilder<T, TProperty> {
        let rule: ValidationRule<T, TProperty> = new ValidationRule(lambdaExpression);
        this.rules.push(rule);

        return new CommonValidatorBuilderImpl<T, TProperty>(rule);
    }

    validate(input: T): ValidationResult {
        let result = new ValidationResult();

        this.rules.forEach((element: any) => {
            let rule = element as ValidationRule<T, any>;
            let outcome = rule.apply(input);

            if (outcome.isFailure()) {
                result.addFailure(outcome.getValidationFailure());
            }
        });

        return result;
    }
}