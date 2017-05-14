import {
    CommonValidatorBuilder,
    CommonValidatorBuilderImpl,
    DateValidatorBuilder,
    DateValidatorBuilderImpl,
    IterableValidatorBuilder,
    SizedIterableValidatorBuilderImpl,
    NumberValidatorBuilder,
    NumberValidatorBuilderImpl,
    SizedIterableValidatorBuilder,
    StringValidatorBuilder,
    StringValidatorBuilderImpl,
    TypeValidatorBuilder,
    TypeValidatorBuilderImpl
} from "./builder";
import {Validatable, ValidationResult} from "./shared";
import {SizedIterable} from "./shared/SizedIterable";
import {CollectionValidationRule, RuleApplicationOutcome, ValidationRule} from "./validation";

/**
 * Abstract base class for all custom validators.
 *
 * @export
 * @abstract
 * @class AbstractValidator
 * @template T - type to validate
 */
export abstract class AbstractValidator<T> implements Validatable<T> {

    private rules: ValidationRule<T, any>[] = [];

    /**
     * Entry point for defining validation rules independent of a property's type.
     *
     * @param lambdaExpression
     * @returns {CommonValidatorBuilder}
     */
    protected validateIf<TProperty>(lambdaExpression: (input: T) => TProperty): CommonValidatorBuilder<T, TProperty> {
        const rule: ValidationRule<T, TProperty> = this.registerRule(new ValidationRule(lambdaExpression));

        return new CommonValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules for properties of type any.
     *
     * @param lambdaExpression
     * @returns {TypeValidatorBuilder}
     */
    protected validateIfAny(lambdaExpression: (input: T) => any): TypeValidatorBuilder<T> {
        const rule: ValidationRule<T, any> = this.registerRule(new ValidationRule(lambdaExpression));

        return new TypeValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules for properties of type number.
     *
     * @param lambdaExpression
     * @returns {NumberValidatorBuilder}
     */
    protected validateIfNumber(lambdaExpression: (input: T) => number): NumberValidatorBuilder<T> {
        const rule: ValidationRule<T, number> = this.registerRule(new ValidationRule(lambdaExpression));

        return new NumberValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules for properties of type date.
     *
     * @param lambdaExpression
     * @returns {DateValidatorBuilder}
     */
    protected validateIfDate(lambdaExpression: (input: T) => Date): DateValidatorBuilder<T> {
        const rule: ValidationRule<T, Date> = this.registerRule(new ValidationRule(lambdaExpression));

        return new DateValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules for properties of type string.
     *
     * @param lambdaExpression
     * @returns {StringValidatorBuilder}
     */
    protected validateIfString(lambdaExpression: (input: T) => string): StringValidatorBuilder<T> {
        const rule: ValidationRule<T, string> = this.registerRule(new ValidationRule(lambdaExpression));

        return new StringValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules that apply to each element of an iterable, independent of the elements' type.
     *
     * @param lambdaExpression
     * @returns {CommonValidatorBuilder}
     */
    protected validateIfEach<TProperty>(lambdaExpression: (input: T) => Iterable<TProperty>): CommonValidatorBuilder<T, TProperty> {
        const rule: ValidationRule<T, Iterable<TProperty>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new CommonValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules that apply to each element (of type any) of an iterable.
     *
     * @param lambdaExpression
     * @returns {TypeValidatorBuilder}
     */
    protected validateIfEachAny(lambdaExpression: (input: T) => Iterable<any>): TypeValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<any>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new TypeValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules that apply to each element (of type number) of an iterable.
     *
     * @param lambdaExpression
     * @returns {NumberValidatorBuilder}
     */
    protected validateIfEachNumber(lambdaExpression: (input: T) => Iterable<number>): NumberValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<number>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new NumberValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules that apply to each element (of type Date) of an iterable.
     *
     * @param lambdaExpression
     * @returns {DateValidatorBuilder}
     */
    protected validateIfEachDate(lambdaExpression: (input: T) => Iterable<Date>): DateValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<Date>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new DateValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules that apply to each element (of type string) of an iterable.
     *
     * @param lambdaExpression
     * @returns {StringValidatorBuilder}
     */
    protected validateIfEachString(lambdaExpression: (input: T) => Iterable<string>): StringValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<string>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new StringValidatorBuilderImpl(rule);
    }

    /**
     * Entry point for defining validation rules for properties of type Iterable.
     *
     * @param lambdaExpression
     */
    protected validateIfIterable<TProperty>(lambdaExpression: (input: T) => SizedIterable<TProperty>): SizedIterableValidatorBuilder<T, TProperty>;
    protected validateIfIterable<TProperty>(lambdaExpression: (input: T) => Iterable<TProperty>): IterableValidatorBuilder<T, TProperty>;
    protected validateIfIterable<TProperty>(lambdaExpression: (input: T) => Iterable<TProperty>): SizedIterableValidatorBuilder<T, TProperty> {
        const rule: ValidationRule<T, Iterable<TProperty>> = this.registerRule(new ValidationRule(lambdaExpression));

        return new SizedIterableValidatorBuilderImpl(rule);
    }

    private registerRule<TProperty>(validationRule: ValidationRule<T, TProperty>): ValidationRule<T, TProperty> {
        this.rules.push(validationRule);

        return validationRule;
    }

    /**
     * Synchronously validates the given input.
     *
     * Based on the rules defined in the constructor of the specific validator the validation is performed .
     *
     * @param input - the object to validate
     * @returns {ValidationResult}
     */
    validate(input: T): ValidationResult {
        const result = new ValidationResult();

        this.rules.forEach((rule: any) => {
            const outcome = rule.apply(input);

            if (outcome.isFailure()) {
                result.addFailures(outcome.getValidationFailures());
            }
        });

        return result;
    }

    /**
     * Asynchronously validates the given input.
     *
     * Based on the rules defined in the constructor of the specific validator the validation is performed .
     *
     * @param input - the object to validate
     * @returns {Promise<ValidationResult>}
     */
    validateAsync(input: T): Promise<ValidationResult> {
        return new Promise<ValidationResult>((resolve) => {
            const promises = this.createPromiseForEachRule(input, this.rules);

            Promise.all(promises).then((outcomes: RuleApplicationOutcome[]) => {
                resolve(this.buildValidationResultFrom(outcomes));
            });
        });
    }

    private createPromiseForEachRule(input: T, rules: ValidationRule<T, any>[]): Array<Promise<RuleApplicationOutcome>> {
        const promises: Promise<RuleApplicationOutcome>[] = [];

        rules.forEach((rule: ValidationRule<T, any>) => {
            promises.push(this.applyRuleAsync(rule, input));
        });

        return promises;
    }

    private applyRuleAsync(rule: ValidationRule<T, any>, input: T): Promise<RuleApplicationOutcome> {
        return new Promise((resolve) => {
            resolve(rule.apply(input));
        });
    }

    private buildValidationResultFrom(outcomes: RuleApplicationOutcome[]): ValidationResult {
        const result = new ValidationResult();
        outcomes.forEach((outcome: RuleApplicationOutcome) => {
            if (outcome.isFailure()) {
                result.addFailures(outcome.getValidationFailures());
            }
        });
        return result;
    }
}
