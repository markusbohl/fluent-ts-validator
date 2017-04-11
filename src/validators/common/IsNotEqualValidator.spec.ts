import {IsNotEqualValidator} from "./IsNotEqualValidator";

describe("IsNotEqualValidator", () => {
    describe("isValid()", () => {
        it("should return false if given value and comparison value are equal", () => {
            let isNotEqualValidator = new IsNotEqualValidator<string>("equal-value");

            let result = isNotEqualValidator.isValid("equal-value");

            expect(result).toBeFalsy();
        });

        it("should return true if given value and comparison value are not equal", () => {
            let isNotEqualValidator = new IsNotEqualValidator<string>("comparison-value");

            let result = isNotEqualValidator.isValid("different-value");

            expect(result).toBeTruthy();
        });
    });
});