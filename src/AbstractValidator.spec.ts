/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { AbstractValidator } from "./AbstractValidator";

class TestValidator extends AbstractValidator<TestPerson> {
    constructor() {
        super();
        this.ruleFor((TestPerson) => { return name; }).isNotNull().withErrorCode("C-3628/B");
    }
}

class TestPerson {
    name: string;
    age: number;
}

describe("AbstractValidator", () => {
    describe("ruleFor()", () => {

    });
});