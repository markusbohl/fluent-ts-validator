"use strict";

import { IsPositiveValidator } from "./IsPositiveValidator";

describe("IsPositiveValidator", () => {
    describe("isValid()", () => {
        it("should return true if given number is greater than zero", () => {
            let isPositiveValidator = new IsPositiveValidator();

            let result = isPositiveValidator.isValid(1);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is zero", () => {
            let isPositiveValidator = new IsPositiveValidator();

            let result = isPositiveValidator.isValid(0);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is less than zero", () => {
            let isPositiveValidator = new IsPositiveValidator();

            let result = isPositiveValidator.isValid(-1);

            expect(result).toBeFalsy();
        });
    });
});