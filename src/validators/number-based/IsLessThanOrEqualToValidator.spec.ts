"use strict";

import { IsLessThanOrEqualToValidator } from "./IsLessThanOrEqualToValidator";

describe("IsLessThanOrEqualToValidator", () => {
    describe("isValid()", () => {
        let isLessThanOrEqualToValidator: IsLessThanOrEqualToValidator;
        const threshold = 100;

        beforeEach(() => {
            isLessThanOrEqualToValidator = new IsLessThanOrEqualToValidator(threshold);
        });

        it("should return true if given number is equal to the threshold value", () => {
            let result = isLessThanOrEqualToValidator.isValid(100);

            expect(result).toBeTruthy();
        });

        it("should return true if given number is less than the threshold value", () => {
            let result = isLessThanOrEqualToValidator.isValid(99);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is greater than the threshold value", () => {
            let result = isLessThanOrEqualToValidator.isValid(101);

            expect(result).toBeFalsy();
        });
    });
});