/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import * as validatorJS from "validator";
import { EmailOptions } from "../../shared";
import {
    IsEmailValidator
} from "./IsEmailValidator";

describe("IsEmailValidator", () => {
    describe("isValid() - delegate to validatorJS", () => {
        it("should delegate isEmail-validation to validatorJS instance", () => {
            spyOn(validatorJS, "isEmail");
            let validator = new IsEmailValidator();

            validator.isValid("test@example.com");

            expect(validatorJS.isEmail).toHaveBeenCalledWith("test@example.com", undefined);
        });

        it("should delegate isEmail-validation with options to validatorJS instance", () => {
            spyOn(validatorJS, "isEmail");
            let options: EmailOptions = {
                allow_display_name: true,
                allow_utf8_local_part: true,
                require_tld: true
            };
            let validator = new IsEmailValidator(options);

            validator.isValid("test@example.com");

            expect(validatorJS.isEmail).toHaveBeenCalledWith("test@example.com", options);
        });

        it("should return true", () => {
            spyOn(validatorJS, "isEmail").and.returnValue(true);
            let validator = new IsEmailValidator();

            let result = validator.isValid("test@example.com");

            expect(result).toBeTruthy();
        });

        it("should return false", () => {
            spyOn(validatorJS, "isEmail").and.returnValue(false);
            let validator = new IsEmailValidator();

            let result = validator.isValid("test@example.com");

            expect(result).toBeFalsy();
        });
    });
});