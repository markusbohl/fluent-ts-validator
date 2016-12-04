"use strict";

import { Severity } from "../validation/Severity";
import { ValidationCondition } from "../validation/ValidationCondition";
import { ValidationFailure } from "../validation/ValidationFailure";

export interface ValidationOptionsBuilder<T> {
    withErrorCode(errorCode: string): ValidationOptionsBuilder<T>;
    withErrorMessage(errorMessage: string): ValidationOptionsBuilder<T>;
    withSeverity(severity: Severity): ValidationOptionsBuilder<T>;
    withCondition(condition: ValidationCondition<T>): ValidationOptionsBuilder<T>;
    onFailure(callback: (failure: ValidationFailure) => void): ValidationOptionsBuilder<T>;
}