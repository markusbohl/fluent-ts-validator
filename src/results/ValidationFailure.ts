"use strict";

export class ValidationFailure {

    readonly propertyName: string;
    readonly errorMessage: string;
    readonly attemptedValue: any;

    constructor(propertyName: string, errorMessage: string, attemptedValue?: any) {
        this.propertyName = propertyName;
        this.errorMessage = errorMessage;
        this.attemptedValue = attemptedValue;
    }
}