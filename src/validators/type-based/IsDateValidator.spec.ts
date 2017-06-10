import {IsDateValidator} from "./IsDateValidator";

describe("IsDateValidator", () => {
    describe("isValid()", () => {
        it("should return true if input is an instance of Date", () => {
            let isDateValidator = new IsDateValidator();
            let date = new Date();

            let result = isDateValidator.isValid(date);

            expect(result).toBeTruthy();
        });

        it("should return false if input is undefined", () => {
            let isDateValidator = new IsDateValidator();

            let result = isDateValidator.isValid(undefined);

            expect(result).toBeFalsy();
        });

        it("should return false if input is not a Date instance", () => {
            let isDateValidator = new IsDateValidator();

            let result = isDateValidator.isValid("string");

            expect(result).toBeFalsy();
        });
    });
});
