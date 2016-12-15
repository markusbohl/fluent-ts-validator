/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    AbstractValidator
} from "../";

import {
    ValidationRule
} from "../validation";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import {
    ValidatorBuilder,
    CustomValidatorAppender
} from "./";

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
        this.ruleFor((input: InnerTestClass) => { return input.property; }).isNotEmpty();
    }
}

describe("ValidatorBuilder -> CustomValidatorAppender implementation", () => {
    let inner: InnerTestClass;
    let innerValidator: InnerValidator;
    let validationRule: ValidationRule<OuterTestClass, InnerTestClass>;
    let validatorBuilder: ValidatorBuilder<OuterTestClass, InnerTestClass>;

    beforeEach(() => {
        inner = new InnerTestClass("foo");
        innerValidator = new InnerValidator();
        validationRule = new ValidationRule((input: OuterTestClass) => { return input.property; });
        validatorBuilder = new ValidatorBuilder(validationRule);
        spyOn(validationRule, "setValidator").and.callThrough();
    });

    describe("setValidator()", () => {
        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.setValidator(innerValidator);

            expect(result).not.toBeNull();
        });

        it("should use validatable to apply validation rules - success case", () => {
            validatorBuilder.setValidator(innerValidator);

            let result = validationRule.apply(new OuterTestClass(new InnerTestClass("foo")));

            expect(result.isSuccess()).toBeTruthy();
        });

        it("should use validatable to apply validation rules - failure case", () => {
            validatorBuilder.setValidator(innerValidator);

            let result = validationRule.apply(new OuterTestClass(new InnerTestClass("")));

            expect(result.isFailure()).toBeTruthy();
        });
    });
});