import * as validatorJS from "validator";
import {IsPostalCodeValidator} from "./IsPostalCodeValidator";

describe("IsPostalCodeValidator", () => {
    let validator: IsPostalCodeValidator;

    beforeEach(() => {
        validator = new IsPostalCodeValidator("DE");
        spyOn(validatorJS, "isPostalCode").and.returnValue(true);
    });

    describe("isValid()", () => {
        it("should delegate isPostalCode-validation to validatorJS instance and return its result", () => {
            const result = validator.isValid("12345");

            expect(result).toBe(true);
            expect(validatorJS.isPostalCode).toHaveBeenCalledWith("12345", "DE");
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });
    });
});
