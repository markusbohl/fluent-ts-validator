import {IsLessThanOrEqualToValidator} from "./IsLessThanOrEqualToValidator";

describe("IsLessThanOrEqualToValidator", () => {
    describe("isValid()", () => {
        let validator: IsLessThanOrEqualToValidator;
        const threshold = 100;

        beforeEach(() => {
            validator = new IsLessThanOrEqualToValidator(threshold);
        });

        it("should return true if given number is equal to the threshold value", () => {
            let result = validator.isValid(100);

            expect(result).toBeTruthy();
        });

        it("should return true if given number is less than the threshold value", () => {
            let result = validator.isValid(99);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is greater than the threshold value", () => {
            let result = validator.isValid(101);

            expect(result).toBeFalsy();
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBeFalsy();
        });
    });
});
