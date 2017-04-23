import {ValidationCondition} from "./ValidationCondition";

export class WhenNotEmptyCondition<T> implements ValidationCondition<T> {

    constructor(private expression: (input: T) => any) {
    }

    shouldDoValidation(input: T): boolean {
        if (this.expression(input)) {
            return true;
        }
        return false;
    }
}
