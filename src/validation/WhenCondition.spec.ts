/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidationCondition } from "./ValidationCondition";
import { WhenCondition } from "./WhenCondition";

describe("WhenCondition", () => {
    describe("shouldDoValidation()", () => {
        it("should return true if given expression evaluates to true", () => {
            let condition = new WhenCondition<TestClass>((input: TestClass) => input.property !== null);

            expect(condition.shouldDoValidation(new TestClass("to-be-validated"))).toBeTruthy();
        });

        it("should return false if given expression evaluates to false", () => {
            let condition = new WhenCondition<TestClass>((input: TestClass) => input.property !== null);

            expect(condition.shouldDoValidation(new TestClass(null))).toBeFalsy();
        });
    });
});

class TestClass {
    readonly property: string;

    constructor(property: string) {
        this.property = property;
    }
}