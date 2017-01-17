"use strict";

import * as validatorJS from "validator";
import {
    IsAlphanumericValidator
} from "./IsAlphanumericValidator";

describe("IsAlphanumericValidator", () => {
    beforeEach(() => {
        spyOn(validatorJS, "isAlphanumeric");
    });

    describe("isValid()", () => {
        it("should delegate isAlphanumeric-validation to validatorJS instance", () => {
            let validator = new IsAlphanumericValidator();

            validator.isValid("abcABC");

            expect(validatorJS.isAlphanumeric).toHaveBeenCalledWith("abcABC", undefined);
        });

        it("should delegate isAlphanumeric-validation to validatorJS instance - with locale", () => {
            let validator = new IsAlphanumericValidator("de-DE");

            validator.isValid("abcABC");

            expect(validatorJS.isAlphanumeric).toHaveBeenCalledWith("abcABC", "de-DE");
        });
    });
});