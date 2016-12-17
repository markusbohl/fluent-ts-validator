/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import * as validatorJS from "validator";

import {
    IsUUIDValidator
} from "./IsUUIDValidator";

describe("IsUUIDValidator", () => {
    describe("isValid() - delegate to validatorJS", () => {

        beforeEach(() => {
            spyOn(validatorJS, "isUUID");
        });

        it("should delegate isUUID-validation to validatorJS instance", () => {
            let validator = new IsUUIDValidator("5");

            validator.isValid("uuid");

            expect(validatorJS.isUUID).toHaveBeenCalledWith("uuid", "5");
        });

        it("should delegate undefined to IsUUID-validation if no specific version is provided", () => {
            let validator = new IsUUIDValidator();

            validator.isValid("uuid");

            expect(validatorJS.isUUID).toHaveBeenCalledWith("uuid", undefined);
        });
    });

    describe("isValid()", () => {
        it("should return true", () => {
            spyOn(validatorJS, "isUUID").and.returnValue(true);
            let validator = new IsUUIDValidator();

            let result = validator.isValid("uuid");

            expect(result).toBeTruthy();
        });

        it("should return false", () => {
            spyOn(validatorJS, "isUUID").and.returnValue(false);
            let validator = new IsUUIDValidator();

            let result = validator.isValid("uuid");

            expect(result).toBeFalsy();
        });
    });
});