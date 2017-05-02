import {CommonCollectionValidatorBuilder} from './CommonCollectionValidatorBuilder';
import {CommonValidatorBuilderImpl} from './CommonValidatorBuilderImpl';
import {ValidationOptionsBuilder} from './ValidationOptionsBuilder';

export class CommonCollectionValidatorBuilderImpl<T, Collection> extends CommonValidatorBuilderImpl<T, Collection> implements CommonCollectionValidatorBuilder<T, Collection> {

    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T> {
        throw new Error('Method not implemented.');
    }

    hasMinNumberOfElements(min: number): this & ValidationOptionsBuilder<T> {
        throw new Error('Method not implemented.');
    }

    hasMaxNumberOfElements(max: number): this & ValidationOptionsBuilder<T> {
        throw new Error('Method not implemented.');
    }

    hasNumberOfElementsBetween(min: number, max: number): this & ValidationOptionsBuilder<T> {
        throw new Error('Method not implemented.');
    }
}
