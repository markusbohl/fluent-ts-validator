import {
    Severity,
    ValidationFailure
} from "../shared";

describe("ValidationFailure", () => {
    describe("constructor", () => {
        it("should set target and propertyName", () => {
            let target = {};
            let failure = new ValidationFailure(target, "propertyName");

            expect(failure.target).toBe(target);
            expect(failure.propertyName).toBe("propertyName");
        });

        it("should set target, propertyName, attemptedValue, errorCode, errorMessage, and severity", () => {
            let target = {};
            let failure = new ValidationFailure(target, "propertyName", "attemptedValue", "errorCode", "errorMessage", Severity.WARNING);

            expect(failure.target).toBe(target);
            expect(failure.propertyName).toBe("propertyName");
            expect(failure.attemptedValue).toBe("attemptedValue");
            expect(failure.errorCode).toBe("errorCode");
            expect(failure.errorMessage).toBe("errorMessage");
            expect(failure.severity).toBe(Severity.WARNING);
        });

        it("should set ERROR-severity by default", () => {
            let failure = new ValidationFailure(null, null);

            expect(failure.severity).toBe(Severity.ERROR);
        });
    });
});