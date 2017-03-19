import {IsNullValidator} from "./IsNullValidator";

describe("IsNullValidator", () => {
    describe("isValid()", () => {
        it("should return true if the given value is null", () => {
            let isNullValidator = new IsNullValidator();

            let result = isNullValidator.isValid(null);

            expect(result).toBeTruthy();
        });

        it("should return false if the given value is not null", () => {
            let isNullValidator = new IsNullValidator();

            let result = isNullValidator.isValid("not null");

            expect(result).toBeFalsy();
        });

        it("should return false if the given value is undefined", () => {
            let isNullValidator = new IsNullValidator();
            let notDefined: string;

            let result = isNullValidator.isValid(notDefined);

            expect(result).toBeFalsy();
        });
    });
});