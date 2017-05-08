import {CommonValidatorBuilder, ValidationOptionsBuilder} from "./";

export interface NumberValidatorBuilder<T> extends CommonValidatorBuilder<T, number> {

    /**
     * Checks if a number is positive (> 0).
     */
    isPositive(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a number is negative (< 0).
     */
    isNegative(): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a number is greater than `threshold` (>).
     *
     * @param threshold
     */
    isGreaterThan(threshold: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a number is greater than or equal to `threshold` (>=).
     *
     * @param threshold
     */
    isGreaterThanOrEqual(threshold: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a number is less than `threshold` (<).
     *
     * @param threshold
     */
    isLessThan(threshold: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a number is less than or equal to `threshold` (<=).
     *
     * @param threshold
     */
    isLessThanOrEqual(threshold: number): this & ValidationOptionsBuilder<T>;
}
