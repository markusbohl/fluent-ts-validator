"use strict";

import { IsIso8601Validator } from "./IsIso8601Validator";
import * as validatorJS from "validator";

describe("IsIso8601Validator", () => {
    describe("isValid()", () => {
        it("should delegate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isISO8601").and.returnValue(true);
            let validator = new IsIso8601Validator();

            let result = validator.isValid("2016-12-26");

            expect(result).toBeTruthy();
            expect(validatorJS.isISO8601).toHaveBeenCalledWith("2016-12-26");
        });

        it("should delegate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isISO8601").and.returnValue(false);
            let validator = new IsIso8601Validator();

            let result = validator.isValid("26.12.2016");

            expect(result).toBeFalsy();
            expect(validatorJS.isISO8601).toHaveBeenCalledWith("26.12.2016");
        });
    });
});