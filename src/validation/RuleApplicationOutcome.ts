"use strict";

import { ValidationFailure } from "./ValidationFailure";

export class RuleApplicationOutcome {

    constructor(private validationFailure?: ValidationFailure) { }

    isSuccess(): boolean {
        if (this.validationFailure) {
            return false;
        }
        return true;
    }

    isFailure(): boolean {
        return !this.isSuccess();
    }

    getValidationFailure(): ValidationFailure {
        if (this.validationFailure) {
            return this.validationFailure;
        }
        return null;
    }
}