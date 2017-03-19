import * as validatorJS from "validator";
import { IsAsciiValidator } from "./IsAsciiValidator";

describe("IsAsciiValidator", () => {
    describe("isValid()", () => {
        let validator: IsAsciiValidator;

        beforeEach(() => {
            validator = new IsAsciiValidator();
        });

        it("should delegate validation to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isAscii").and.returnValue(true);

            let result = validator.isValid("ASCII");

            expect(result).toBeTruthy();
            expect(validatorJS.isAscii).toHaveBeenCalledWith("ASCII");
        });

        it("should delegate validation to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isAscii").and.returnValue(false);

            let result = validator.isValid("¨ˆΩ≈¨ˆ");

            expect(result).toBeFalsy();
            expect(validatorJS.isAscii).toHaveBeenCalledWith("¨ˆΩ≈¨ˆ");
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
