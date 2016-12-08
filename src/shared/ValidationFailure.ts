"use strict";

import { Severity } from "../shared/Severity";

export class ValidationFailure {

    readonly target: any;
    readonly propertyName: string;
    readonly attemptedValue: any;
    readonly errorCode: string;
    readonly errorMessage: string;
    readonly severity: Severity;

    constructor(target: any, propertyName: string, attemptedValue?: any, errorCode?: string, errorMessage?: string, severity = Severity.ERROR) {
        this.target = target;
        this.propertyName = propertyName;
        this.attemptedValue = attemptedValue;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.severity = severity;
    }
}