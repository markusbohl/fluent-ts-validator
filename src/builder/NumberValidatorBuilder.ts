import {
    CommonValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

export interface NumberValidatorBuilder<T> extends CommonValidatorBuilder<T, number> {
    isPositive(): this & ValidationOptionsBuilder<T>;
    isNegative(): this & ValidationOptionsBuilder<T>;
    isGreaterThan(threshold: number): this & ValidationOptionsBuilder<T>;
    isGreaterThanOrEqual(threshold: number): this & ValidationOptionsBuilder<T>;
    isLessThan(threshold: number): this & ValidationOptionsBuilder<T>;
    isLessThanOrEqual(threshold: number): this & ValidationOptionsBuilder<T>;
}