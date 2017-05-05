import {CommonCollection} from "../../shared/CommonCollection";

export function hasLength(collection: CommonCollection): collection is Array<any> | ReadonlyArray<any> {
    return collection != null &&
        ((<Array<any>>collection).length !== undefined || (<ReadonlyArray<any>>collection).length !== undefined);
}

export function hasSize(collection: CommonCollection): collection is Set<any> | ReadonlySet<any> | Map<any, any> | ReadonlyMap<any, any> {
    return collection != null &&
        ((<Set<any>>collection).size !== undefined || (<ReadonlySet<any>>collection).size !== undefined ||
        (<Map<any, any>>collection).size !== undefined || (<ReadonlyMap<any, any>>collection).size !== undefined);
}
