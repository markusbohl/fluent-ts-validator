"use strict";

import {
    ValidationResult
} from "./";

import {
    ValidationRule
} from "./validation";

import {
    ValidatorBuilder,
    CommonValidatorBuilder,
    NumberValidatorBuilder,
    DateValidatorBuilder,
    ValidationOptionsBuilder
} from "./builder";

export abstract class AbstractValidator<T> {

    private rules: any[] = [];

    protected ruleFor<T>(lambdaExpression: (input: T) => number): CommonValidatorBuilder<T, number> & NumberValidatorBuilder<T>;
    protected ruleFor<T>(lambdaExpression: (input: T) => Date): CommonValidatorBuilder<T, Date> & DateValidatorBuilder<T>;
    protected ruleFor<T, TProperty>(lambdaExpression: (input: T) => TProperty): CommonValidatorBuilder<T, TProperty>;
    protected ruleFor<T, TProperty>(lambdaExpression: (input: T) => TProperty): ValidatorBuilder<T, TProperty> {
        let rule: ValidationRule<T, TProperty> = new ValidationRule(lambdaExpression);
        this.rules.push(rule);

        return new ValidatorBuilder<T, TProperty>(rule);
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