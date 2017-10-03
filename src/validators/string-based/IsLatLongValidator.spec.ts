import {IsLatLongValidator} from "./IsLatLongValidator";

describe("IsLatLongValidator", () => {

    let validator: IsLatLongValidator;

    beforeEach(() => {
        validator = new IsLatLongValidator();
    });

    describe("isValid()", () => {
        it("should delegate to validator.js - success case", () => {
            const result = validator.isValid("27.987850, 86.925024");

            expect(result).toBe(true);
        });

        it("should delegate to validator.js - failure case", () => {
            const result = validator.isValid("not a LatLong pair");

            expect(result).toBe(false);
        });

        it("should return false if input is undefined", () => {
            let undeinfedInput;

            const result = validator.isValid(undeinfedInput);

            expect(result).toBe(false);
        });
    });
});
