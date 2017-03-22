import {ValidationResult} from "./";

export interface Validatable<T> {
    validate(input: T): ValidationResult;
    validateAsync(input: T): Promise<ValidationResult>;
}