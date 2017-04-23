import {ValidationCondition} from "./ValidationCondition";

export class WhenNotNullCondition<T> implements ValidationCondition<T> {

    constructor(private expression: (input: T) => any) {}

    shouldDoValidation(input: T): boolean {
        return this.expression(input) != null;
    }
}
