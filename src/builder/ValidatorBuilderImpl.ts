"use strict";

import { ValidationOptionsBuilder } from "./ValidationOptionsBuilder";
import { ValidationOptionsBuilderImpl } from "./ValidationOptionsBuilderImpl";
import { ValidatorBuilder } from "./ValidatorBuilder";
import { ValidationRule } from "../validation/ValidationRule";
import { IsNotNullValidator } from "../validators/IsNotNullValidator";
import { IsEqualValidator } from "../validators/IsEqualValidator";
import { IsNotEqualValidator } from "../validators/IsNotEqualValidator";
import { IsEmptyValidator } from "../validators/IsEmptyValidator";

export class ValidatorBuilderImpl<T, TProperty> implements ValidatorBuilder<T, TProperty> {

    constructor(private validationRule: ValidationRule<T, TProperty>) {}

    isNotNull(): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsNotNullValidator());

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    isEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsEqualValidator(comparison));

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    isNotEqualTo(comparison: TProperty): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsNotEqualValidator(comparison));

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }

    isEmpty(): ValidationOptionsBuilder<T> {
        this.validationRule.setValidator(new IsEmptyValidator());

        return new ValidationOptionsBuilderImpl(this.validationRule);
    }
} 