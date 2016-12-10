/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsLessThanOrEqualValidator } from "./IsLessThanOrEqualValidator";

describe("IsLessThanOrEqualValidator", () => {
    describe("isValid()", () => {
        let isLessThanOrEqualValidator: IsLessThanOrEqualValidator;
        const threshold = 100;

        beforeEach(() => {
            isLessThanOrEqualValidator = new IsLessThanOrEqualValidator(threshold);
        });

        it("should return true if given number is equal to the threshold value", () => {
            let result = isLessThanOrEqualValidator.isValid(100);

            expect(result).toBeTruthy();
        });

        it("should return true if given number is less than the threshold value", () => {
            let result = isLessThanOrEqualValidator.isValid(99);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is greater than the threshold value", () => {
            let result = isLessThanOrEqualValidator.isValid(101);

            expect(result).toBeFalsy();
        });
    });
});