import {RuleApplicationOutcome} from "./RuleApplicationOutcome";
import {ValidationFailure} from "../shared/ValidationFailure";

describe("RuleApplicationOutcome", () => {

    let failure: ValidationFailure;

    beforeEach(() => {
        failure = new ValidationFailure(null, 'property', null);
    });

    describe("RuleApplicationOutcome()", () => {
        it("should add an optional validation failure to the internal collection of failures", () => {
            let outcome = new RuleApplicationOutcome(failure);

            expect(outcome.isFailure()).toBeTruthy();
            expect(outcome.getValidationFailures()).toContain(failure);
        });

        it("should not add an undefined value to the internal collection of failures", () => {
            let outcome = new RuleApplicationOutcome(undefined);

            expect(outcome.isFailure()).toBeFalsy();
            expect(outcome.getValidationFailures().length).toEqual(0);
        });
    });

    describe("isSuccess()", () => {
        it("should return true if no validation failure has been added", () => {
            let outcome = new RuleApplicationOutcome();

            expect(outcome.isSuccess()).toBeTruthy();
        });

        it("should return false if at least one validation failure has been added", () => {
            let outcome = new RuleApplicationOutcome();

            outcome.addValidationFailure(failure);

            expect(outcome.isSuccess()).toBeFalsy();
        });
    });

    describe("isFailure()", () => {
        it("should return false if no validation failure has been added", () => {
            let outcome = new RuleApplicationOutcome();

            expect(outcome.isFailure()).toBeFalsy();
        });

        it("should return true if a validation failure has been added", () => {
            let outcome = new RuleApplicationOutcome();

            outcome.addValidationFailure(failure);

            expect(outcome.isFailure()).toBeTruthy();
        });
    });

    describe("getValidationFailures()", () => {
        it("should return empty array if no validation failure has been added", () => {
            let outcome = new RuleApplicationOutcome();

            expect(outcome.getValidationFailures().length).toBe(0);
        });

        it("should return provided validation failures", () => {
            let outcome = new RuleApplicationOutcome();

            outcome.addValidationFailure(failure);

            expect(outcome.getValidationFailures()).toContain(failure);
        });

        it("should return clone of internal array to be protected against manipulation", () => {
            let outcome = new RuleApplicationOutcome();

            outcome.addValidationFailure(failure);
            outcome.getValidationFailures().pop();

            expect(outcome.getValidationFailures()).toContain(failure);
        });
    });
});
