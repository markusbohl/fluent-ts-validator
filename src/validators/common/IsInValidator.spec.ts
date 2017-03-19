import { IsInValidator } from "./IsInValidator";

describe("IsInValidator", () => {
    let numbers = [1, 2, 3, 4, null];
    let isInValidator: IsInValidator<number>;

    beforeEach(() => {
        isInValidator = new IsInValidator(numbers);
    });

    describe("isValid()", () => {
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
});