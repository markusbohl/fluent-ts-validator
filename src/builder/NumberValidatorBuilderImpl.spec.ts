/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsPositiveValidator
} from "../validators/number-based";

import {
    NumberValidatorBuilder,
    NumberValidatorBuilderImpl
} from "./";

describe("NumberValidatorBuilderImpl", () => {
    let validationRule: ValidationRule<TestClass, number>;
    let validatorBuilder: NumberValidatorBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator");
        validatorBuilder = new NumberValidatorBuilderImpl(validationRule);
    });

    describe("isPositive()", () => {
        it("should set IsPositiveValidator to validation rule", () => {
            validatorBuilder.isPositive();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsPositiveValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isPositive();

            expect(result).not.toBeNull();
        });
    });
});

class TestClass {
    property: number;

    constructor(property: number) {
        this.property = property;
    }
}