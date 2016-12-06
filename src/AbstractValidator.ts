"use strict";

import { ValidationOptionsBuilder } from "./builder/ValidationOptionsBuilder";
import { ValidatorBuilder } from "./builder/ValidatorBuilder";
import { ValidatorBuilderImpl } from "./builder/ValidatorBuilderImpl";
import { ValidationResult } from "./validation/ValidationResult";
import { ValidationRule } from "./validation/ValidationRule";

export abstract class AbstractValidator<T> {

    private rules: any[] = [];

    protected ruleFor<T, TProperty>(lambdaExpression: (input: T) => TProperty): ValidatorBuilder<T, TProperty> {
        let rule: ValidationRule<T, TProperty> = new ValidationRule(lambdaExpression);
        this.rules.push(rule);

        return new ValidatorBuilderImpl<T, TProperty>(rule);
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