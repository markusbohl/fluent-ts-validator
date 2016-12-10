"use strict";

import {
    ValidationOptionsBuilder,
    CommonValidatorBuilder
} from "./";

export interface NumberValidatorBuilder<T> extends CommonValidatorBuilder<T, number> {
    isPositive(): ValidationOptionsBuilder<T>;
}