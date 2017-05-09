import {Severity, ValidationFailure} from "../shared";

export interface ValidationOptionsBuilder<T> {

    /**
     * In case validation fails, `code` will be available in a corresponding @{ValidationFailure} instance.
     *
     * Defaults to `undefined` if not set.
     *
     * @param code: a failure code
     */
    withFailureCode(code: string): ValidationOptionsBuilder<T>;

    /**
     * In case validation fails, `message` will be available in a corresponding @{ValidationFailure} instance.
     *
     * Defaults to '$propertyName is invalid' if not set.
     *
     * @param message: an error message
     */
    withFailureMessage(message: string): ValidationOptionsBuilder<T>;

    /**
     * In case validation fails, `severity` will be available in a corresponding @{ValidationFailure} instance.
     *
     * Defaults to @type{Severity.ERROR} if not set.
     *
     * @param severity
     */
    withSeverity(severity: Severity): ValidationOptionsBuilder<T>;

    /**
     * In case validation fails, `propertyName` will be available in a corresponding @{ValidationFailure} instance.
     *
     * If not set, the name of the property under validation is determined automatically.
     * Nevertheless, it might sometimes be useful to explicitly set the name for the sake of clarity.
     * (e.g. when working with minified code)
     *
     * @param name: name of the validated property
     */
    withPropertyName(name: string): ValidationOptionsBuilder<T>;

    /**
     * Validation is performed when the property under validation is not `undefined`.
     */
    whenDefined(): ValidationOptionsBuilder<T>;

    /**
     * Validation is performed when the property under validation is neither `undefined` nor `null`.
     */
    whenNotNull(): ValidationOptionsBuilder<T>;

    /**
     * Validation is performed when `expression` evaluates to true.
     *
     * @param expression
     */
    when(expression: (input: T) => boolean): ValidationOptionsBuilder<T>;

    /**
     * Validation is performed when `expression` evaluates to false.
     *
     * @param expression
     */
    unless(expression: (input: T) => boolean): ValidationOptionsBuilder<T>;

    /**
     * In case validation fails, invoke `callback` with ${ValidationFailure} as parameter.
     *
     * @param callback
     */
    onFailure(callback: (failure: ValidationFailure) => void): ValidationOptionsBuilder<T>;
}
