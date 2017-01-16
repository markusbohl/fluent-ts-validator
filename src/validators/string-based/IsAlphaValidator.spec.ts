"use strict";

import * as validatorJS from "validator";
import {
    IsAlphaValidator
} from "./IsAlphaValidator";

describe("IsAlphaValidator", () => {
    beforeEach(() => {
        spyOn(validatorJS, "isAlpha");
    });

    describe("isValid()", () => {
        it("should delegate isAlpha-validation to validatorJS instance", () => {
            let validator = new IsAlphaValidator();

            validator.isValid("abcABC");

            expect(validatorJS.isAlpha).toHaveBeenCalledWith("abcABC", undefined);
        });

        it("should delegate isAlpha-validation to validatorJS instance - with locale", () => {
            let validator = new IsAlphaValidator("de-DE");

            validator.isValid("abcABC");

            expect(validatorJS.isAlpha).toHaveBeenCalledWith("abcABC", "de-DE");
        });
    });
});