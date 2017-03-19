import { IsNotInValidator } from "./IsNotInValidator";

describe("IsNotInValidator", () => {
    let elements = ["one", "two", "three", null];
    let isNotInValidator: IsNotInValidator<string>;

    beforeEach(() => {
        isNotInValidator = new IsNotInValidator(elements);
    });

    describe("isValid()", () => {
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
});