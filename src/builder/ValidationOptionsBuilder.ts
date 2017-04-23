import {Severity, ValidationFailure} from "../shared";

export interface ValidationOptionsBuilder<T> {
    withFailureCode(code: string): ValidationOptionsBuilder<T>;
    withFailureMessage(message: string): ValidationOptionsBuilder<T>;
    withSeverity(severity: Severity): ValidationOptionsBuilder<T>;
    withPropertyName(name: string): ValidationOptionsBuilder<T>;
    when(expression: (input: T) => boolean): ValidationOptionsBuilder<T>;
    whenDefined(expression: (input: T) => any): ValidationOptionsBuilder<T>;
    whenNotNull(expression: (input: T) => any): ValidationOptionsBuilder<T>;
    whenNotEmpty(expression: (input: T) => any): ValidationOptionsBuilder<T>;
    unless(expression: (input: T) => boolean): ValidationOptionsBuilder<T>;
    onFailure(callback: (failure: ValidationFailure) => void): ValidationOptionsBuilder<T>;
}
