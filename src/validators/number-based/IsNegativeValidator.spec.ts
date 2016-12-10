/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsNegativeValidator } from "./IsNegativeValidator";

describe("IsNegativeValidator", () => {
    describe("isValid()", () => {
        it("should return true if given number is less than zero", () => {
            let isNegativeValidator = new IsNegativeValidator();

            let result = isNegativeValidator.isValid(-1);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is zero", () => {
            let isNegativeValidator = new IsNegativeValidator();

            let result = isNegativeValidator.isValid(0);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is greater than zero", () => {
            let isNegativeValidator = new IsNegativeValidator();

            let result = isNegativeValidator.isValid(1);

            expect(result).toBeFalsy();
        });
    });
});