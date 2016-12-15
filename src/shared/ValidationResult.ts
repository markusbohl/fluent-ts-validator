"use strict";

import {
    ValidationFailure
} from "./";

export class ValidationResult {

    private failures: Array<ValidationFailure> = [];

    isValid(): boolean {
        return this.failures.length === 0;
    }

    addFailure(failure: ValidationFailure): void {
        if (failure) {
            this.failures.push(failure);
        }
    }

    getFailures(): ValidationFailure[] {
        return this.failures.slice();
    }
}