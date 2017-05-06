import {CommonValidatorBuilder} from "./CommonValidatorBuilder";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export interface CommonCollectionValidatorBuilder<T, CommonCollection> extends CommonValidatorBuilder<T, CommonCollection> {
    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;
    hasMinNumberOfElements(minElementCount: number): this & ValidationOptionsBuilder<T>;
    hasMaxNumberOfElements(maxElementCount: number): this & ValidationOptionsBuilder<T>;
    hasNumberOfElementsBetween(minElementCount: number, maxElementCount: number): this & ValidationOptionsBuilder<T>;
}
