"use strict";

import {
    CommonValidatorBuilder,
    DateValidatorBuilder,
    NumberValidatorBuilder,
    StringValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

export interface TypeValidatorBuilder<T> extends CommonValidatorBuilder<T, any> {
    isArray(): CommonValidatorBuilder<T, Array<any>> & ValidationOptionsBuilder<T>;
    isBoolean(): CommonValidatorBuilder<T, boolean> & ValidationOptionsBuilder<T>;
    isDate(): DateValidatorBuilder<T> & ValidationOptionsBuilder<T>;
    isNumber(): NumberValidatorBuilder<T> & ValidationOptionsBuilder<T>;
    isString(): StringValidatorBuilder<T> & ValidationOptionsBuilder<T>;
}