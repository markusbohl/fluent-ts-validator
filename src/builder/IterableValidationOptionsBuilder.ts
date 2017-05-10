import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export interface IterableValidationOptionsBuilder<T> extends ValidationOptionsBuilder<T> {

    /**
     * Validation is performed when the property under validation is neither `undefined`, nor `null`, nor an empty collection.
     */
    whenNotEmpty(): IterableValidationOptionsBuilder<T>;
}
