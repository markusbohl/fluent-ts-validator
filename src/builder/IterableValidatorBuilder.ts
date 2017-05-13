import {CommonValidatorBuilder} from "./CommonValidatorBuilder";
import {ValidationOptionsBuilder} from "./ValidationOptionsBuilder";

export interface IterableValidatorBuilder<T, TProperty> extends CommonValidatorBuilder<T, Iterable<TProperty>> {

    /**
     * Checks if an Iterable contains the given element.
     *
     * @param element
     */
    contains(element: TProperty): this & ValidationOptionsBuilder<T>;

    /**
     * Checks if an Iterable does not contain the given element.
     *
     * @param element
     */
    doesNotContain(element: TProperty): this & ValidationOptionsBuilder<T>;
}
