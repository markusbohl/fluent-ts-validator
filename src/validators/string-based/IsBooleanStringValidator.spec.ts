/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import * as validatorJS from "validator";
import { IsBooleanStringValidator } from "./IsBooleanStringValidator";

describe("IsBooleanStringValidator", () => {
    let validator: IsBooleanStringValidator;

    beforeEach(() => {
        validator = new IsBooleanStringValidator();
        spyOn(validatorJS, "isBoolean");
    });

    describe("isValid()", () => {
        it("should delegate isBoolean-validation to validatorJS instance", () => {
            validator.isValid("true");

            expect(validatorJS.isBoolean).toHaveBeenCalledWith("true");
        });
    });
});