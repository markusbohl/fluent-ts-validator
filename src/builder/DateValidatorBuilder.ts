"use strict";

import {
    ValidationOptionsBuilder
} from "./";

export interface DateValidatorBuilder<T> {
    isBefore(date: Date): ValidationOptionsBuilder<T>;
    isSameAs(date: Date): ValidationOptionsBuilder<T>;
    isAfter(date: Date): ValidationOptionsBuilder<T>;
    isSameOrBefore(date: Date): ValidationOptionsBuilder<T>;
    isSameOrAfter(date: Date): ValidationOptionsBuilder<T>;
    isBetween(date1: Date, date2: Date, lowerBoundary?: "(" | "[", upperBoundary?: ")" | "]"): ValidationOptionsBuilder<T>;
}