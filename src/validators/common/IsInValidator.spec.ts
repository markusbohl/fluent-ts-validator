import {IsInValidator} from "./IsInValidator";

describe("IsInValidator", () => {
    describe("isValid() - with iterable", () => {

        let numbers = [1, 2, 3, 4, null];
        let isInValidator: IsInValidator<number | null>;

        beforeEach(() => {
            isInValidator = new IsInValidator(numbers);
        });

        it("should return true if given value is element of given array", () => {
            let result = isInValidator.isValid(1);

            expect(result).toBeTruthy();
        });

        it("should return true if given null value is element of given array", () => {
            let result = isInValidator.isValid(null);

            expect(result).toBeTruthy();
        });

        it("should return false if given value is not element of the given array", () => {
            let result = isInValidator.isValid(-1);

            expect(result).toBeFalsy();
        });

        it("should return false if given array is empty", () => {
            let emptyArray: Array<number> = [];
            isInValidator = new IsInValidator(emptyArray);

            let result = isInValidator.isValid(0);

            expect(result).toBeFalsy();
        });

        it("should return false for null if given array is empty", () => {
            let emptyArray: Array<number> = [];
            isInValidator = new IsInValidator(emptyArray);

            let result = isInValidator.isValid(null);

            expect(result).toBeFalsy();
        });
    });

    describe("isValid() - with string enum", () => {
        it("should return true if given value is in enum", () => {
            const validator = new IsInValidator(StringColors);

            const result = validator.isValid(StringColors.Green);

            expect(result).toBe(true);
        });

        it("should return true if given value is equals to a value of the enum", () => {
            const validator = new IsInValidator(StringColors);

            const result = validator.isValid("BLUE");

            expect(result).toBe(true);
        });

        it("should return false if given value is not equals to a value of the enum", () => {
            const validator = new IsInValidator(StringColors);

            const result = validator.isValid("foobar");

            expect(result).toBe(false);
        });

        it("should return false if given value is undefined", () => {
            const validator = new IsInValidator(StringColors);

            const result = validator.isValid(void 0);

            expect(result).toBe(false);
        });
    });

    describe("isValid() - with num enum", () => {
        it("should return true if given value is in enum", () => {
            const validator = new IsInValidator(NumColors);

            const result = validator.isValid(NumColors.Blue);

            expect(result).toBe(true);
        });

        it("should return true if given value is equals to a value of the enum", () => {
            const validator = new IsInValidator(NumColors);

            const result = validator.isValid(2);

            expect(result).toBe(true);
        });

        it("should return false if given value is not equals to a value of the enum", () => {
            const validator = new IsInValidator(NumColors);

            const result = validator.isValid(-1);

            expect(result).toBe(false);
        });

        it("should return false if given value is undefined", () => {
            const validator = new IsInValidator(NumColors);

            const result = validator.isValid(void 0);

            expect(result).toBe(false);
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
