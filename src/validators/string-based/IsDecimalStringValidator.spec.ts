"use strict";

import * as validatorJS from "validator";
import { IsDecimalStringValidator } from "./";

describe("IsDecimalStringValidator", () => {
    describe("isValid()", () => {
        let validator: IsDecimalStringValidator;

        beforeEach(() => {
            validator = new IsDecimalStringValidator();
        });

        it("should delegate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isDecimal").and.returnValue(true);

            let result = validator.isValid("0.10");

            expect(result).toBeTruthy();
        });

        it("should delegate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isDecimal").and.returnValue(false);

            let result = validator.isValid("2");

            expect(result).toBeFalsy();
        });
    });
});
