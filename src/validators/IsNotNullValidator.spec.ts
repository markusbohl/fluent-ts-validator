/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsNotNullValidator } from "./IsNotNullValidator";

describe("IsNotNullValidator", () => {
    describe("isValid()", () => {
        it("should return false if provided value is undefined", () => {
            let isNotNullValidator = new IsNotNullValidator();
            let notDefined: any;

            let result  = isNotNullValidator.isValid(notDefined);

            expect(result).toBeFalsy();
        });

        it("should return false if provided value is null", () => {
            let isNotNullValidator = new IsNotNullValidator();
            let notDefined: any = null;

            let result  = isNotNullValidator.isValid(notDefined);

            expect(result).toBeFalsy();
        });

        it("should return true if provided value is not null", () => {
            let isNotNullValidator = new IsNotNullValidator();
            let notDefined: any = "foo";

            let result  = isNotNullValidator.isValid(notDefined);

            expect(result).toBeTruthy();
        });
    });
});