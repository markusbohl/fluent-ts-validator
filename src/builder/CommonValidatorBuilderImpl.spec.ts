import {AbstractValidator} from "../";
import {CommonValidatorBuilder, CommonValidatorBuilderImpl, ValidationOptionsBuilder} from "./";
import {Severity, ValidationFailure} from "../shared";
import {
    UnlessCondition,
    ValidationRule,
    WhenCondition,
    WhenDefinedCondition,
    WhenNotNullCondition
} from "../validation";
import {
    IsDefinedValidator,
    IsEmptyValidator,
    IsEqualValidator,
    IsInValidator,
    IsNotEmptyValidator,
    IsNotEqualValidator,
    IsNotInValidator,
    IsNotNullValidator,
    IsNullValidator,
    IsUndefinedValidator
} from "../validators/common";

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

describe("CommonValidatorBuilderImpl -> ValidationOptionsBuilder", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validationOptionsBuilder: ValidationOptionsBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => {
            return input.property;
        });
        validationOptionsBuilder = new CommonValidatorBuilderImpl(validationRule);
    });

    describe("withFailureCode()", () => {
        it("should set error code to validation rule", () => {
            spyOn(validationRule, "setErrorCode");

            validationOptionsBuilder.withFailureCode("error-code");

            expect(validationRule.setErrorCode).toHaveBeenCalledWith("error-code");
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withFailureCode("error-code");

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("withFailureMessage()", () => {
        it("should set error message to validation rule", () => {
            spyOn(validationRule, "setErrorMessage");

            validationOptionsBuilder.withFailureMessage("error-message");

            expect(validationRule.setErrorMessage).toHaveBeenCalledWith("error-message");
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withFailureMessage("error-message");

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("withPropertyName", () => {
        it("should set (property) name to validation rule", () => {
            spyOn(validationRule, "setPropertyName");

            validationOptionsBuilder.withPropertyName("A better property name");

            expect(validationRule.setPropertyName).toHaveBeenCalledWith("A better property name");
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withPropertyName("A better property name");

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("withSeverity()", () => {
        it("should set severity to validation rule", () => {
            spyOn(validationRule, "setSeverity");

            validationOptionsBuilder.withSeverity(Severity.WARNING);

            expect(validationRule.setSeverity).toHaveBeenCalledWith(Severity.WARNING);
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.withSeverity(Severity.WARNING);

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("when()", () => {
        it("should set a WhenCondition to the validation rule", () => {
            spyOn(validationRule, "addCondition");
            validationOptionsBuilder.when((input: TestClass) => {
                return true;
            });

            expect(validationRule.addCondition).toHaveBeenCalledWith(jasmine.any(WhenCondition));
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.when((input: TestClass) => {
                return true;
            });

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("whenDefined()", () => {
        it("should set a WhenCondition to the validation rule", () => {
            spyOn(validationRule, "addCondition");
            validationOptionsBuilder.whenDefined();

            expect(validationRule.addCondition).toHaveBeenCalledWith(jasmine.any(WhenDefinedCondition));
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.whenDefined();

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("whenNotNull()", () => {
        it("should set a WhenCondition to the validation rule", () => {
            spyOn(validationRule, "addCondition");
            validationOptionsBuilder.whenNotNull();

            expect(validationRule.addCondition).toHaveBeenCalledWith(jasmine.any(WhenNotNullCondition));
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.whenNotNull();

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("unless()", () => {
        it("should set a UnlessCondition to the validation rule", () => {
            spyOn(validationRule, "addCondition");

            validationOptionsBuilder.unless((input: TestClass) => {
                return true;
            });

            expect(validationRule.addCondition).toHaveBeenCalledWith(jasmine.any(UnlessCondition));
        });

        it("should return current builder instance", () => {
            let result = validationOptionsBuilder.unless((input: TestClass) => {
                return true;
            });

            expect(result).toBe(validationOptionsBuilder);
        });
    });

    describe("onFailure()", () => {
        it("should set on-failure-callback to validation rule", () => {
            spyOn(validationRule, "onFailure");
            let callback = (failure: ValidationFailure) => {
            };

            validationOptionsBuilder.onFailure(callback);

            expect(validationRule.onFailure).toHaveBeenCalledWith(callback);
        });

        it("should return current builder instance", () => {
            let callback = (failure: ValidationFailure) => {
            };

            let result = validationOptionsBuilder.onFailure(callback);

            expect(result).toBe(validationOptionsBuilder);
        });
    });
});

describe("CommonValidatorBuilderImpl -> CommonValidatorBuilder", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: CommonValidatorBuilder<TestClass, string>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => {
            return input.property;
        });
        spyOn(validationRule, "addValidator").and.callThrough();
        validatorBuilder = new CommonValidatorBuilderImpl(validationRule);
    });

    describe("isDefined()", () => {
        it("should set IsDefinedValidator to validation rule", () => {
            validatorBuilder.isDefined();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsDefinedValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDefined();

            expect(result).not.toBeNull();
        });
    });

    describe("isUndefined()", () => {
        it("should set IsUndefinedValidator to validation rule", () => {
            validatorBuilder.isUndefined();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsUndefinedValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isUndefined();

            expect(result).not.toBeNull();
        });
    });

    describe("isNull()", () => {
        it("should set IsNullValidator to validation rule", () => {
            validatorBuilder.isNull();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNullValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNull();

            expect(result).not.toBeNull();
        });
    });

    describe("isNotNull()", () => {
        it("should set IsNotNullValidator to validation rule", () => {
            validatorBuilder.isNotNull();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNotNullValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotNull();

            expect(result).not.toBeNull();
        });
    });

    describe("isEmpty()", () => {
        it("should set IsEmptyValidator to validation rule", () => {
            validatorBuilder.isEmpty();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsEmptyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEmpty();

            expect(result).not.toBeNull();
        });
    });

    describe("isNotEmpty()", () => {
        it("should set IsNotEmptyValidator to validation rule", () => {
            validatorBuilder.isNotEmpty();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNotEmptyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotEmpty();

            expect(result).not.toBeNull();
        });
    });

    describe("isEqualTo()", () => {
        it("should set IsEqualValidator to validation rule", () => {
            validatorBuilder.isEqualTo("foo");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsEqualValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEqualTo("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("isNotEqualTo()", () => {
        it("should set IsNotEqualValidator to validation rule", () => {
            validatorBuilder.isNotEqualTo("foo");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNotEqualValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotEqualTo("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("isIn()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isIn(["allowed value"]);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsInValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isIn(["allowed value"]);

            expect(result).not.toBeNull();
        });
    });

    describe("isNotIn()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isNotIn(["element value"]);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNotInValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotIn(["element value"]);

            expect(result).not.toBeNull();
        });
    });

    describe("fulfills(validationExpression)", () => {
        it("should set custom validation logic to validation rule", () => {
            let validationExpression = (input: string) => {
                return input === "foobar";
            };

            validatorBuilder.fulfills(validationExpression);

            expect(validationRule.addValidator).toHaveBeenCalled();
        });

        it("should actually apply custom validation logic and succeed", () => {
            validatorBuilder.fulfills((input: string) => {
                return input === "foobar";
            });

            let outcome = validationRule.apply(new TestClass("foobar"));

            expect(outcome.isSuccess()).toBeTruthy();
        });

        it("should actually apply custom validation logic and fail", () => {
            validatorBuilder.fulfills((input: string) => {
                return input === "barfoo";
            });

            let outcome = validationRule.apply(new TestClass("foobar"));

            expect(outcome.isSuccess()).toBeFalsy();
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.fulfills((input: string) => {
                return input === "foobar";
            });

            expect(result).not.toBeNull();
        });
    });
});

/**
 * ===============================================================================
 * vvv Tests concerning fulfills(validator) function of CommonValidatorBuilder vvv
 * ===============================================================================
 */

class OuterTestClass {
    property: InnerTestClass;

    constructor(property: InnerTestClass) {
        this.property = property;
    }
}

class InnerTestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

class InnerValidator extends AbstractValidator<InnerTestClass> {
    constructor() {
        super();
        this.validateIf((input: InnerTestClass) => {
            return input.property;
        }).isNotEmpty();
    }
}

describe("CommonValidatorBuilderImpl fulfills(validator)", () => {
    let inner: InnerTestClass;
    let innerValidator: InnerValidator;
    let validationRule: ValidationRule<OuterTestClass, InnerTestClass>;
    let validatorBuilder: CommonValidatorBuilderImpl<OuterTestClass, InnerTestClass>;

    beforeEach(() => {
        inner = new InnerTestClass("foo");
        innerValidator = new InnerValidator();
        validationRule = new ValidationRule((input: OuterTestClass) => {
            return input.property;
        });
        validatorBuilder = new CommonValidatorBuilderImpl(validationRule);
        spyOn(innerValidator, "validate").and.callThrough();
    });

    it("should return new instance of a ValidationOptionsBuilder", () => {
        let result = validatorBuilder.fulfills(innerValidator);

        expect(result).not.toBeNull();
    });

    it("should use validatable to apply validation rules - success case", () => {
        validatorBuilder.fulfills(innerValidator);

        let result = validationRule.apply(new OuterTestClass(new InnerTestClass("foo")));

        expect(result.isSuccess()).toBeTruthy();
    });

    it("should use validatable to apply validation rules - failure case", () => {
        validatorBuilder.fulfills(innerValidator);

        let result = validationRule.apply(new OuterTestClass(new InnerTestClass("")));

        expect(result.isFailure()).toBeTruthy();
    });

    it("should delegate to given validator during validation", () => {
        validatorBuilder.fulfills(innerValidator);
        let objectUnderTest = new InnerTestClass("foo");

        validationRule.apply(new OuterTestClass(objectUnderTest));

        expect(innerValidator.validate).toHaveBeenCalledWith(objectUnderTest);
    });
});
