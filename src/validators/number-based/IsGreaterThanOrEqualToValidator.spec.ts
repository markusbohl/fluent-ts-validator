import {IsGreaterThanOrEqualToValidator} from "./IsGreaterThanOrEqualToValidator";

describe("IsGreaterThanOrEqualToValidator", () => {
    describe("isValid()", () => {
        let validator: IsGreaterThanOrEqualToValidator;
        const threshold = 100;

        beforeEach(() => {
            validator = new IsGreaterThanOrEqualToValidator(threshold);
        });

        it("should return true if given number is equal to the threshold value", () => {
            let result = validator.isValid(100);

            expect(result).toBeTruthy();
        });

        it("should return true if given number is greater than the threshold value", () => {
            let result = validator.isValid(101);

            expect(result).toBeTruthy();
        });

        it("should return false if given number is less than the threshold value", () => {
            let result = validator.isValid(99);

            expect(result).toBeFalsy();
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBeFalsy();
        });

        describe("when threshold is 0", () => {
            beforeEach(() => {
                validator = new IsGreaterThanOrEqualToValidator(0);
            });

            it("should return true if given number is equal to the threshold value", () => {
                let result = validator.isValid(0);

                expect(result).toBeTruthy();
            });

            it("should return true if given number is greater than the threshold value", () => {
                let result = validator.isValid(1);

                expect(result).toBeTruthy();
            });

            it("should return false if given number is less than the threshold value", () => {
                let result = validator.isValid(-1);

                expect(result).toBeFalsy();
            });
        });
    });
});
