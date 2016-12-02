"use strict";

export interface ValidationCondition<T> {
    shouldDoValidation(input: T): boolean;
}