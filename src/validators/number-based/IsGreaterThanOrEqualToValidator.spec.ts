"use strict";

import { IsGreaterThanOrEqualToValidator } from "./IsGreaterThanOrEqualToValidator";

describe("IsGreaterThanOrEqualToValidator", () => {
    describe("isValid()", () => {
        let isGreaterThanOrEqualToValidator: IsGreaterThanOrEqualToValidator;
        const threshold = 100;

        beforeEach(() => {
            isGreaterThanOrEqualToValidator = new IsGreaterThanOrEqualToValidator(threshold);
        });

        it("should return true if given number is equal to the threshold value", () => {
            let result = isGreaterThanOrEqualToValidator.isValid(100);

            expect(result).toBeTruthy();
        });

        it("should return true if given number is greater than the threshold value", () => {
            let result = isGreaterThanOrEqualToValidator.isValid(101);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is less than the threshold value", () => {
            let result = isGreaterThanOrEqualToValidator.isValid(99);

            expect(result).toBeFalsy();
        });
    });
});