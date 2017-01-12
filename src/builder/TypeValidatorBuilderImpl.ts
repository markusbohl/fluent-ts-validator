"use strict";

import {
    CommonValidatorBuilder,
    CommonValidatorBuilderImpl,
    DateValidatorBuilder,
    DateValidatorBuilderImpl,
    NumberValidatorBuilder,
    NumberValidatorBuilderImpl,
    StringValidatorBuilder,
    StringValidatorBuilderImpl,
    TypeValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

import {
    ValidationRule
} from "../validation";

import {
    IsArrayValidator,
    IsBooleanValidator,
    IsDateValidator,
    IsNumberValidator,
    IsStringValidator
} from "../validators/common";

export class TypeValidatorBuilderImpl<T> extends CommonValidatorBuilderImpl<T, any> implements TypeValidatorBuilder<T> {

    constructor(validationRule: ValidationRule<T, any>) {
        super(validationRule);
    }

    isArray(): CommonValidatorBuilder<T, Array<any>> & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsArrayValidator());

        return new CommonValidatorBuilderImpl<T, Array<any>>(this.validationRule);
    }

    isBoolean(): CommonValidatorBuilder<T, boolean> & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsBooleanValidator());

        return new CommonValidatorBuilderImpl<T, boolean>(this.validationRule);
    }

    isDate(): DateValidatorBuilder<T> & CommonValidatorBuilder<T, Date> & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsDateValidator());

        return new DateValidatorBuilderImpl(this.validationRule);
    }

    isNumber(): NumberValidatorBuilder<T> & CommonValidatorBuilder<T, number> & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsNumberValidator());

        return new NumberValidatorBuilderImpl(this.validationRule);
    }

    isString(): StringValidatorBuilder<T> & CommonValidatorBuilder<T, string> & ValidationOptionsBuilder<T> {
        this.validationRule.addValidator(new IsStringValidator());

        return new StringValidatorBuilderImpl(this.validationRule);
    }
}