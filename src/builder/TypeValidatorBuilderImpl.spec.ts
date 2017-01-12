"use strict";

import {
    TypeValidatorBuilder,
    TypeValidatorBuilderImpl
} from "./";

import {
    ValidationRule
} from "../validation";

import {
    IsArrayValidator,
    IsBooleanValidator,
    IsDateValidator,
    IsNumberValidator,
    IsStringValidator
} from "../validators/type-based";

class TestClass {
    arrayProp: string[];
    booleanProp: boolean;
    dateProp: Date;
    numberProp: number;
    stringProp: string;
}

describe("TypeValidatorBuilderImpl", () => {
    let validatorBuilder: TypeValidatorBuilder<TestClass>;

    describe("isArray()", () => {
        let validationRule: ValidationRule<TestClass, string[]>;

        beforeEach(() => {
            validationRule = new ValidationRule((input: TestClass) => { return input.arrayProp; });
            validatorBuilder = new TypeValidatorBuilderImpl(validationRule);
        });
        it("should set IsArrayValidator to validation rule", () => {
            spyOn(validationRule, "addValidator");

            validatorBuilder.isArray();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsArrayValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isArray();

            expect(result).not.toBeNull();
        });
    });

    describe("isBoolean()", () => {
        let validationRule: ValidationRule<TestClass, boolean>;

        beforeEach(() => {
            validationRule = new ValidationRule((input: TestClass) => { return input.booleanProp; });
            validatorBuilder = new TypeValidatorBuilderImpl(validationRule);
        });
        it("should set IsBooleanValidator to validation rule", () => {
            spyOn(validationRule, "addValidator");

            validatorBuilder.isBoolean();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBoolean();

            expect(result).not.toBeNull();
        });
    });

    describe("isDate()", () => {
        let validationRule: ValidationRule<TestClass, Date>;

        beforeEach(() => {
            validationRule = new ValidationRule((input: TestClass) => { return input.dateProp; });
            validatorBuilder = new TypeValidatorBuilderImpl(validationRule);
        });
        it("should set IsDateValidator to validation rule", () => {
            spyOn(validationRule, "addValidator");

            validatorBuilder.isDate();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsDateValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDate();

            expect(result).not.toBeNull();
        });
    });

    describe("isNumber()", () => {
        let validationRule: ValidationRule<TestClass, number>;

        beforeEach(() => {
            validationRule = new ValidationRule((input: TestClass) => { return input.numberProp; });
            validatorBuilder = new TypeValidatorBuilderImpl(validationRule);
        });
        it("should set IsNumberValidator to validation rule", () => {
            spyOn(validationRule, "addValidator");

            validatorBuilder.isNumber();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNumberValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNumber();

            expect(result).not.toBeNull();
        });
    });

    describe("isString()", () => {
        let validationRule: ValidationRule<TestClass, string>;

        beforeEach(() => {
            validationRule = new ValidationRule((input: TestClass) => { return input.stringProp; });
            validatorBuilder = new TypeValidatorBuilderImpl(validationRule);
        });
        it("should set IsStringValidator to validation rule", () => {
            spyOn(validationRule, "addValidator");

            validatorBuilder.isString();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isString();

            expect(result).not.toBeNull();
        });
    });
});