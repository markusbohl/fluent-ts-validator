import {IsGreaterThanValidator} from "./IsGreaterThanValidator";

describe("IsGreaterThanValidator", () => {
    describe("isValid()", () => {
        let validator: IsGreaterThanValidator;
        const threshold = 100;
        beforeEach(() => {
            validator = new IsGreaterThanValidator(threshold);
        });

        it("should return true if given number is greater than the threshold", () => {
            let result = validator.isValid(101);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is equal to the threshold", () => {
            let result = validator.isValid(100);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is less than the threshold", () => {
            let result = validator.isValid(99);

            expect(result).toBeFalsy();
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBeFalsy();
        });
    });
});
