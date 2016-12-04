/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { ValidatorBuilder } from "./ValidatorBuilder";
import { ValidatorBuilderImpl } from "./ValidatorBuilderImpl";
import { ValidationRule } from "../validation/ValidationRule";
import { IsNotNullValidator } from "../validators/IsNotNullValidator";
import { IsEqualValidator } from "../validators/IsEqualValidator";
import { IsNotEqualValidator } from "../validators/IsNotEqualValidator";
import { IsEmptyValidator } from "../validators/IsEmptyValidator";

describe("ValidatorBuilderImpl", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: ValidatorBuilder<TestClass, string>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator");
        validatorBuilder = new ValidatorBuilderImpl(validationRule);
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

});

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}