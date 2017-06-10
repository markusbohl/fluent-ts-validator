import * as validatorJS from "validator";
import {IsAlphaValidator} from "./IsAlphaValidator";

describe("IsAlphaValidator", () => {
    beforeEach(() => {
        spyOn(validatorJS, "isAlpha").and.callThrough();
    });

    describe("isValid()", () => {
        it("should delegate isAlpha-validation to validatorJS instance", () => {
            let validator = new IsAlphaValidator();

            let result = validator.isValid("abcABC");

            expect(validatorJS.isAlpha).toHaveBeenCalledWith("abcABC", undefined);
            expect(result).toBe(true);
        });

        it("should delegate isAlpha-validation to validatorJS instance - with locale", () => {
            let validator = new IsAlphaValidator("de-DE");

            let result = validator.isValid("abcABC");

            expect(validatorJS.isAlpha).toHaveBeenCalledWith("abcABC", "de-DE");
            expect(result).toBe(true);
        });

        it("should return false if input is undefined", () => {
            let validator = new IsAlphaValidator();

            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });
    });
});
