import {AbstractValidator} from "./AbstractValidator";
import isEmail = require("validator/lib/isEmail");

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
                testInstance.stringProp2 = undefined;
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isInvalid()).toBe(true);
            });

            it("should not validate when the \"unless\"-condition is not met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = "a value";
                testInstance.booleanProp = true;

                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });

            it("should not validate when the \"when\"-condition is not met", () => {
                testInstance.stringProp1 = "1";
                testInstance.stringProp2 = undefined;
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

    describe("ExceptionResistantValidator1", () => {
        let validator: ExceptionResistantValidator1;

        beforeEach(() => {
            validator = new ExceptionResistantValidator1();
        });

        describe("validate", () => {
            it("should return invalid result since innerProp is undefined", () => {
                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(false);
            });
        });
    });

    describe("ExceptionResistantValidator2", () => {
        let validator: ExceptionResistantValidator2;

        beforeEach(() => {
            validator = new ExceptionResistantValidator2();
        });

        describe("validate", () => {
            it("should return valid result (although innerProp is undefined) since no rule should be applied due to validation conditions", () => {
                const result = validator.validate(testInstance);

                expect(result.isValid()).toBe(true);
            });
        });
    });

    describe("OptionalPropertiesValidator", () => {
        describe("validate()", () => {
            it("should return positive outcome if no optional property is defined", () => {
                let validator = new OptionalPropsValidator();

                const result = validator.validate(new OptionalProps());

                expect(result.isValid()).toBe(true);
            });
        });
    });
});

class TestClass {
    anyProp: any;
    stringProp1?: string;
    stringProp2?: string;
    booleanProp: boolean;
    innerProp: InnerClass;
}

class InnerClass {
    property: string;
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

class ExceptionResistantValidator1 extends AbstractValidator<TestClass> {
    constructor() {
        super();
        this.validateIfString(t => t.innerProp.property).isUppercase();
    }
}
class ExceptionResistantValidator2 extends AbstractValidator<TestClass> {
    constructor() {
        super();
        this.validateIfString(t => t.innerProp.property).isUppercase().whenDefined();
        this.validateIfString(t => t.innerProp.property).isUppercase().whenNotNull();
    }
}

class OptionalProps {
    prop1?: number;
    prop2?: string;
}

class OptionalPropsValidator extends AbstractValidator<OptionalProps> {
    constructor() {
        super();
        this.validateIfNumber(o => o.prop1)
            .isPositive()
            .whenDefined()
            .withFailureMessage(`must be a number above zero`);
        this.validateIfString(o => o.prop2)
            .isEmail()
            .whenDefined()
            .withFailureMessage(`must be a valid email`);
    }
}
