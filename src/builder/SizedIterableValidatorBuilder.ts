import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {IterableValidatorBuilder} from "./IterableValidatorBuilder";

export interface SizedIterableValidatorBuilder<T, TProperty> extends IterableValidatorBuilder<T, TProperty> {
    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;
    hasMinNumberOfElements(minElementCount: number): this & ValidationOptionsBuilder<T>;
    hasMaxNumberOfElements(maxElementCount: number): this & ValidationOptionsBuilder<T>;
    hasNumberOfElementsBetween(minElementCount: number, maxElementCount: number): this & ValidationOptionsBuilder<T>;
}
