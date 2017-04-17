import {ValidationFailure} from "./";

export class ValidationResult {

    private failures: Array<ValidationFailure> = [];

    isValid(): boolean {
        return this.failures.length === 0;
    }

    isInvalid(): boolean {
        return !this.isValid();
    }

    addFailures(failures: ValidationFailure[]): void {
        if (failures) {
            this.failures = this.failures.concat(failures);
        }
    }

    getFailures(): ValidationFailure[] {
        return this.failures.slice(0);
    }
}