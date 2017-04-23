import {AbstractValidator} from "./AbstractValidator";

class TestClass {
    stringProp1: string;
    stringProp2: string;
    numberProp: number;
    DateProp: Date;
    booleanProp: boolean;
    stringArrayProp: string[];
}

class MultipleConditionsValidator extends AbstractValidator<TestClass> {
    constructor() {
        super();
        this.validateIfString(t => t.stringProp1).hasMinLength(3)
            .when(t => t.booleanProp)
            .unless(t => t.stringProp2 != null);
    }
}

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

            it("should not validate when the 'unless'-conditions is not met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = "a value";
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });

            it("should not validate when the 'when'-conditions is not met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = null;
                testInstance.booleanProp = false;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });
        });
    });
});
