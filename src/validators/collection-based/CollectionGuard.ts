import {SizedIterable, HasLength, HasSize} from "../../shared/SizedIterable";

export function hasLength(collection: SizedIterable<any>): collection is Iterable<any> & HasLength {
    return collection != null && (<any>collection).length !== undefined;
}

export function hasSize(collection: SizedIterable<any>): collection is Iterable<any> & HasSize {
    return collection != null && (<any>collection).size !== undefined;
}
