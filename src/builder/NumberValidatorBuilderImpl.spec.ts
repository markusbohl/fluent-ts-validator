/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsPositiveValidator,
    IsNegativeValidator,
    IsGreaterThanValidator,
    IsGreaterThanOrEqualToValidator,
    IsLessThanValidator,
    IsLessThanOrEqualToValidator
} from "../validators/number-based";

import {
    ValidatorBuilder,
    NumberValidatorBuilder
} from "./";

class TestClass {
    property: number;

    constructor(property: number) {
        this.property = property;
    }
}

describe("ValidatorBuilder -> NumberValidatorBuilder implementation", () => {
    let validationRule: ValidationRule<TestClass, number>;
    let validatorBuilder: NumberValidatorBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator");
        validatorBuilder = new ValidatorBuilder(validationRule);
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

    describe("isNegative()", () => {
        it("should set IsNegativeValidator to validation rule", () => {
            validatorBuilder.isNegative();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNegativeValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNegative();

            expect(result).not.toBeNull();
        });
    });

    describe("isGreaterThan()", () => {
        it("should set IsGreaterThanValidator to validation rule", () => {
            validatorBuilder.isGreaterThan(42);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsGreaterThanValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isGreaterThan(42);

            expect(result).not.toBeNull();
        });
    });

    describe("isGreaterThanOrEqual()", () => {
        it("should set IsGreaterThanOrEqualValidator to validation rule", () => {
            validatorBuilder.isGreaterThanOrEqual(42);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsGreaterThanOrEqualToValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isGreaterThanOrEqual(42);

            expect(result).not.toBeNull();
        });
    });

    describe("isLessThan()", () => {
        it("should set IsLessThanValidator to validation rule", () => {
            validatorBuilder.isLessThan(42);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsLessThanValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isLessThan(42);

            expect(result).not.toBeNull();
        });
    });

    describe("isLessThanOrEqual()", () => {
        it("should set IsLessThanOrEqualValidator to validation rule", () => {
            validatorBuilder.isLessThanOrEqual(42);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsLessThanOrEqualToValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isLessThanOrEqual(42);

            expect(result).not.toBeNull();
        });
    });
});