import { IsLessThanValidator } from "./IsLessThanValidator";

describe("IsLessThanValidator", () => {
    describe("isValid()", () => {
        let validator: IsLessThanValidator;
        const threshold = 100;

        beforeEach(() => {
            validator = new IsLessThanValidator(threshold);
        });

        it("should return true if given number is less than the threshold", () => {
            let result = validator.isValid(99);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is equal to the threshold", () => {
            let result = validator.isValid(100);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is greater than the threshold", () => {
            let result = validator.isValid(101);

            expect(result).toBeFalsy();
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBeFalsy();
        });

        it("should return false if input is null", () => {
            let result = validator.isValid(null);

            expect(result).toBeFalsy();
        });
    });
});