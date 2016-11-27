/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidationResult } from "./ValidationResult";
import { ValidationFailure } from "./ValidationFailure";

describe("ValidationResult", () => {
    let result: ValidationResult;

    beforeEach(() => {
        result = new ValidationResult();
    });

    describe("isValid()", () => {
        it("should return true if no failure exist", () => {
            expect(result.isValid()).toBeTruthy();
        });

        it("should return false if a failure has been added", () => {
            let failure = new ValidationFailure("propertyName", "errorMessage");

            result.addFailure(failure);

            expect(result.isValid()).toBeFalsy();
        });

        it("should continue to return false even after clearing the returned array", () => {
            let failure = new ValidationFailure("propertyName", "errorMessage");

            result.addFailure(failure);
            result.getFailures().pop();

            expect(result.isValid()).toBeFalsy();
        });
    });

    describe("getFailures()", () => {
        it("should initially return an empty array", () => {
            expect(result.getFailures().length).toBe(0);
        });

        it("should return a copy of the interal array", () => {
            let failure = new ValidationFailure("propertyName", "errorMessage");

            result.addFailure(failure);
            result.getFailures().pop();

            expect(result.getFailures()).toContain(failure);
        });
    });

    describe("addFailure()", () => {
        it("should add a failure to the result", () => {
            let failure = new ValidationFailure("propertyName", "errorMessage");

            result.addFailure(failure);

            expect(result.getFailures()).toContain(failure);
        });
    });
});