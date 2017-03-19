import {IsNegativeValidator} from "./IsNegativeValidator";

describe("IsNegativeValidator", () => {
    describe("isValid()", () => {
        let validator: IsNegativeValidator;

        beforeEach(() => {
            validator = new IsNegativeValidator();
        });

        it("should return true if given number is less than zero", () => {
            let result = validator.isValid(-1);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is zero", () => {
            let result = validator.isValid(0);

            expect(result).toBeFalsy();
        });

        it("should return false if given number is greater than zero", () => {
            let result = validator.isValid(1);

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