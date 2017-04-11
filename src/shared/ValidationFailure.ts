import {Severity} from "../shared/Severity";

export class ValidationFailure {

    readonly target: any;
    readonly propertyName: string;
    readonly attemptedValue: any;
    readonly code: string;
    readonly message: string;
    readonly severity: string;

    constructor(target: any, propertyName: string, attemptedValue?: any, code?: string, message?: string, severity = Severity.ERROR) {
        this.target = target;
        this.propertyName = propertyName;
        this.attemptedValue = attemptedValue;
        this.code = code;
        this.message = message;
        this.severity = Severity[severity];
    }
}