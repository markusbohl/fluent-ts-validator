import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export interface StringValidationOptionsBuilder<T> extends ValidationOptionsBuilder<T> {

    /**
     * Validation is performed when the property under validation is neither `undefined`, nor `null`, nor an empty string.
     */
    whenNotEmpty(): StringValidationOptionsBuilder<T>;
}
