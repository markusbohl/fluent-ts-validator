"use strict";

import * as validatorJS from "validator";
import { IsDateStringValidator } from "./IsDateStringValidator";

describe("IsDateStringValidator", () => {
    let validator: IsDateStringValidator;

    beforeEach(() => {
        validator = new IsDateStringValidator();
        spyOn(validatorJS, "isDate");
    });

    describe("isValid()", () => {
        it("should delegate isDateString-validation to validatorJS instance", () => {
            validator.isValid("2016-11-14");

            expect(validatorJS.isDate).toHaveBeenCalledWith("2016-11-14");
        });
    });
});