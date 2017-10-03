import {Severity, Validatable, ValidationFailure} from "../shared";
import {
    UnlessCondition,
    ValidationRule,
    WhenCondition,
    WhenDefinedCondition,
    WhenNotNullCondition
} from "../validation";
import {
    IsDefinedValidator,
    IsEmptyValidator,
    IsEqualValidator,
    IsInValidator,
    IsNotEmptyValidator,
    IsNotEqualValidator,
    IsNotInValidator,
    IsNotNullValidator,
    IsNullValidator,
    IsUndefinedValidator
} from "../validators/common";
import {CommonValidatorBuilder, ValidationOptionsBuilder} from "./";

export class CommonValidatorBuilderImpl<T, TProperty> implements ValidationOptionsBuilder<T>,
    CommonValidatorBuilder<T, TProperty> {

    constructor(protected validationRule: ValidationRule<T, TProperty | Iterable<TProperty>>) {
    }

    /*
     * ==================
     * Validation options
     * ==================
     */
    withFailureCode(errorCode: string): ValidationOptionsBuilder<T> {
        this.validationRule.setErrorCode(errorCode);

        return this;
    }

    withFailureMessage(errorMessage: string): ValidationOptionsBuilder<T> {
        this.validationRule.setErrorMessage(errorMessage);

        return this;
    }

    withSeverity(severity: Severity): ValidationOptionsBuilder<T> {
        this.validationRule.setSeverity(severity);

        return this;
    }

    withPropertyName(name: string): ValidationOptionsBuilder<T> {
        this.validationRule.setPropertyName(name);

        return this;
    }

    whenDefined(): ValidationOptionsBuilder<T> {
        this.validationRule.addCondition(new WhenDefinedCondition(this.validationRule.lambdaExpression));

        return this;
    }

    whenNotNull(): ValidationOptionsBuilder<T> {
        this.validationRule.addCondition(new WhenNotNullCondition(this.validationRule.lambdaExpression));

        return this;
    }

    when(expression: (input: T) => boolean): ValidationOptionsBuilder<T> {
        this.validationRule.addCondition(new WhenCondition(expression));

        return this;
    }

    unless(expression: (input: T) => boolean): ValidationOptionsBuilder<T> {
        this.validationRule.addCondition(new UnlessCondition(expression));

        return this;
    }

    onFailure(callback: (failure: ValidationFailure) => void): ValidationOptionsBuilder<T> {
        this.validationRule.onFailure(callback);

        return this;
    }

    /*
     * =======================
     * Custom validation rules
     * =======================
     */
    fulfills(validator: Validatable<TProperty>): this & ValidationOptionsBuilder<T>;
    fulfills(validationExpression: (input: TProperty) => boolean): this & ValidationOptionsBuilder<T>;
    fulfills(validatable: any): this & ValidationOptionsBuilder<T> {
        if (typeof validatable === "object") {
            this.validationRule.addValidator({
                isValid: function (input: TProperty): boolean {
                    return validatable.validate(input).isValid();
                }
            });
        } else {
            this.validationRule.addValidator({
                isValid: function (input: TProperty): boolean {
                    return validatable(input);
                }
            });
        }

        return this;
    }

    /*
     * =======================
     * Common validation rules
     * =======================
     */
    isDefined(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsDefinedValidator());

        return this;
    }

    isUndefined(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsUndefinedValidator());

        return this;
    }

    isNull(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNullValidator());

        return this;
    }

    isNotNull(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNotNullValidator());

        return this;
    }

    isEmpty(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsEmptyValidator());

        return this;
    }

    isNotEmpty(): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNotEmptyValidator());

        return this;
    }

    isEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsEqualValidator(comparison));

        return this;
    }

    isNotEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNotEqualValidator(comparison));

        return this;
    }

    isIn(iterable: Iterable<TProperty> | object): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsInValidator(iterable));

        return this;
    }

    isNotIn(iterable: Iterable<TProperty> | object): this & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNotInValidator(iterable));

        return this;
    }
}
