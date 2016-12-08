/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsNumberValidator } from "./IsNumberValidator";

describe("IsNumberValidator", () => {
    describe("isValid()", () => {
        let isNumberValidator: IsNumberValidator;

        beforeEach(() => {
            isNumberValidator = new IsNumberValidator();
        });

        it("should return true if given value is instance of Number", () => {
            let input = new Number(42);

            let result = isNumberValidator.isValid(input);

            expect(result).toBeTruthy();
        });

        it("should return true if given value is of type number", () => {
            let result = isNumberValidator.isValid(42);

            expect(result).toBeTruthy();
        });

        it("should return false if given value is null", () => {
            let value: Number = null;

            let result = isNumberValidator.isValid(value);

            expect(result).toBeFalsy();
        });

        it("should return false if given value is not of type number", () => {
            let result = isNumberValidator.isValid("42");

            expect(result).toBeFalsy();
        });
    });
});