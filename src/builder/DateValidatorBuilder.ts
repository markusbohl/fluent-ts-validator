"use strict";

import {
    CommonValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

export interface DateValidatorBuilder<T> extends CommonValidatorBuilder<T, Date> {
    isBefore(date: Date): this & ValidationOptionsBuilder<T>;
    isSameAs(date: Date): this & ValidationOptionsBuilder<T>;
    isAfter(date: Date): this & ValidationOptionsBuilder<T>;
    isSameOrBefore(date: Date): this & ValidationOptionsBuilder<T>;
    isSameOrAfter(date: Date): this & ValidationOptionsBuilder<T>;
    isBetween(date1: Date, date2: Date, lowerBoundary?: "(" | "[", upperBoundary?: ")" | "]"): this & ValidationOptionsBuilder<T>;
}