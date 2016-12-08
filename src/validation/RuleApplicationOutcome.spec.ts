/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { RuleApplicationOutcome } from "./RuleApplicationOutcome";
import { ValidationFailure } from "../shared/ValidationFailure";

describe("RuleApplicationOutcome", () => {

    let failure: ValidationFailure;

    beforeEach(() => {
        failure = new ValidationFailure(null, null, null);
    });

    describe("isSuccess()", () => {
        it("should return true if no validation failure is set", () => {
            let outcome = new RuleApplicationOutcome();

            expect(outcome.isSuccess()).toBeTruthy();
        });

        it("should return false if a validation failure is set", () => {
            let outcome = new RuleApplicationOutcome(failure);

            expect(outcome.isSuccess()).toBeFalsy();
        });
    });

    describe("isFailure()", () => {
        it("should return false if no validation failure is set", () => {
            let outcome = new RuleApplicationOutcome();

            expect(outcome.isFailure()).toBeFalsy();
        });

        it("should return true if a validation failure is set", () => {
            let outcome = new RuleApplicationOutcome(failure);

            expect(outcome.isFailure()).toBeTruthy();
        });
    });

    describe("getValidationFailure()", () => {
        it("should return null if no validation failure has been set", () => {
            let outcome = new RuleApplicationOutcome();

            expect(outcome.getValidationFailure()).toBeNull();
        });

        it("should return the provided validation failure", () => {
            let outcome = new RuleApplicationOutcome(failure);

            expect(outcome.getValidationFailure()).toBe(failure);
        });
    });
});