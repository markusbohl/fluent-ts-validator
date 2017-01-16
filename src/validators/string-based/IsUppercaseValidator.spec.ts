"use strict";

import * as validatorJS from "validator";
import { IsUppercaseValidator } from "./IsUppercaseValidator";

describe("IsUppercaseValidator", () => {
    let validator: IsUppercaseValidator;

    beforeEach(() => {
        validator = new IsUppercaseValidator();
    });

    describe("isValid()", () => {
        it("should delegate to validatorJS instance for validation - success case", () => {
            spyOn(validatorJS, "isUppercase").and.returnValue(true);

            let result = validator.isValid("ABC");

            expect(result).toBeTruthy();
            expect(validatorJS.isUppercase).toHaveBeenCalledWith("ABC");
        });

        it("should delegate to validatorJS instance for validation - failure case", () => {
            spyOn(validatorJS, "isUppercase").and.returnValue(false);

            let result = validator.isValid("abc");

            expect(result).toBeFalsy();
            expect(validatorJS.isUppercase).toHaveBeenCalledWith("abc");
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });

        it("should return false if input is null", () => {
            let result = validator.isValid(null);

            expect(result).toBe(false);
        });
    });
});
