import {AbstractValidator} from "./AbstractValidator";

describe("Integration Tests for Validators", () => {
    let testInstance: TestClass;

    beforeEach(() => {
        testInstance = new TestClass();
    });

    describe("MultipleConditionsValidator", () => {
        let validator: MultipleConditionsValidator;

        beforeEach(() => {
            validator = new MultipleConditionsValidator();
        });

        describe("validate()", () => {
            it("should validate (and fail) when both validation conditions are met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = null;
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isInvalid()).toBe(true);
            });

            it("should not validate when the 'unless'-condition is not met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = "a value";
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });

            it("should not validate when the 'when'-condition is not met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = null;
                testInstance.booleanProp = false;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });
        });
    });

    describe("WhenNotEmptyConditionValidator", () => {
        let validator: WhenNotEmptyConditionValidator;

        beforeEach(() => {
            validator = new WhenNotEmptyConditionValidator();
        });

        describe("validate()", () => {
            it("should return valid result if anyProp is empty, although not a valid email-address", () => {
                testInstance.anyProp = "";
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });

            it("should return valid result if booleanProp is false, although anyProp is neither empty, nor a valid email-address", () => {
                testInstance.anyProp = "foo_bar";
                testInstance.booleanProp = false;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });

            it("should return invalid result if anyProp is neither empty, nor a valid email-address", () => {
                testInstance.anyProp = "foo_bar";
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(false);
            });
        });
    });
});

class TestClass {
    anyProp: any;
    stringProp1: string;
    stringProp2: string;
    booleanProp: boolean;
}

class MultipleConditionsValidator extends AbstractValidator<TestClass> {
    constructor() {
        super();
        this.validateIfString(t => t.stringProp1).hasMinLength(3)
            .when(t => t.booleanProp)
            .unless(t => t.stringProp2 != null);
    }
}

class WhenNotEmptyConditionValidator extends AbstractValidator<TestClass> {
    constructor() {
        super();
        this.validateIfAny(t => t.anyProp).isString().isEmail()
            .whenNotEmpty()
            .when(t => t.booleanProp);
    }
}
