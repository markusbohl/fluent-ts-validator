/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsStringValidator } from "./IsStringValidator";

describe("IsStringValidator", () => {
    describe("isValid()", () => {
        let isStringValidator: IsStringValidator;

        beforeEach(() => {
            isStringValidator = new IsStringValidator();
        });

        it("should return true if value is an instance of String", () => {
            let input = new String();

            let result = isStringValidator.isValid(input);

            expect(result).toBeTruthy();
        });

        it("should return true if value is a string", () => {
            let result = isStringValidator.isValid("string");

            expect(result).toBeTruthy();
        });

        it("should return false if value is null", () => {
            let result = isStringValidator.isValid(null);

            expect(result).toBeFalsy();
        });

        it("should return false if value is not of type string", () => {
            let result = isStringValidator.isValid(1);

            expect(result).toBeFalsy();
        });
    });
});