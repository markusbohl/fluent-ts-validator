"use strict";

import {
    Severity,
    ValidationFailure
} from "../shared";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import { RuleApplicationOutcome } from "./RuleApplicationOutcome";
import { ValidationCondition } from "./ValidationCondition";

const successfulOutcome = new RuleApplicationOutcome();

export class ValidationRule<T, TProperty> {

    private validator: PropertyValidator<TProperty>;
    private propertyName: string;
    private errorCode: string;
    private errorMessage: string;
    private severity: Severity;
    private condition: ValidationCondition<T>;
    private callback: (failure: ValidationFailure) => void;

    constructor(private lambdaExpression: (input: T) => TProperty) {
        // the best way I could think of to get hold of the propertyName was via regex
        // (the identified propertyName will be used later to specify where a validation failure came from)
        // obviously, something like a native nameof-function in TypeScript would be way nicer
        // unfortunately, it does not exist yet
        let regexArray = lambdaExpression.toString().match("return\\s+\\w+\\.(\\w+)");
        this.propertyName = regexArray && regexArray.length > 1 ? regexArray[1] : null;
     }

     setValidator(validator: PropertyValidator<TProperty>) {
         this.validator = validator;
     }

    setErrorCode(errorCode: string) {
        this.errorCode = errorCode;
    }

    setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    setSeverity(severity: Severity) {
        this.severity = severity;
    }

    setCondition(condition: ValidationCondition<T>) {
        this.condition = condition;
    }

    onFailure(callback: (failure: ValidationFailure) => void) {
        this.callback = callback;
    }

    apply(input: T): RuleApplicationOutcome {

        if (this.condition && !this.condition.shouldDoValidation(input)) {
            return successfulOutcome;
        }

        let propertyValue = this.lambdaExpression(input);

        if (this.validator.isValid(propertyValue)) {
            return successfulOutcome;
        }

        let failure = new ValidationFailure(input, this.propertyName, propertyValue, this.errorCode, this.errorMessage, this.severity);

        if (this.callback) {
            this.callback(failure);
        }

        return new RuleApplicationOutcome(failure);
    }
}