import {CommonCollection} from '../../shared/CommonCollection';
import {PropertyValidator} from '../PropertyValidator';

export class HasNumberOfElementsValidator implements PropertyValidator<CommonCollection> {

    constructor(private numberOfElements: number) {
    }

    isValid(input: CommonCollection): boolean {
        if (this.hasLength(input)) {
            return input.length === this.numberOfElements;
        } else if (this.hasSize(input)) {
            return input.size === this.numberOfElements;
        } else {
            return false;
        }
    }

    private hasLength(collection: CommonCollection): collection is Array<any> | ReadonlyArray<any> {
        return collection != null &&
            ((<Array<any>>collection).length !== undefined || (<ReadonlyArray<any>>collection).length !== undefined);
    }

    private hasSize(collection: CommonCollection): collection is Set<any> | ReadonlySet<any> | Map<any, any> | ReadonlyMap<any, any> {
        return collection != null &&
            ((<Set<any>>collection).size !== undefined || (<ReadonlySet<any>>collection).size !== undefined ||
            (<Map<any, any>>collection).size !== undefined || (<ReadonlyMap<any, any>>collection).size !== undefined);
    }
}
