import {ValidationOptionsBuilder} from "./";
import {Validatable} from "../shared";

export interface CommonValidatorBuilder<T, TProperty> {
    /**
     * Checks if a property is defined.
     */
    isDefined(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is undefined.
     */
    isUndefined(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is null.
     */
    isNull(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is not null.
     */
    isNotNull(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is empty.
     *
     * Empty means either undefined, null, or an empty string.
     * Or in case of collections (e.g. Array, Set, Map) that they do not contain any element (length === 0, size === 0).
     */
    isEmpty(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is not empty.
     *
     * That is, neither null nor undefined and not an empty string.
     * If the property in question is a collection (e.g. Array, Set, Map) this method checks if the collection contains elements.
     */
    isNotEmpty(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is equal to (===) the comparison parameter.
     *
     * @param comparison: the value to compare a property against
     */
    isEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is not equal to (!==) the comparison parameter.
     *
     * @param comparison: the value to compare a property against
     */
    isNotEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property or an equal value is an element of the provided iterable (===).
     *
     * @param iterable
     */
    isIn(iterable: Iterable<TProperty>): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property or an equal value is not an element of the provided iterable (!==).
     *
     * @param iterable
     */
    isNotIn(iterable: Iterable<TProperty>): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property can successfully be validated by the provided validator.
     *
     * @param validator
     */
    fulfills(validator: Validatable<TProperty>): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if the provided lambda expression evaluates to true for a property.
     *
     * @param validationExpression
     */
    fulfills(validationExpression: (input: TProperty) => boolean): this & ValidationOptionsBuilder<T>;
}
