"use strict";

import * as validatorJS from "validator";
import { ContainsValidator } from "./ContainsValidator";

describe("ContainsValidator", () => {
    let validator: ContainsValidator;

    beforeEach(() => {
        validator = new ContainsValidator("foo");
        spyOn(validatorJS, "contains");
    });

    describe("isValid()", () => {
        it("should delegate contains-validation to validatorJS instance", () => {
            validator.isValid("foobar");

            expect(validatorJS.contains).toHaveBeenCalledWith("foobar", "foo");
        });
    });
});