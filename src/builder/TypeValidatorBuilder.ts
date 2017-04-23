import {
    CommonValidatorBuilder,
    DateValidatorBuilder,
    NumberValidatorBuilder,
    StringValidatorBuilder,
    StringValidationOptionsBuilder,
    ValidationOptionsBuilder
} from "./";

export interface TypeValidatorBuilder<T> extends CommonValidatorBuilder<T, any> {
    isArray(): CommonValidatorBuilder<T, Array<any>> & ValidationOptionsBuilder<T>;
    isBoolean(): CommonValidatorBuilder<T, boolean> & ValidationOptionsBuilder<T>;
    isDate(): DateValidatorBuilder<T> & ValidationOptionsBuilder<T>;
    isNumber(): NumberValidatorBuilder<T> & ValidationOptionsBuilder<T>;
    isString(): StringValidatorBuilder<T> & StringValidationOptionsBuilder<T>;
}
