import {Severity, ValidationFailure} from "./shared";
import {AbstractValidator, ValidationResult} from "./";

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

        this.validateIfString((input: TestPerson) => input.name)
            .isNotEmpty().hasLengthBetween(3, 20).isAlpha().withFailureCode("N1");

        this.validateIfNumber((input: TestPerson) => input.xpInYears)
            .isGreaterThanOrEqual(3).isLessThanOrEqual(13).withSeverity(Severity.INFO);

        this.validateIfString(input => input.email).isEmail().unless(input => !input.address);

        this.validateIfDate(input => input.dateOfBirth).isSameOrAfter(new Date(2000, 0, 1));

        this.validateIf((input: TestPerson) => {
            return input.address;
        })
            .fulfills(address => {
                if (address) {
                    return address.postcode !== "55555" && address.street !== "Le Place";
                } else {
                    return true;
                }
            })
            .withFailureMessage("address is not allowed")
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
        person.dateOfBirth = new Date(2001, 2, 2);
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
            expect(failure.code).toBe("N1");
            expect(failure.severity).toBe(Severity[Severity.ERROR]);
            expect(failure.message).toBe("name is invalid");
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
            expect(failure.code).not.toBeDefined();
            expect(failure.severity).toBe(Severity[Severity.WARNING]);
            expect(failure.message).toBe("address is not allowed");
        });

        it("should return one failure for every validation that failed", () => {
            person.name = null;
            person.email = null;
            person.dateOfBirth = new Date(1999, 0, 1);
            person.address = {
                street: "Le Place",
                city: "MyTown",
                postcode: "55555"
            };

            let result: ValidationResult = validator.validate(person);

            expect(result.getFailures().length).toBe(4);
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
    addresses: any;
}

class AddressbookValidator extends AbstractValidator<TestAddressbook> {
    constructor() {
        super();
        this.validateIfAny(addressbook => addressbook.addresses).isArray();
        this.validateIfEach(addressbook => addressbook.contacts).isNotNull();
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
        addressbook.contacts = [person1, person2];
        addressbook.addresses = [];
    });

    describe("validate()", () => {
        it("should return a positive result if none of the elements in the given array is null", () => {
            let result = validator.validate(addressbook);

            expect(result.isValid()).toBeTruthy();
        });

        it("should return a negative result if addresses is not an array", () => {
            addressbook.addresses = new Set();

            let result = validator.validate(addressbook);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a negative result if at least one of the elements in the given array is null", () => {
            addressbook.contacts = [person1, person2, null];

            let result = validator.validate(addressbook);

            expect(result.isValid()).toBeFalsy();
        });

        it("should return a detailed result if at least one of the elements in the given array is null", () => {
            addressbook.contacts = [person1, person2, null];

            let result = validator.validate(addressbook);

            expect(result.getFailures()[0]).toEqual(jasmine.objectContaining({
                target: addressbook,
                propertyName: "contacts",
                attemptedValue: null,
                code: undefined,
                message: "contacts is invalid",
                severity: Severity[Severity.ERROR]
            }));
        });
    });
});

class CollectionStuff {
    names: string[];
    dates: Date[];
    numbers: number[];
    people: TestPerson[];
    anything: any[];
}

class CollectionValidator extends AbstractValidator<CollectionStuff> {
    constructor() {
        super();
        this.validateIfEachDate(stuff => stuff.dates).isAfter(new Date(2000, 0, 1));
        this.validateIfEachString(stuff => stuff.names).hasMinLength(2);
        this.validateIfEachNumber(stuff => stuff.numbers).isGreaterThan(0);
        this.validateIfEach(stuff => stuff.people).isDefined();
        this.validateIfEachAny(stuff => stuff.anything).isString();
    }
}

describe("CollectionValidator", () => {
    let validator: CollectionValidator;
    let stuff: CollectionStuff;
    beforeEach(() => {
        stuff = new CollectionStuff();
        stuff.names = ["foo"];
        stuff.dates = [new Date(2001, 0, 1)];
        stuff.numbers = [1];
        stuff.people = [new TestPerson()];
        stuff.anything = ["foobar"];
        validator = new CollectionValidator();
    });

    describe("validate()", () => {
        it("should return positive result if everything is fine", () => {
            const result = validator.validate(stuff);

            expect(result.isValid()).toBe(true);
        });

        it("should return negative result if a name is too short", () => {
            stuff.names.push("X");

            const result = validator.validate(stuff);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if a date is too old", () => {
            stuff.dates.push(new Date(1999, 0, 1));

            const result = validator.validate(stuff);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if a number is negative", () => {
            stuff.numbers.push(-1);

            const result = validator.validate(stuff);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if a person is undefined", () => {
            stuff.people.push(undefined);

            const result = validator.validate(stuff);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if anything is not a string", () => {
            stuff.anything.push(0);

            const result = validator.validate(stuff);

            expect(result.isValid()).toBe(false);
        });
    });
});