import {ValidationCondition} from "./ValidationCondition";

export class WhenNotNullCondition<T> implements ValidationCondition<T> {

    constructor(private expression: (input: T) => any) {
    }

    shouldDoValidation(input: T): boolean {
        try {
            return this.expression(input) != null;
        } catch (e) {
            return false;
        }
    }
}
