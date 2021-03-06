import * as validatorJS from "validator";
import {IsUuidValidator} from "./IsUuidValidator";

describe("IsUuidValidator", () => {
    describe("isValid() - delegate to validatorJS", () => {

        beforeEach(() => {
            spyOn(validatorJS, "isUUID");
        });

        it("should delegate isUUID-validation to validatorJS instance", () => {
            let validator = new IsUuidValidator("5");

            validator.isValid("uuid");

            expect(validatorJS.isUUID).toHaveBeenCalledWith("uuid", "5");
        });

        it("should delegate undefined to IsUUID-validation if no specific version is provided", () => {
            let validator = new IsUuidValidator();

            validator.isValid("uuid");

            expect(validatorJS.isUUID).toHaveBeenCalledWith("uuid", undefined);
        });
    });

    describe("isValid()", () => {
        it("should return true", () => {
            spyOn(validatorJS, "isUUID").and.returnValue(true);
            let validator = new IsUuidValidator();

            let result = validator.isValid("uuid");

            expect(result).toBeTruthy();
        });

        it("should return false", () => {
            spyOn(validatorJS, "isUUID").and.returnValue(false);
            let validator = new IsUuidValidator();

            let result = validator.isValid("uuid");

            expect(result).toBeFalsy();
        });

        it("should return false if input is undefined", () => {
            let validator = new IsUuidValidator();

            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });
    });
});
