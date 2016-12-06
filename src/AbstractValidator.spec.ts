/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { AbstractValidator } from "./AbstractValidator";
import { Severity } from "./validation/Severity";
import { ValidationResult } from "./validation/ValidationResult";
import { ValidationFailure } from "./validation/ValidationFailure";

let validationFailure: ValidationFailure = null;

class TestValidator extends AbstractValidator<TestPerson> {
    constructor() {
        super();
        this.ruleFor((input: TestPerson) => { return input.name; }).isNotNull()
            .withErrorCode("C-3628/B");
        this.ruleFor((input: TestPerson) => { return input.age; }).isEqualTo(18)
            .withErrorMessage("not eighteen").withSeverity(Severity.INFO);
        this.ruleFor((input: TestPerson) => { return input.address; }).isEmpty()
            .onFailure((failure) => {
                validationFailure = failure;
            });
    }
}

class TestPerson {
    name: string;
    age: number;
    address: string;
}

describe("AbstractValidator", () => {
    describe("TestValidator.validate()", () => {
        let validator: TestValidator;

        beforeEach(() => {
            validationFailure = null;
            validator = new TestValidator();
        });

        it("should return a positive validation result for a valid instance", () => {
            let person = new TestPerson();
            person.name = "Franz";
            person.age = 18;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return a negative validation result if name is null", () => {
            let person = new TestPerson();
            person.name = null;
            person.age = 18;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a proper failure-object if name is null", () => {
            let person = new TestPerson();
            person.name = null;
            person.age = 18;

            let failure: ValidationFailure = validator.validate(person).getFailures()[0];

            expect(failure.target).toBe(person);
            expect(failure.propertyName).toBe("name");
            expect(failure.errorCode).toBe("C-3628/B");
            expect(failure.severity).toBe(Severity.ERROR);
            expect(failure.errorMessage).not.toBeDefined();
        });

        it("should return a negative validation result if age is not 18", () => {
            let person = new TestPerson();
            person.name = "Franz";
            person.age = 21;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a proper failure-object if age is not 18", () => {
            let person = new TestPerson();
            person.name = "Franz";
            person.age = 21;

            let failure: ValidationFailure = validator.validate(person).getFailures()[0];

            expect(failure.target).toBe(person);
            expect(failure.propertyName).toBe("age");
            expect(failure.errorCode).not.toBeDefined();
            expect(failure.severity).toBe(Severity.INFO);
            expect(failure.errorMessage).toBe("not eighteen");
        });

        it("should return one failure for every validation that failed", () => {
            let person = new TestPerson();
            person.name = null;
            person.age = 21;

            let result: ValidationResult = validator.validate(person);

            expect(result.getFailures().length).toBe(2);
        });

        it("should trigger callback on failure", () => {
            let person = new TestPerson();
            person.name = "Franz";
            person.age = 18;
            person.address = "my address";

            validator.validate(person);

            expect(validationFailure).not.toBeNull();
            expect(validationFailure.target).toBe(person);
            expect(validationFailure.propertyName).toBe("address");
        });
    });
});