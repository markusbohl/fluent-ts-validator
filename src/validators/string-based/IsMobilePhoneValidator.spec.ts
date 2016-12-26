"use strict";

import { IsMobilePhoneValidator } from "./IsMobilePhoneValidator";
import { MobilePhoneLocale } from "../../shared/";
import * as validatorJS from "validator";

describe("IsMobilePhoneValidator", () => {
    describe("isValid()", () => {
        it("should delegate to validatorJS instance - success case", () => {
            let locale: MobilePhoneLocale = "de-DE";
            let validator = new IsMobilePhoneValidator(locale);
            spyOn(validatorJS, "isMobilePhone").and.returnValue(true);

            let result = validator.isValid("+49-123-4567890");

            expect(result).toBeTruthy();
            expect(validatorJS.isMobilePhone).toHaveBeenCalledWith("+49-123-4567890", locale);
        });

        it("should delegate to validatorJS instance - success case", () => {
            let locale: MobilePhoneLocale = "de-DE";
            let validator = new IsMobilePhoneValidator(locale);
            spyOn(validatorJS, "isMobilePhone").and.returnValue(false);

            let result = validator.isValid("123");

            expect(result).toBeFalsy();
            expect(validatorJS.isMobilePhone).toHaveBeenCalledWith("123", locale);
        });
    });
});