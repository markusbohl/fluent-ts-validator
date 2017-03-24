import {IsUndefinedValidator} from "./IsUndefinedValidator";

describe("IsUndefinedValidator", () => {
    let validator: IsUndefinedValidator;
    beforeEach(() => {
        validator = new IsUndefinedValidator();
    });

    describe("isValid()", () => {
        it("should return true if given value is undefined", () => {
            let notDefined;

            expect(validator.isValid(notDefined)).toBe(true);
        });

        it("should return false if given value is defined", () => {
            let definedValue = "yeah";

            expect(validator.isValid(definedValue)).toBe(false);
        });
    });
});