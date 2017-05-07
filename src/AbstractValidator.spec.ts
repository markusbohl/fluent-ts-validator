import {AbstractValidator, ValidationResult} from "./";
import {Severity, ValidationFailure} from "./shared";

class TestPerson {
    name: string;
    xpInYears: number;
    address: TestAddress;
    email: string;
    dateOfBirth: Date;
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

class CollectionPropClass {
    names: string[];
    dates: Date[];
    numbers: number[];
    people: TestPerson[];
    anything: any[];
}

class CollectionValidator extends AbstractValidator<CollectionPropClass> {
    constructor() {
        super();
        this.validateIfEachDate(i => i.dates).isAfter(new Date(2000, 0, 1));
        this.validateIfEachString(i => i.names).hasMinLength(2);
        this.validateIfEachNumber(i => i.numbers).isGreaterThan(0);
        this.validateIfEach(i => i.people).isDefined();
        this.validateIfEachAny(i => i.anything).isString();
    }
}

describe("CollectionValidator", () => {
    let validator: CollectionValidator;
    let testInstance: CollectionPropClass;
    beforeEach(() => {
        testInstance = new CollectionPropClass();
        testInstance.names = ["foo"];
        testInstance.dates = [new Date(2001, 0, 1)];
        testInstance.numbers = [1];
        testInstance.people = [new TestPerson()];
        testInstance.anything = ["foobar"];
        validator = new CollectionValidator();
    });

    describe("validate()", () => {
        it("should return positive result if everything is fine", () => {
            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(true);
        });

        it("should return positive result if everything is fine - async", (done) => {
            validator.validateAsync(testInstance).then(result => {
                expect(result.isValid()).toBe(true);
                done();
            }).catch(reason => {
                fail(reason);
                done();
            });
        });

        it("should return negative result if a name is too short", () => {
            testInstance.names.push("X");

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if a date is too old", () => {
            testInstance.dates.push(new Date(1999, 0, 1));

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if a number is negative", () => {
            testInstance.numbers.push(-1);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if a person is undefined", () => {
            testInstance.people.push(undefined);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if anything is not a string", () => {
            testInstance.anything.push(0);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });
    });
});

class IterablePropClass {
    anArray: number[];
    aSet: Set<string>;
    aMap: Map<string, string>;
    aReadonlyArray: ReadonlyArray<boolean>;
    aSecondSet: Set<number>;
    aSecondMap: Map<string, string>;
    aReadonlySet: ReadonlySet<number>;
    aReadonlyMap: ReadonlyMap<string, string>;
}

class IterableValidator extends AbstractValidator<IterablePropClass> {
    constructor() {
        super();
        this.validateIfIterable(i => i.anArray).isEmpty();
        this.validateIfIterable(i => i.aSet).isNotEmpty();
        this.validateIfIterable(i => i.aMap).hasNumberOfElements(1);
        this.validateIfIterable(i => i.aReadonlyArray).hasMinNumberOfElements(1);
        this.validateIfIterable(i => i.aSecondSet).hasMaxNumberOfElements(2);
        this.validateIfIterable(i => i.aSecondMap).hasNumberOfElementsBetween(2, 4);
    }
}

describe("IterableValidator", () => {
    let validator: IterableValidator;
    let testInstance: IterablePropClass;

    beforeEach(() => {
        validator = new IterableValidator();
        testInstance = new IterablePropClass();
        testInstance.anArray = [];
        testInstance.aSet = new Set("foo");
        testInstance.aMap = new Map([["foo", "bar"]]);
        testInstance.aReadonlyArray = [true, false];
        testInstance.aSecondSet = new Set([1, 2]);
        testInstance.aSecondMap = new Map([["foo", "bar"], ["bar", "foo"], ["foobar", "foobar"]]);
    });

    describe("validate()", () => {
        it("should return positive result if everything is fine", () => {
            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(true);
        });

        it("should return positive result if everything is fine - async", (done) => {
            validator.validateAsync(testInstance).then(result => {
                expect(result.isValid()).toBe(true);
                done();
            }).catch(reason => {
                fail(reason);
                done();
            });
        });

        it("should return negative result if anArray is not empty", () => {
            testInstance.anArray.push(1);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if aSet is empty", () => {
            testInstance.aSet = new Set();

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if aMap has not exactly one element", () => {
            testInstance.aMap = new Map([["foo", "bar"], ["bar", "foo"]]);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if aReadonlyArray has not at least one element", () => {
            testInstance.aReadonlyArray = [];

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if aSecondSet has more than two elements", () => {
            testInstance.aSecondSet = new Set([1, 2, 3]);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });

        it("should return negative result if aSecondMap has less than two or more than four elements", () => {
            testInstance.aSecondMap = new Map([["foo", "bar"]]);

            const result = validator.validate(testInstance);

            expect(result.isValid()).toBe(false);
        });
    });
});
