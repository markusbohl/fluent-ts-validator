/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsBooleanStringValidator
} from "../validators/string-based";

import {
    ValidatorBuilder,
    StringValidatorBuilder
} from "./";

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}

describe("ValidatorBuilder -> StringValidatorBuilder implementation", () => {
    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: StringValidatorBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator");
        validatorBuilder = new ValidatorBuilder(validationRule);
    });

    describe("isBooleanString()", () => {
        it("should set IsBooleanStringValidator to validation rule", () => {
            validatorBuilder.isBooleanString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBooleanString();

            expect(result).not.toBeNull();
        });
    });
});