import {CommonValidatorBuilder} from "./CommonValidatorBuilder";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export interface CommonCollectionValidatorBuilder<T, CommonCollection> extends CommonValidatorBuilder<T, CommonCollection> {

    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;
    hasMinNumberOfElements(min: number): this & ValidationOptionsBuilder<T>;
    hasMaxNumberOfElements(max: number): this & ValidationOptionsBuilder<T>;
    hasNumberOfElementsBetween(min: number, max: number): this & ValidationOptionsBuilder<T>;
}
