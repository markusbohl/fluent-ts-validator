import * as validatorJS from "validator";
import { IsCreditCardValidator } from "./IsCreditCardValidator";


describe("IsCreditCardValidator", () => {
    describe("isValid()", () => {
        let validator: IsCreditCardValidator;

        beforeEach(() => {
            validator = new IsCreditCardValidator();
        });

        it("should delegate validation to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isCreditCard").and.returnValue(true);

            let result = validator.isValid("valid credit card number");

            expect(result).toBeTruthy();
            expect(validatorJS.isCreditCard).toHaveBeenCalledWith("valid credit card number");
        });

        it("should delegate validation to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isCreditCard").and.returnValue(false);

            let result = validator.isValid("invalid credit card number");

            expect(result).toBeFalsy();
            expect(validatorJS.isCreditCard).toHaveBeenCalledWith("invalid credit card number");
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
