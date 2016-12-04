"use strict";

import { ValidationOptionsBuilder } from "./ValidationOptionsBuilder";

export interface ValidatorBuilder<T, TProperty> {
    isNotNull(): ValidationOptionsBuilder<T>;
    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T>;
    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T>;
    isEmpty(): ValidationOptionsBuilder<T>;
}