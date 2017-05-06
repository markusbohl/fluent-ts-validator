import {Validatable, ValidationResult} from "./shared";
import {ValidationRule, CollectionValidationRule, RuleApplicationOutcome} from "./validation";
import {
    CommonCollectionValidatorBuilder,
    CommonCollectionValidatorBuilderImpl,
    CommonValidatorBuilder,
    CommonValidatorBuilderImpl,
    DateValidatorBuilder,
    DateValidatorBuilderImpl,
    NumberValidatorBuilder,
    NumberValidatorBuilderImpl,
    StringValidatorBuilder,
    StringValidatorBuilderImpl,
    TypeValidatorBuilder,
    TypeValidatorBuilderImpl
} from "./builder";
import {CommonCollection} from "./shared/CommonCollection";

/**
 * Abstract base class for all custom validators.
 *
 * @export
 * @abstract
 * @class AbstractValidator
 * @template T
 */
export abstract class AbstractValidator<T> implements Validatable<T> {

    private rules: ValidationRule<T, any>[] = [];

    protected validateIf<TProperty>(lambdaExpression: (input: T) => TProperty): CommonValidatorBuilder<T, TProperty> {
        const rule: ValidationRule<T, TProperty> = this.registerRule(new ValidationRule(lambdaExpression));

        return new CommonValidatorBuilderImpl(rule);
    }

    protected validateIfAny(lambdaExpression: (input: T) => any): TypeValidatorBuilder<T> {
        const rule: ValidationRule<T, any> = this.registerRule(new ValidationRule(lambdaExpression));

        return new TypeValidatorBuilderImpl(rule);
    }

    protected validateIfNumber(lambdaExpression: (input: T) => number): NumberValidatorBuilder<T> {
        const rule: ValidationRule<T, number> = this.registerRule(new ValidationRule(lambdaExpression));

        return new NumberValidatorBuilderImpl(rule);
    }

    protected validateIfDate(lambdaExpression: (input: T) => Date): DateValidatorBuilder<T> {
        const rule: ValidationRule<T, Date> = this.registerRule(new ValidationRule(lambdaExpression));

        return new DateValidatorBuilderImpl(rule);
    }

    protected validateIfString(lambdaExpression: (input: T) => string): StringValidatorBuilder<T> {
        const rule: ValidationRule<T, string> = this.registerRule(new ValidationRule(lambdaExpression));

        return new StringValidatorBuilderImpl(rule);
    }

    protected validateIfEach<TProperty>(lambdaExpression: (input: T) => Iterable<TProperty>): CommonValidatorBuilder<T, TProperty> {
        const rule: ValidationRule<T, Iterable<TProperty>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new CommonValidatorBuilderImpl(rule);
    }

    protected validateIfEachAny(lambdaExpression: (input: T) => Iterable<any>): TypeValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<any>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new TypeValidatorBuilderImpl(rule);
    }

    protected validateIfEachNumber(lambdaExpression: (input: T) => Iterable<number>): NumberValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<number>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new NumberValidatorBuilderImpl(rule);
    }

    protected validateIfEachDate(lambdaExpression: (input: T) => Iterable<Date>): DateValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<Date>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new DateValidatorBuilderImpl(rule);
    }

    protected validateIfEachString(lambdaExpression: (input: T) => Iterable<string>): StringValidatorBuilder<T> {
        const rule: ValidationRule<T, Iterable<string>> = this.registerRule(new CollectionValidationRule(lambdaExpression));

        return new StringValidatorBuilderImpl(rule);
    }

    protected validateIfCollection(lambdaExpression: (input: T) => CommonCollection): CommonCollectionValidatorBuilder<T> {
        const rule: ValidationRule<T, CommonCollection> = this.registerRule(new ValidationRule(lambdaExpression));

        return new CommonCollectionValidatorBuilderImpl(rule);
    }

    private registerRule<TProperty>(validationRule: ValidationRule<T, TProperty>): ValidationRule<T, TProperty> {
        this.rules.push(validationRule);

        return validationRule;
    }

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
