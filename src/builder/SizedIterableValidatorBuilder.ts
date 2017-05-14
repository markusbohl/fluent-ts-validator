import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";
import {IterableValidatorBuilder} from "./IterableValidatorBuilder";

export interface SizedIterableValidatorBuilder<T, TProperty> extends IterableValidatorBuilder<T, TProperty> {

    /**
     * Checks if an Iterable has a `elementCount` number of elements.
     *
     * @param elementCount
     */
    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if an Iterable has at least `minElementCount` number of elements.
     *
     *  @param minElementCount
     */
    hasMinNumberOfElements(minElementCount: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if an Iterable has at most `maxElementCount` number of elements.
     *
     * @param maxElementCount
     */
    hasMaxNumberOfElements(maxElementCount: number): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if an Iterable has at least `minElementCount` and at most `maxElementCount` number of elements.
     *
     * That is, min and max boundaries are inclusive.
     *
     * @param minElementCount
     * @param maxElementCount
     */
    hasNumberOfElementsBetween(minElementCount: number, maxElementCount: number): this & ValidationOptionsBuilder<T>;
}
