"use strict";

import {
    ValidationOptionsBuilder
} from "./";

export interface StringValidatorBuilder<T> {
    isBooleanString(): ValidationOptionsBuilder<T>;
}