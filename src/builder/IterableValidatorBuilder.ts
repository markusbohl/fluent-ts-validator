import {CommonValidatorBuilder} from './CommonValidatorBuilder';
import {ValidationOptionsBuilder} from './ValidationOptionsBuilder';

export interface IterableValidatorBuilder<T, TProperty> extends CommonValidatorBuilder<T, Iterable<TProperty>> {
    contains(element: TProperty): this & ValidationOptionsBuilder<T>;
    doesNotContain(element: TProperty): this & ValidationOptionsBuilder<T>;
}
