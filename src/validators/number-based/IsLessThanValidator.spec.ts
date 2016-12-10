/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsLessThanValidator } from "./IsLessThanValidator";

describe("IsLessThanValidator", () => {
    describe("isValid()", () => {
        let isLessThanValidator: IsLessThanValidator;
        const threshold = 100;
        beforeEach(() => {
            isLessThanValidator = new IsLessThanValidator(threshold);
        });

        it("should return true if given number is less than the threshold", () => {
            let result = isLessThanValidator.isValid(99);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is equal to the threshold", () => {
            let result = isLessThanValidator.isValid(100);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is greater than the threshold", () => {
            let result = isLessThanValidator.isValid(101);

            expect(result).toBeFalsy();
        });
    });
});