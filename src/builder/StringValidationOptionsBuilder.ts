import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export interface StringValidationOptionsBuilder<T> extends ValidationOptionsBuilder<T> {
    whenNotEmpty(): StringValidationOptionsBuilder<T>;
}
