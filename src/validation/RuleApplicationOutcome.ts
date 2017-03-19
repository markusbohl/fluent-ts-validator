import { ValidationFailure } from "../shared/ValidationFailure";

export class RuleApplicationOutcome {

    private failures: ValidationFailure[] = [];

    constructor(private validationFailure?: ValidationFailure) {
        if (validationFailure) {
            this.addValidationFailure(validationFailure);
        }
    }

    isSuccess(): boolean {
        return this.failures.length === 0;
    }

    isFailure(): boolean {
        return !this.isSuccess();
    }

    addValidationFailure(failure: ValidationFailure): void {
        this.failures.push(failure);
    }

    getValidationFailures(): ValidationFailure[] {
        return this.failures.slice(0);
    }
}