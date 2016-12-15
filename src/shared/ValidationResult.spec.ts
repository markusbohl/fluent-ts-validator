/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationResult,
    ValidationFailure
} from "./";

describe("ValidationResult", () => {
    let result: ValidationResult;
    let failure: ValidationFailure;

    beforeEach(() => {
        result = new ValidationResult();
        failure = new ValidationFailure(null, null, null);
    });

    describe("isValid()", () => {
        it("should return true if no failure exist", () => {
            expect(result.isValid()).toBeTruthy();
        });

        it("should return false if a failure has been added", () => {
            result.addFailure(failure);

            expect(result.isValid()).toBeFalsy();
        });

        it("should continue to return false even after clearing the returned array", () => {
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
            result.addFailure(failure);
            result.getFailures().pop();

            expect(result.getFailures()).toContain(failure);
        });
    });

    describe("addFailure()", () => {
        it("should add a failure to the result", () => {
            result.addFailure(failure);

            expect(result.getFailures()).toContain(failure);
        });

        it("should not add a null to the result", () => {
            result.addFailure(null);

            expect(result.getFailures().length).toBe(0);
            expect(result.getFailures()).not.toContain(null);
        });
    });
});