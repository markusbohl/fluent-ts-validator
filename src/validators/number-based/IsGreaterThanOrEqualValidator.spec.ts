/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsGreaterThanOrEqualValidator } from "./IsGreaterThanOrEqualValidator";

describe("IsGreaterThanOrEqualValidator", () => {
    describe("isValid()", () => {
        let isGreaterThanOrEqualValidator: IsGreaterThanOrEqualValidator;
        const threshold = 100;

        beforeEach(() => {
            isGreaterThanOrEqualValidator = new IsGreaterThanOrEqualValidator(threshold);
        });

        it("should return true if given number is equal to the threshold value", () => {
            let result = isGreaterThanOrEqualValidator.isValid(100);

            expect(result).toBeTruthy();
        });

        it("should return true if given number is greater than the threshold value", () => {
            let result = isGreaterThanOrEqualValidator.isValid(101);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is less than the threshold value", () => {
            let result = isGreaterThanOrEqualValidator.isValid(99);

            expect(result).toBeFalsy();
        });
    });
});