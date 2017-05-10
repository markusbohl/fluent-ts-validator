import {isIterable, isIterableEmtpy} from "../shared/";
import {ValidationCondition} from "./ValidationCondition";

export class WhenNotEmptyCondition<T> implements ValidationCondition<T> {

    constructor(private expression: (input: T) => any) {
    }

    shouldDoValidation(input: T): boolean {
        const result = this.lambdaExprResultFor(input);

        if (isIterable(result)) {
            return !isIterableEmtpy(result);
        } else {
            return result ? true : false;
        }
    }

    private lambdaExprResultFor(input: T): any {
        try {
            return this.expression(input);
        } catch (e) {
            return void 0;
        }
    }
}
