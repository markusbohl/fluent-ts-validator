"use strict";

import * as validatorJS from "validator";
import { IsNumericStringValidator } from "./IsNumericStringValidator";

describe("IsNumericStringValidator", () => {
    let validator: IsNumericStringValidator;

    beforeEach(() => {
        validator = new IsNumericStringValidator();
        spyOn(validatorJS, "isNumeric");
    });

    describe("isValid()", () => {
        it("should delegate isNumericString-validation to validatorJS instance", () => {
            validator.isValid("0123");

            expect(validatorJS.isNumeric).toHaveBeenCalledWith("0123");
        });
    });
});