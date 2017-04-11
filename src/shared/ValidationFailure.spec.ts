import {Severity, ValidationFailure} from "../shared";

describe("ValidationFailure", () => {
    describe("constructor", () => {
        it("should set target and propertyName", () => {
            let target = {};
            let failure = new ValidationFailure(target, "propertyName");

            expect(failure.target).toBe(target);
            expect(failure.propertyName).toBe("propertyName");
        });

        it("should set target, propertyName, attemptedValue, code, message, and severity", () => {
            let target = {};
            let failure = new ValidationFailure(target, "propertyName", "attemptedValue", "code", "message", Severity.WARNING);

            expect(failure.target).toBe(target);
            expect(failure.propertyName).toBe("propertyName");
            expect(failure.attemptedValue).toBe("attemptedValue");
            expect(failure.code).toBe("code");
            expect(failure.message).toBe("message");
            expect(failure.severity).toBe(Severity[Severity.WARNING]);
        });

        it("should set ERROR-severity by default", () => {
            let failure = new ValidationFailure(null, null);

            expect(failure.severity).toBe(Severity[Severity.ERROR]);
        });
    });
});