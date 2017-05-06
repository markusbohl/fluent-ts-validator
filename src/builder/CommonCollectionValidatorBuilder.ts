import {CommonValidatorBuilder} from "./CommonValidatorBuilder";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {CommonCollection} from "../shared/CommonCollection";

export interface CommonCollectionValidatorBuilder<T> extends CommonValidatorBuilder<T, CommonCollection> {
    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;
    hasMinNumberOfElements(minElementCount: number): this & ValidationOptionsBuilder<T>;
    hasMaxNumberOfElements(maxElementCount: number): this & ValidationOptionsBuilder<T>;
    hasNumberOfElementsBetween(minElementCount: number, maxElementCount: number): this & ValidationOptionsBuilder<T>;
}
