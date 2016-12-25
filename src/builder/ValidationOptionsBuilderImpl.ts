"use strict";

import {
    Severity,
    ValidationFailure
} from "../shared";

import {
    ValidationRule,
    ValidationCondition,
    UnlessCondition,
    WhenCondition
} from "../validation";

import {
    ValidationOptionsBuilder
} from "./";

export class ValidationOptionsBuilderImpl<T> implements ValidationOptionsBuilder<T> {

    constructor(private validationRule: ValidationRule<T, any>) { }

    withErrorCode(errorCode: string): ValidationOptionsBuilder<T> {
        this.validationRule.setErrorCode(errorCode);
        return this;
    }

    withErrorMessage(errorMessage: string): ValidationOptionsBuilder<T> {
        this.validationRule.setErrorMessage(errorMessage);
        return this;
    }

    withSeverity(severity: Severity): ValidationOptionsBuilder<T> {
        this.validationRule.setSeverity(severity);
        return this;
    }

    withName(name: string): ValidationOptionsBuilder<T> {
        this.validationRule.setPropertyName(name);
        return this;
    }

    when(expression: (input: T) => boolean): ValidationOptionsBuilder<T> {
        this.validationRule.setCondition(new WhenCondition(expression));
        return this;
    }

    unless(expression: (input: T) => boolean): ValidationOptionsBuilder<T> {
        this.validationRule.setCondition(new UnlessCondition(expression));
        return this;
    }

    onFailure(callback: (failure: ValidationFailure) => void): ValidationOptionsBuilder<T> {
        this.validationRule.onFailure(callback);
        return this;
    }
}