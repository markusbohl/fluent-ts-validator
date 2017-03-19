import * as validatorJS from "validator";
import { IsBase64Validator } from "./IsBase64Validator";


describe("IsBase64Validator", () => {
    describe("isValid()", () => {
        let validator: IsBase64Validator;

        beforeEach(() => {
            validator = new IsBase64Validator();
        });

        it("should delegate validation to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isBase64").and.returnValue(true);

            let result = validator.isValid("dmFsaWQ=");

            expect(result).toBeTruthy();
            expect(validatorJS.isBase64).toHaveBeenCalledWith("dmFsaWQ=");
        });

        it("should delegate validation to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isBase64").and.returnValue(false);

            let result = validator.isValid("aW52YWxpZA==");

            expect(result).toBeFalsy();
            expect(validatorJS.isBase64).toHaveBeenCalledWith("aW52YWxpZA==");
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
