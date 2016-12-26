"use strict";

import { IsHexadecimalValidator } from "./IsHexadecimalValidator";
import * as validatorJS from "validator";

describe("IsHexadecimalValidator", () => {
    describe("isValid()", () => {
        it("should delegate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isHexadecimal").and.returnValue(true);
            let validator = new IsHexadecimalValidator();

            let result = validator.isValid("1AF");

            expect(result).toBeTruthy();
            expect(validatorJS.isHexadecimal).toHaveBeenCalledWith("1AF");
        });

        it("should delegate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isHexadecimal").and.returnValue(false);
            let validator = new IsHexadecimalValidator();

            let result = validator.isValid("M");

            expect(result).toBeFalsy();
            expect(validatorJS.isHexadecimal).toHaveBeenCalledWith("M");
        });
    });
});