import {IsNotNullValidator} from "./IsNotNullValidator";

describe("IsNotNullValidator", () => {
    describe("isValid()", () => {
        it("should return false if provided value is undefined", () => {
            let isNotNullValidator = new IsNotNullValidator();

            let result = isNotNullValidator.isValid(undefined);

            expect(result).toBeFalsy();
        });

        it("should return false if provided value is null", () => {
            let isNotNullValidator = new IsNotNullValidator();

            let result = isNotNullValidator.isValid(null);

            expect(result).toBeFalsy();
        });

        it("should return true if provided value is not null", () => {
            let isNotNullValidator = new IsNotNullValidator();

            let result = isNotNullValidator.isValid("foo");

            expect(result).toBeTruthy();
        });
    });
});
