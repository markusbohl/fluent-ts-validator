"use strict";

import { IsBooleanValidator } from "./IsBooleanValidator";

describe("IsBooleanValidator", () => {
    describe("isValid()", () => {
        let isBooleanValidator: IsBooleanValidator;

        beforeEach(() => {
            isBooleanValidator = new IsBooleanValidator();
        });

        it("should return true for a Boolean instance", () => {
            let value: Boolean = new Boolean(true);

            let result = isBooleanValidator.isValid(value);

            expect(result).toBeTruthy();
        });

        it("should return true for a boolean value", () => {
            let result = isBooleanValidator.isValid(false);

            expect(result).toBeTruthy();
        });

        it("should return false for a null value", () => {
            let value: Boolean = null;

            let result = isBooleanValidator.isValid(value);

            expect(result).toBeFalsy();
        });

        it("should return false for a non boolean value", () => {
            let value: number = 0;

            let result = isBooleanValidator.isValid(value);

            expect(result).toBeFalsy();
        });

        it("should return false for a 'boolean' string value", () => {
            let value: string = "true";

            let result = isBooleanValidator.isValid(value);

            expect(result).toBeFalsy();
        });
    });
});