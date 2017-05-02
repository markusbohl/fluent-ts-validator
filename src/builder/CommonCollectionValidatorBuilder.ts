import {CommonValidatorBuilder} from './CommonValidatorBuilder';
import {ValidationOptionsBuilder} from './ValidationOptionsBuilder';

export type Collection =
    Array<any>
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | Map<any, any>
    | Set<any>
    | WeakMap<any, any>
    | WeakSet<any>;

export interface CommonCollectionValidatorBuilder<T, Collection> extends CommonValidatorBuilder<T, Collection> {

    hasNumberOfElements(elementCount: number): this & ValidationOptionsBuilder<T>;
    hasMinNumberOfElements(min: number): this & ValidationOptionsBuilder<T>;
    hasMaxNumberOfElements(max: number): this & ValidationOptionsBuilder<T>;
    hasNumberOfElementsBetween(min: number, max: number): this & ValidationOptionsBuilder<T>;
}
