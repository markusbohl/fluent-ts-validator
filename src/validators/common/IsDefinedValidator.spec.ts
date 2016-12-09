/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsDefinedValidator } from "./IsDefinedValidator";

describe("IsDefinedValidator", () => {

    let isDefinedValidator: IsDefinedValidator;

    beforeEach(() => {
        isDefinedValidator = new IsDefinedValidator();
    });

    describe("isValid()", () => {
        it("should return true if given value is defined", () => {
            let definedValue = "foo";

            let result = isDefinedValidator.isValid(definedValue);

            expect(result).toBeTruthy();
        });

        it("should return false if given value is not defined", () => {
            let notDefined: string;

            let result = isDefinedValidator.isValid(notDefined);

            expect(result).toBeFalsy();
        });
    });
});