"use strict";

import { ValidationOptionsBuilder } from "./builder/ValidationOptionsBuilder";
import { ValidatorBuilder } from "./builder/ValidatorBuilder";

export abstract class AbstractValidator<T> {

    protected ruleFor<T, TProperty>(lambdaExpression: (input: T) => TProperty): ValidatorBuilder<T, TProperty> {
        return null;
    }
}