"use strict";

import { ValidationResult } from "../validation/ValidationResult";

export class PropertyValidator<TProperty> {

    isValid(input: TProperty): boolean {
        return true;
    }
}