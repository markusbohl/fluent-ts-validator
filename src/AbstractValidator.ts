"use strict";

import {
    Validatable,
    ValidationResult
} from "./shared";

import {
    ValidationRule,
    RuleApplicationOutcome
} from "./validation";

import {
    ValidatorBuilder,
    CommonValidatorBuilder,
    NumberValidatorBuilder,
    StringValidatorBuilder,
    DateValidatorBuilder,
    ValidationOptionsBuilder
} from "./builder";

/**
 * Abstract base class for all custom validators.
 * 
 * @export
 * @abstract
 * @class AbstractValidator
 * @template T
 */
export abstract class AbstractValidator<T> implements Validatable<T> {

    private rules: any[] = [];

    protected ruleFor<T>(lambdaExpression: (input: T) => number): CommonValidatorBuilder<T, number> & NumberValidatorBuilder<T>;
    protected ruleFor<T>(lambdaExpression: (input: T) => Date): CommonValidatorBuilder<T, Date> & DateValidatorBuilder<T>;
    protected ruleFor<T>(lambdaExpression: (input: T) => string): CommonValidatorBuilder<T, string> & StringValidatorBuilder<T>;
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

    validateAsync(input: T): Promise<ValidationResult> {
        return new Promise<ValidationResult>((resolve) => {
            let promises = new Array<Promise<RuleApplicationOutcome>>();

            this.rules.forEach((element: any) => {
                let rule = element as ValidationRule<T, any>;
                promises.push(this.applyRuleAsync(rule, input));
            });

            Promise.all(promises).then((outcomes: RuleApplicationOutcome[]) => {
                let result = new ValidationResult();
                outcomes.forEach((outcome: RuleApplicationOutcome) => {
                    if (outcome.isFailure()) {
                        result.addFailure(outcome.getValidationFailure());
                    }
                });
                resolve(result);
            });
        });
    }

    private applyRuleAsync(rule: ValidationRule<T, any>, input: T): Promise<RuleApplicationOutcome> {
        return new Promise((resolve) => {
            resolve(rule.apply(input));
        });
    }
}