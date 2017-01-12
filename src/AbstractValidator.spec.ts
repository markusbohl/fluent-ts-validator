/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    Severity,
    ValidationFailure
} from "./shared";

import {
    ValidationResult,
    AbstractValidator
} from "./";

let validationFailure: ValidationFailure = null;

class TestPerson {
    name: string;
    age: number;
    address: string;
    email: string;
    dateOfBirth: Date;
}

class TestValidator extends AbstractValidator<TestPerson> {
    constructor() {
        super();
        this.ruleForNumber((input: TestPerson) => input.age).isGreaterThanOrEqual(8);
        this.ruleForString((input: TestPerson) => { return input.name; }).isNotNull()
            .withErrorCode("C-3628/B");
        this.ruleForString((input: TestPerson) => { return input.email; }).isNotNull()
            .unless((input) => { return input.age < 12; });
        this.ruleFor((input: TestPerson) => { return input.address; }).isNotEqualTo("forbidden address")
            .withErrorMessage("address not allowed")
            .withSeverity(Severity.WARNING)
            .onFailure((failure) => {
                validationFailure = failure;
            });
    }
}

class TestFunctionOverloadingValidator extends AbstractValidator<TestPerson> {
    constructor() {
        super();
        this.ruleForNumber((input: TestPerson) => { return input.age; }).isGreaterThanOrEqual(18)
            .withErrorMessage("too young");
    }
}

describe("AbstractValidator", () => {
    let validator: TestValidator;
    let person: TestPerson;

    beforeEach(() => {
        validationFailure = null;
        validator = new TestValidator();
        person = new TestPerson();
        person.name = "Franz";
        person.age = 18;
        person.address = "other address";
        person.email = "mail@example.com";
    });

    describe("TestValidator.validate()", () => {
        it("should return a positive validation result for a valid instance", () => {
            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return a negative validation result if name is null", () => {
            person.name = null;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a proper failure-object if name is null", () => {
            person.name = null;

            let failure: ValidationFailure = validator.validate(person).getFailures()[0];

            expect(failure.target).toBe(person);
            expect(failure.propertyName).toBe("name");
            expect(failure.errorCode).toBe("C-3628/B");
            expect(failure.severity).toBe(Severity.ERROR);
            expect(failure.errorMessage).toBe("name is invalid");
        });

        it("should return a negative validation result if address is forbidden", () => {
            person.address = "forbidden address";

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a proper failure-object if address is forbidden", () => {
            person.address = "forbidden address";

            let failure: ValidationFailure = validator.validate(person).getFailures()[0];

            expect(failure.target).toBe(person);
            expect(failure.propertyName).toBe("address");
            expect(failure.errorCode).not.toBeDefined();
            expect(failure.severity).toBe(Severity.WARNING);
            expect(failure.errorMessage).toBe("address not allowed");
        });

        it("should return one failure for every validation that failed", () => {
            person.name = null;
            person.email = null;
            person.address = "forbidden address";

            let result: ValidationResult = validator.validate(person);

            expect(result.getFailures().length).toBe(3);
        });

        it("should trigger callback on failure", () => {
            person.address = "forbidden address";

            validator.validate(person);

            expect(validationFailure).not.toBeNull();
            expect(validationFailure.target).toBe(person);
            expect(validationFailure.propertyName).toBe("address");
        });

        it("should return positive validation result if invalid value is not validated due to a specified condition", () => {
            person.age = 10;
            person.email = null;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return negative validation result if invalid value is validated because of a specified condition", () => {
            person.age = 12;
            person.email = null;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });
    });

    describe("TestValidator.validateAsync()", () => {
        it("should return a positive validation result through a Promise", (done) => {
            let promise: Promise<ValidationResult> = validator.validateAsync(person);

            promise.then((result: ValidationResult) => {
                expect(result.isValid()).toBeTruthy();
                done();
            });
        });

        it("should return a negative validation result through a Promise", (done) => {
            person.name = null;
            let promise: Promise<ValidationResult> = validator.validateAsync(person);

            promise.then((result: ValidationResult) => {
                expect(result.isValid()).toBeFalsy();
                done();
            });
        });
    });
});

describe("TestFunctionOverloadingValidator", () => {
    describe("ruleFor()", () => {
        it("should not throw exception while instanitating validator", () => {
            try {
                let validator = new TestFunctionOverloadingValidator();

                expect(validator).toBeDefined();
            } catch (error) {
                fail(error);
            }
        });
    });

    describe("validate()", () => {
        it("should work with number-specific validation rules (valid case)", () => {
            let validator = new TestFunctionOverloadingValidator();
            let person = new TestPerson();
            person.age = 20;

            let result = validator.validate(person);

            expect(result.isValid()).toBeTruthy();
        });

        it("should work with number-specific validation rules (invalid case)", () => {
            let validator = new TestFunctionOverloadingValidator();
            let person = new TestPerson();
            person.age = 16;

            let result = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
            expect(result.getFailures()[0].errorMessage).toBe("too young");
        });
    });
});

class TestAddressbook {
    contacts: TestPerson[];
}

class AddressbookValidator extends AbstractValidator<TestAddressbook> {
    constructor() {
        super();
        this.ruleForEach((input: TestAddressbook) => { return input.contacts; }).isNotNull();
    }
}

describe("AddressbookValidator", () => {
    let validator: AddressbookValidator;
    let addressbook: TestAddressbook;
    let person1: TestPerson;
    let person2: TestPerson;

    beforeEach(() => {
        validator = new AddressbookValidator();
        addressbook = new TestAddressbook();
        person1 = new TestPerson();
        person2 = new TestPerson();
    });

    describe("validate()", () => {
        it("should return a positive result if none of the elements in the given array is null", () => {
            addressbook.contacts = [person1, person2];

            let result = validator.validate(addressbook);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return a negative result if at least one of the elements in the given array is null", () => {
            addressbook.contacts = [person1, person2, null];

            let result = validator.validate(addressbook);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a detailed result if at least one of the elements in the given array is null", () => {
            addressbook.contacts = [person1, person2, null];

            let result = validator.validate(addressbook);

            expect(result.getFailures()).toContain(jasmine.objectContaining({
                target: addressbook,
                propertyName: "contacts",
                attemptedValue: null,
                errorCode: undefined,
                errorMessage: "contacts is invalid",
                severity: Severity.ERROR
            }));
        });
    });
});