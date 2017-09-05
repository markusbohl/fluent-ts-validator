import {IsNotInValidator} from "./IsNotInValidator";

describe("IsNotInValidator", () => {

    describe("isValid() - with iterable", () => {
        let elements = ["one", "two", "three", null];
        let isNotInValidator: IsNotInValidator<string | null>;

        beforeEach(() => {
            isNotInValidator = new IsNotInValidator(elements);
        });

        it("should return true if given value is not in the given array", () => {
            let result = isNotInValidator.isValid("not-in-there");

            expect(result).toBeTruthy();
        });

        it("should return true if the given array is empty", () => {
            let emptyArray: Array<string> = [];
            isNotInValidator = new IsNotInValidator(emptyArray);

            let result = isNotInValidator.isValid("anything-goes");

            expect(result).toBeTruthy();
        });

        it("should return false if given value is in the given array", () => {
            let result = isNotInValidator.isValid("two");

            expect(result).toBeFalsy();
        });

        it("should return false if given null value is in the given array", () => {
            let result = isNotInValidator.isValid(null);

            expect(result).toBeFalsy();
        });
    });

    describe("isValid() - with enum", () => {
        it("should return false if provided string value exists in given string enum", () => {
            const validator = new IsNotInValidator(StringColors);

            const result = validator.isValid("BLUE");

            expect(result).toBe(false);
        });

        it("should return false if provided value exists in given string enum", () => {
            const validator = new IsNotInValidator(StringColors);

            const result = validator.isValid(StringColors.Red);

            expect(result).toBe(false);
        });

        it("should return true if provided string value does not exist in given string enum", () => {
            const validator = new IsNotInValidator(StringColors);

            const result = validator.isValid("BLACK");

            expect(result).toBe(true);
        });

        it("should return false if provided number value exists in given number enum", () => {
            const validator = new IsNotInValidator(NumColors);

            const result = validator.isValid(2);

            expect(result).toBe(false);
        });

        it("should return false if provided value exists in given number enum", () => {
            const validator = new IsNotInValidator(NumColors);

            const result = validator.isValid(NumColors.Red);

            expect(result).toBe(false);
        });

        it("should return true if provided number value does not exist in given number enum", () => {
            const validator = new IsNotInValidator(NumColors);

            const result = validator.isValid(-1);

            expect(result).toBe(true);
        });
    });
});

enum StringColors {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
}

enum NumColors {
    Red = 1,
    Green = 2,
    Blue = 3,
}
