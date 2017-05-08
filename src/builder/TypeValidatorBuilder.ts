import {
    CommonValidatorBuilder,
    DateValidatorBuilder,
    NumberValidatorBuilder,
    StringValidatorBuilder,
    StringValidationOptionsBuilder,
    ValidationOptionsBuilder
} from "./";

export interface TypeValidatorBuilder<T> extends CommonValidatorBuilder<T, any> {

    /**
     * Checks if a property is of type Array.
     */
    isArray(): CommonValidatorBuilder<T, Array<any>> & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is a real boolean.
     */
    isBoolean(): CommonValidatorBuilder<T, boolean> & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is of type Date.
     */
    isDate(): DateValidatorBuilder<T> & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is a real number.
     */
    isNumber(): NumberValidatorBuilder<T> & ValidationOptionsBuilder<T>;

    /**
     * Checks if a property is a real string.
     */
    isString(): StringValidatorBuilder<T> & StringValidationOptionsBuilder<T>;
}
