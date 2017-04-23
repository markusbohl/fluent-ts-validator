import {ValidationResult, ValidationFailure} from "./";

describe("ValidationResult", () => {
    let result: ValidationResult;
    let failure: ValidationFailure;
    let failures: ValidationFailure[];

    beforeEach(() => {
        result = new ValidationResult();
        failure = new ValidationFailure(null, null, null);
        failures = [failure];
    });

    describe("isValid()", () => {
        it("should return true if no failure exist", () => {
            expect(result.isValid()).toBeTruthy();
        });

        it("should return false if a failure has been added", () => {
            result.addFailures(failures);

            expect(result.isValid()).toBeFalsy();
        });

        it("should continue to return false even after clearing the returned array", () => {
            result.addFailures(failures);
            result.getFailures().pop();

            expect(result.isValid()).toBeFalsy();
        });
    });

    describe("isInvalid()", () => {
        it("should return false if no failure exist", () => {
            expect(result.isInvalid()).toBeFalsy();
        });

        it("should return true if a failure has been added", () => {
            result.addFailures(failures);

            expect(result.isInvalid()).toBeTruthy();
        });

        it("should continue to return true even after clearing the returned array", () => {
            result.addFailures(failures);
            result.getFailures().pop();

            expect(result.isInvalid()).toBeTruthy();
        });
    });

    describe("getFailures()", () => {
        it("should initially return an empty array", () => {
            expect(result.getFailures().length).toBe(0);
        });

        it("should return a copy of the interal array", () => {
            result.addFailures(failures);
            result.getFailures().pop();

            expect(result.getFailures()).toContain(failure);
        });
    });

    describe("addFailure()", () => {
        it("should add a failure to the result", () => {
            result.addFailures(failures);

            expect(result.getFailures()).toContain(failure);
        });

        it("should not add a null to the result", () => {
            result.addFailures(null);

            expect(result.getFailures().length).toBe(0);
            expect(result.getFailures()).not.toContain(null);
        });
    });

    describe("getFailureMessages()", () => {
        it("should return an empty array if there are no failures", () => {
            const messages = result.getFailureMessages();

            expect(messages).not.toBeNull();
            expect(messages.length).toBe(0);
        });

        it("should return all messages of the existing failures", () => {
            result.addFailures(validationFailuresWithMessage("message1", "message2", "message3"));

            const messages = result.getFailureMessages();

            expect(messages.length).toBe(3);
            expect(messages).toContain("message1");
            expect(messages).toContain("message2");
            expect(messages).toContain("message3");
        });
    });

    describe("getFailureCodes()", () => {
        it("should return an empty array if there are no failures", () => {
            const messages = result.getFailureCodes();

            expect(messages).not.toBeNull();
            expect(messages.length).toBe(0);
        });

        it("should return all codes of the existing failures", () => {
            result.addFailures(validationFailuresWithCodes("code1", "code2", "code3"));

            const codes = result.getFailureCodes();

            expect(codes.length).toBe(3);
            expect(codes).toContain("code1");
            expect(codes).toContain("code2");
            expect(codes).toContain("code3");
        });
    });
});

function validationFailuresWithMessage(...messages: string[]): ValidationFailure[] {
    const failures: ValidationFailure[] = [];

    for (let message of messages) {
        failures.push(new ValidationFailure("target", "property", "attemptedValue", "code",  message));
    }

    return failures;
}

function validationFailuresWithCodes(...codes: string[]): ValidationFailure[] {
    const failures: ValidationFailure[] = [];

    for (let code of codes) {
        failures.push(new ValidationFailure("target", "property", "attemptedValue", code));
    }

    return failures;
}
