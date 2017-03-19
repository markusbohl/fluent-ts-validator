import { IsEqualValidator } from "./IsEqualValidator";

describe("IsEqualValidator", () => {
    describe("isValid()", () => {
        it("should return false if given value is not equal to comparison value", () => {
            let isEqualValidator = new IsEqualValidator<string>("to-be-compared-to");

            let result = isEqualValidator.isValid("something completely different");

            expect(result).toBeFalsy();
        });

        it("should return true if given value is equal to comparison value", () => {
            let isEqualValidator = new IsEqualValidator<string>("equal");

            let result = isEqualValidator.isValid("equal");

            expect(result).toBeTruthy();
        });
    });
});