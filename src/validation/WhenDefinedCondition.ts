import {ValidationCondition} from "./ValidationCondition";

export class WhenDefinedCondition<T> implements ValidationCondition<T> {

    constructor(private expression: (input: T) => any) {
    }

    shouldDoValidation(input: T): boolean {
        return typeof this.expression(input) !== "undefined";
    }
}
