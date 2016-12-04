"use strict";

export interface PropertyValidator<TProperty> {

    isValid(input: TProperty): boolean;
}