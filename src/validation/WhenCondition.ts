"use strict";

import { ValidationCondition } from "./ValidationCondition";

export class WhenCondition<T> implements ValidationCondition<T> {

    constructor(private expression: (input: T) => boolean) { }

    shouldDoValidation(input: T): boolean {
        return this.expression(input);
    }
}