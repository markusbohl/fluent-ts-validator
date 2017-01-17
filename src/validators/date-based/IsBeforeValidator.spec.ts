"use strict";

import { IsBeforeValidator } from "./IsBeforeValidator";

describe("IsBeforeValidator", () => {
    describe("isValid()", () => {
        let validator: IsBeforeValidator;
        const date = new Date(2016, 11, 24, 21, 33, 45, 673);

        beforeEach(() => {
            validator = new IsBeforeValidator(date);
        });

        it("should return true if given date is before specified date", () => {
            const previousDate = new Date(2015, 0, 1);

            let result = validator.isValid(previousDate);

            expect(result).toBeTruthy();
        });

        it("should return false if given date is not before specified date", () => {
            const previousDate = new Date(2017, 0, 1);

            let result = validator.isValid(previousDate);

            expect(result).toBeFalsy();
        });

        it("should return false if given date is equal to specified date", () => {
            let result = validator.isValid(date);

            expect(result).toBeFalsy();
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBeFalsy();
        });

        it("should return false if input is null", () => {
            let result = validator.isValid(null);

            expect(result).toBeFalsy();
        });
    });
});