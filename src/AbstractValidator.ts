"use strict";

import { RuleBuilder } from "./builder/RuleBuilder";

export abstract class AbstractValidator<T> {

    ruleFor<T, TProperty>(lambdaExpression: (input: T) => TProperty): RuleBuilder<T, TProperty> {
        return null;
    }
}