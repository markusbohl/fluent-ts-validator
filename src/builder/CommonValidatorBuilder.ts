import {ValidationOptionsBuilder} from "./";
import {Validatable} from "../shared";

export interface CommonValidatorBuilder<T, TProperty> {
    isDefined(): this & ValidationOptionsBuilder<T>;
    isUndefined(): this & ValidationOptionsBuilder<T>;
    isNull(): this & ValidationOptionsBuilder<T>;
    isNotNull(): this & ValidationOptionsBuilder<T>;
    isEmpty(): this & ValidationOptionsBuilder<T>;
    isNotEmpty(): this & ValidationOptionsBuilder<T>;
    isEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T>;
    isNotEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T>;
    isIn(array: Iterable<TProperty>): this & ValidationOptionsBuilder<T>;
    isNotIn(array: Iterable<TProperty>): this & ValidationOptionsBuilder<T>;
    fulfills(validator: Validatable<TProperty>): this & ValidationOptionsBuilder<T>;
    fulfills(validationExpression: (input: TProperty) => boolean): this & ValidationOptionsBuilder<T>;
}
