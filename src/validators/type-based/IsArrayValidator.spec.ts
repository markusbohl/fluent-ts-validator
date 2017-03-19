import { IsArrayValidator } from "./IsArrayValidator";

describe("IsArrayValidator", () => {
    describe("isValid()", () => {
        let isArrayValidator: IsArrayValidator;
        beforeEach(() => {
            isArrayValidator = new IsArrayValidator();
        });

        it("should return true if given value is instance of Array", () => {
            let value = [1, 2, 3];

            let result = isArrayValidator.isValid(value);

            expect(result).toBeTruthy();
        });

        it("should return false if given value is null", () => {
            let value: Array<number> = null;

            let result = isArrayValidator.isValid(value);

            expect(result).toBeFalsy();
        });

        it("should return false if given value is not an Array instance", () => {
            let result = isArrayValidator.isValid("not an array");

            expect(result).toBeFalsy();
        });
    });
});