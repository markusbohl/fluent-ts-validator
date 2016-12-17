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

    private rules: ValidationRule<T, any>[] = [];

    protected ruleFor(lambdaExpression: (input: T) => number): CommonValidatorBuilder<T, number> & NumberValidatorBuilder<T>;
    protected ruleFor(lambdaExpression: (input: T) => Date): CommonValidatorBuilder<T, Date> & DateValidatorBuilder<T>;
    protected ruleFor(lambdaExpression: (input: T) => string): CommonValidatorBuilder<T, string> & StringValidatorBuilder<T>;
    protected ruleFor<TProperty>(lambdaExpression: (input: T) => TProperty): CommonValidatorBuilder<T, TProperty>;
    protected ruleFor<TProperty>(lambdaExpression: (input: T) => TProperty): ValidatorBuilder<T, TProperty> {
        let rule: ValidationRule<T, TProperty> = new ValidationRule(lambdaExpression);
        this.rules.push(rule);

        return new ValidatorBuilder<T, TProperty>(rule);
    }

    validate(input: T): ValidationResult {
        let result = new ValidationResult();

        this.rules.forEach((rule: any) => {
            let outcome = rule.apply(input);

            if (outcome.isFailure()) {
                result.addFailure(outcome.getValidationFailure());
            }
        });

        return result;
    }

    validateAsync(input: T): Promise<ValidationResult> {
        return new Promise<ValidationResult>((resolve) => {
            let promises = this.createPromiseForEachRule(input, this.rules);

            Promise.all(promises).then((outcomes: RuleApplicationOutcome[]) => {
                resolve(this.buildValidationResultFrom(outcomes));
            });
        });
    }

    private createPromiseForEachRule(input: T, rules: ValidationRule<T, any>[]): Array<Promise<RuleApplicationOutcome>> {
        let promises = new Array<Promise<RuleApplicationOutcome>>();

        rules.forEach((rule: ValidationRule<T, any>) => {
            promises.push(this.applyRuleAsync(rule, input));
        });

        return promises;
    }

    private applyRuleAsync(rule: ValidationRule<T, any>, input: T): Promise<RuleApplicationOutcome> {
        return new Promise((resolve) => {
            resolve(rule.apply(input));
        });
    }

    private buildValidationResultFrom(outcomes: RuleApplicationOutcome[]): ValidationResult {
        let result = new ValidationResult();
        outcomes.forEach((outcome: RuleApplicationOutcome) => {
            if (outcome.isFailure()) {
                result.addFailure(outcome.getValidationFailure());
            }
        });
        return result;
    }
}