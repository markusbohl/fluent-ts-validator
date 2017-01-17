"use strict";

import { IsLengthValidator } from "./IsLengthValidator";
import { LengthOptions } from "../../shared/LengthOptions";

import * as validatorJS from "validator";

describe("IsLengthValdiator", () => {
    describe("isValid()", () => {
        const options = { min: 5, max: 10 };
        it("should delegate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isLength").and.returnValue(true);
            let validator = new IsLengthValidator(options);

            let result = validator.isValid("foobar");

            expect(result).toBeTruthy();
            expect(validatorJS.isLength).toHaveBeenCalledWith("foobar", options);
        });

        it("should delegate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isLength").and.returnValue(false);
            let validator = new IsLengthValidator(options);

            let result = validator.isValid("foo");

            expect(result).toBeFalsy();
            expect(validatorJS.isLength).toHaveBeenCalledWith("foo", options);
        });

        it("should return false if input is undefined", () => {
            let validator = new IsLengthValidator(options);

            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });

        it("should return false if input is null", () => {
            let validator = new IsLengthValidator(options);

            let result = validator.isValid(null);

            expect(result).toBe(false);
        });
    });
});