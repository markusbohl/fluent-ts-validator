/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsDefinedValidator,
    IsNullValidator,
    IsNotNullValidator,
    IsEmptyValidator,
    IsNotEmptyValidator,
    IsEqualValidator,
    IsNotEqualValidator,
    IsInValidator,
    IsNotInValidator,
    IsArrayValidator,
    IsBooleanValidator,
    IsDateValidator,
    IsNumberValidator,
    IsStringValidator
} from "../validators/common";

import {
    ValidatorBuilder,
    CommonValidatorBuilder
} from "./";

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

describe("ValidatorBuilder -> CommonValidatorBuilder implementation", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: CommonValidatorBuilder<TestClass, string>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator").and.callThrough();
        validatorBuilder = new ValidatorBuilder(validationRule);
    });

    describe("isDefined()", () => {
        it("should set IsDefinedValidator to validation rule", () => {
            validatorBuilder.isDefined();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsDefinedValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDefined();

            expect(result).not.toBeNull();
        });
    });

    describe("isNull()", () => {
        it("should set IsNullValidator to validation rule", () => {
            validatorBuilder.isNull();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNullValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNull();

            expect(result).not.toBeNull();
        });
    });

    describe("isNotNull()", () => {
        it("should set IsNotNullValidator to validation rule", () => {
            validatorBuilder.isNotNull();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotNullValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotNull();

            expect(result).not.toBeNull();
        });
    });

    describe("isEmpty()", () => {
        it("should set IsEmptyValidator to validation rule", () => {
            validatorBuilder.isEmpty();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsEmptyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEmpty();

            expect(result).not.toBeNull();
        });
    });

    describe("isNotEmpty()", () => {
        it("should set IsNotEmptyValidator to validation rule", () => {
            validatorBuilder.isNotEmpty();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotEmptyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotEmpty();

            expect(result).not.toBeNull();
        });
    });

    describe("isEqualTo()", () => {
        it("should set IsEqualValidator to validation rule", () => {
            validatorBuilder.isEqualTo("foo");

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsEqualValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEqualTo("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("isNotEqualTo()", () => {
        it("should set IsNotEqualValidator to validation rule", () => {
            validatorBuilder.isNotEqualTo("foo");

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotEqualValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotEqualTo("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("is()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isIn(["allowed value"]);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsInValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isIn(["allowed value"]);

            expect(result).not.toBeNull();
        });
    });

    describe("is()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isNotIn(["element value"]);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotInValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotIn(["element value"]);

            expect(result).not.toBeNull();
        });
    });

    describe("isArray()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isArray();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsArrayValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isArray();

            expect(result).not.toBeNull();
        });
    });

    describe("isBoolean()", () => {
        it("should set IsBooleanValidator to validation rule", () => {
            validatorBuilder.isBoolean();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBoolean();

            expect(result).not.toBeNull();
        });
    });

    describe("isDate()", () => {
        it("should set IsDateValidator to validation rule", () => {
            validatorBuilder.isDate();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsDateValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDate();

            expect(result).not.toBeNull();
        });
    });

    describe("isNumber()", () => {
        it("should set IsNumberValidator to validation rule", () => {
            validatorBuilder.isNumber();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNumberValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNumber();

            expect(result).not.toBeNull();
        });
    });

    describe("isString()", () => {
        it("should set IsStringValidator to validation rule", () => {
            validatorBuilder.isString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isString();

            expect(result).not.toBeNull();
        });
    });

    describe("must()", () => {
        it("should set custom validation logic to validation rule", () => {
            let validationExpression = (input: string) => { return input === "foobar"; };

            validatorBuilder.must(validationExpression);

            expect(validationRule.setValidator).toHaveBeenCalled();
        });

        it("should actually apply custom validation logic and succeed", () => {
            validatorBuilder.must((input: string) => {
                return input === "foobar";
            });

            let outcome = validationRule.apply(new TestClass("foobar"));

            expect(outcome.isSuccess()).toBeTruthy();
        });

        it("should actually apply custom validation logic and fail", () => {
            validatorBuilder.must((input: string) => {
                return input === "barfoo";
            });

            let outcome = validationRule.apply(new TestClass("foobar"));

            expect(outcome.isSuccess()).toBeFalsy();
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.must((input: string) => { return input === "foobar"; });

            expect(result).not.toBeNull();
        });
    });
});