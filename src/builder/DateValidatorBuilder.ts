import {CommonValidatorBuilder, ValidationOptionsBuilder} from "./";

export interface DateValidatorBuilder<T> extends CommonValidatorBuilder<T, Date> {

    /**
     * Checks if a date is before `date`.
     *
     * @param date
     */
    isBefore(date: Date): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a date is the same as `date`.
     *
     * @param date
     */
    isSameAs(date: Date): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a date is after `date`.
     *
     * @param date
     */
    isAfter(date: Date): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a date is the same as or before `date`.
     *
     * @param date
     */
    isSameOrBefore(date: Date): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a date is the same as or after `date`.
     *
     * @param date
     */
    isSameOrAfter(date: Date): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if a date is between `date1` and `date2`.
     *
     * Lower and upper boundary can either be included or excluded when checking a date.
     * - [ and ] indicate inclusion of a date
     * - ( and ) indicates exclusion of a date
     *
     * This rule defaults to exclusion of lower and upper boundary if none are specified.
     *
     * @param date1
     * @param date2
     * @param lowerBoundary: "(" | "[" - defaults to "("
     * @param upperBoundary: ")" | "]" - defaults to ")"
     */
    isBetween(date1: Date, date2: Date, lowerBoundary?: "(" | "[", upperBoundary?: ")" | "]"): this & ValidationOptionsBuilder<T>;
}
