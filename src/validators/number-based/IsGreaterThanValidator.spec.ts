"use strict";

import { IsGreaterThanValidator } from "./IsGreaterThanValidator";

describe("IsGreaterThanValidator", () => {
    describe("isValid()", () => {
        let isGreaterThanValidator: IsGreaterThanValidator;
        const threshold = 100;
        beforeEach(() => {
            isGreaterThanValidator = new IsGreaterThanValidator(threshold);
        });

        it("should return true if given number is greater than the threshold", () => {
            let result = isGreaterThanValidator.isValid(101);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is equal to the threshold", () => {
            let result = isGreaterThanValidator.isValid(100);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is less than the threshold", () => {
            let result = isGreaterThanValidator.isValid(99);

            expect(result).toBeFalsy();
        });
    });
});