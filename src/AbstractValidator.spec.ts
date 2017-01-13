/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    LengthOptions,
    Severity,
    ValidationFailure
} from "./shared";

import {
    ValidationResult,
    AbstractValidator
} from "./";


class TestPerson {
    name: string;
    xpInYears: number;
    address: TestAddress;
    email: string;
    dateOfBirth: Date;
    buddies: string[];
}

class TestAddress {
    street: string;
    number?: string;
    city: string;
    postcode: string;
}

let validationFailure: ValidationFailure = null;

class TestValidator extends AbstractValidator<TestPerson> {
    constructor() {
        super();

        this.ruleForString((input: TestPerson) => input.name)
            .isNotEmpty().isLength({ min: 3 }).isAlpha().withErrorCode("N1");

        this.ruleForNumber((input: TestPerson) => input.xpInYears)
            .isGreaterThanOrEqual(3).isLessThanOrEqual(13).withSeverity(Severity.INFO);

        this.ruleForString((input: TestPerson) => { return input.email; })
            .isEmail().unless((input: TestPerson) => !input.address);

        this.ruleFor((input: TestPerson) => { return input.address; })
            .must(address => {
                if (address) {
                    return address.postcode !== "55555" && address.street !== "Le Place";
                } else {
                    return true;
                }
            })
            .withErrorMessage("address is not allowed")
            .withSeverity(Severity.WARNING)
            .onFailure((failure) => {
                validationFailure = failure;
            });
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
        person.xpInYears = 8;
        person.email = "mail@example.com";
        person.address = {
            street: "Le other Place",
            city: "MyOtherTown",
            postcode: "22222"
        };
    });

    describe("TestValidator.validate()", () => {
        it("should return a positive validation result for a valid instance", () => {
            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return a negative validation result if name is empty", () => {
            person.name = "";

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a proper failure-object if name is is less than 3 characters long", () => {
            person.name = "DJ";

            let failure: ValidationFailure = validator.validate(person).getFailures()[0];

            expect(failure.target).toBe(person);
            expect(failure.attemptedValue).toBe("DJ");
            expect(failure.propertyName).toBe("name");
            expect(failure.errorCode).toBe("N1");
            expect(failure.severity).toBe(Severity.ERROR);
            expect(failure.errorMessage).toBe("name is invalid");
        });

        it("should return a negative validation result if address is forbidden", () => {
            person.address = {
                street: "Le Place",
                city: "MyTown",
                postcode: "55555"
            };

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a proper failure-object if address is forbidden", () => {
            person.address = {
                street: "Le Place",
                city: "MyTown",
                postcode: "55555"
            };

            let failure: ValidationFailure = validator.validate(person).getFailures()[0];

            expect(failure.target).toBe(person);
            expect(failure.propertyName).toBe("address");
            expect(failure.errorCode).not.toBeDefined();
            expect(failure.severity).toBe(Severity.WARNING);
            expect(failure.errorMessage).toBe("address is not allowed");
        });

        it("should return one failure for every validation that failed", () => {
            person.name = null;
            person.email = null;
            person.address = {
                street: "Le Place",
                city: "MyTown",
                postcode: "55555"
            };

            let result: ValidationResult = validator.validate(person);

            expect(result.getFailures().length).toBe(3);
        });

        it("should trigger callback on failure", () => {
            person.address = {
                street: "Le Place",
                city: "MyTown",
                postcode: "55555"
            };

            validator.validate(person);

            expect(validationFailure).not.toBeNull();
            expect(validationFailure.target).toBe(person);
            expect(validationFailure.propertyName).toBe("address");
        });

        it("should return positive validation result if invalid value is not validated due to a specified condition", () => {
            person.email = null;
            person.address = undefined;

            let result: ValidationResult = validator.validate(person);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return negative validation result if invalid value is validated because of a specified condition", () => {
            person.email = null;
            person.address = {
                street: "Le other Place",
                city: "MyOtherTown",
                postcode: "22222"
            };

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