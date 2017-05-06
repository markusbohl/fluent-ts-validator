import {CommonValidatorBuilder} from "./CommonValidatorBuilder";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {SizedIterable} from "../shared/SizedIterable";

export interface SizedIterableValidatorBuilder<T, TProperty> extends CommonValidatorBuilder<T, SizedIterable<TProperty>> {
    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;
    hasMinNumberOfElements(minElementCount: number): this & ValidationOptionsBuilder<T>;
    hasMaxNumberOfElements(maxElementCount: number): this & ValidationOptionsBuilder<T>;
    hasNumberOfElementsBetween(minElementCount: number, maxElementCount: number): this & ValidationOptionsBuilder<T>;
}
