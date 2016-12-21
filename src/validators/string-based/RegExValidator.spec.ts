/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import * as validatorJS from "validator";

import { RegExValidator } from "./RegExValidator";

describe("RegExValidator", () => {

    const regexp = new RegExp("^foo$");

    describe("isValid()", () => {
        it("should delegate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "matches").and.returnValue(true);
            let regexValidator = new RegExValidator(regexp);

            let result = regexValidator.isValid("foo");

            expect(result).toBeTruthy();
            expect(validatorJS.matches).toHaveBeenCalledWith("foo", regexp, undefined);
        });

        it("should delegate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "matches").and.returnValue(false);
            let regexValidator = new RegExValidator(regexp);

            let result = regexValidator.isValid("bar");

            expect(result).toBeFalsy();
            expect(validatorJS.matches).toHaveBeenCalledWith("bar", regexp, undefined);
        });

        it("should pass modifiers (if provided) to validatorJF function", () => {
            spyOn(validatorJS, "matches");
            let regexValidator = new RegExValidator(regexp, "i");

            regexValidator.isValid("foo");

            expect(validatorJS.matches).toHaveBeenCalledWith("foo", regexp, "i");
        });
    });
});
