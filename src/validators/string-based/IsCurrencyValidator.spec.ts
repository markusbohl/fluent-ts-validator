"use strict";

import * as validatorJS from "validator";
import { IsCurrencyValidator } from "./IsCurrencyValidator";
import { CurrencyOptions } from "../../shared";

describe("IsCurrencyValidator", () => {
    describe("isValid()", () => {
        let validator: IsCurrencyValidator;

        beforeEach(() => {
            validator = new IsCurrencyValidator();
        });

        it("should delgate to validatorJS instance with options", () => {
            let options: CurrencyOptions = {
                symbol: "EUR",
                allow_space_after_digits: true,
                symbol_after_digits: true
            };
            validator = new IsCurrencyValidator(options);
            spyOn(validatorJS, "isCurrency");

            let result = validator.isValid("1.0 EUR");

            expect(validatorJS.isCurrency).toHaveBeenCalledWith("1.0 EUR", options);
        });

        it("should delgate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isCurrency").and.returnValue(true);

            let result = validator.isValid("3 EUR");

            expect(result).toBeTruthy();
            expect(validatorJS.isCurrency).toHaveBeenCalledWith("3 EUR", undefined);
        });

        it("should delgate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isCurrency").and.returnValue(false);

            let result = validator.isValid("one EUR");

            expect(result).toBeFalsy();
            expect(validatorJS.isCurrency).toHaveBeenCalledWith("one EUR", undefined);
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

