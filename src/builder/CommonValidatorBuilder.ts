import {ValidationOptionsBuilder} from "./";
import {Validatable} from "../shared";

export interface CommonValidatorBuilder<T, TProperty> {
    isDefined(): this & ValidationOptionsBuilder<T>;
    isNull(): this & ValidationOptionsBuilder<T>;
    isNotNull(): this & ValidationOptionsBuilder<T>;
    isEmpty(): this & ValidationOptionsBuilder<T>;
    isNotEmpty(): this & ValidationOptionsBuilder<T>;
    isEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T>;
    isNotEqualTo(comparison: TProperty): this & ValidationOptionsBuilder<T>;
    isIn(array: Array<TProperty>): this & ValidationOptionsBuilder<T>;
    isNotIn(array: Array<TProperty>): this & ValidationOptionsBuilder<T>;
    must(validationExpression: (input: TProperty) => boolean): this & ValidationOptionsBuilder<T>;
    addValidator(validator: Validatable<TProperty>): this & ValidationOptionsBuilder<T>;
}