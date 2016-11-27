/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidationFailure } from "./ValidationFailure";

describe("ValidationFailure", () => {
    describe("constructor", () => {
        it("should set propertyName and errorMessage", () => {
            let failure = new ValidationFailure("propertyName", "errorMessage");

            expect(failure.propertyName).toBe("propertyName");
            expect(failure.errorMessage).toBe("errorMessage");
        });

        it("should set propertyName, errorMessage, and attemptedValue", () => {
            let failure = new ValidationFailure("propertyName", "errorMessage", "attemptedValue");

            expect(failure.propertyName).toBe("propertyName");
            expect(failure.errorMessage).toBe("errorMessage");
            expect(failure.attemptedValue).toBe("attemptedValue");
        });
    });
});