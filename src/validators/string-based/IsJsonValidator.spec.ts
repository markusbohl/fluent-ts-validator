import {IsJsonValidator} from "./IsJsonValidator";
import * as validatorJS from "validator";

describe("IsJsonValidator", () => {
    let validator: IsJsonValidator;

    beforeEach(() => {
        validator = new IsJsonValidator();
    });

    describe("isValid()", () => {
        it("should delegate to validatorJS - success case", () => {
            spyOn(validatorJS, "isJSON").and.returnValue(true);

            let result = validator.isValid("{'foo': 'bar'}");

            expect(result).toBeTruthy();
            expect(validatorJS.isJSON).toHaveBeenCalledWith("{'foo': 'bar'}");
        });

        it("should delegate to validatorJS - failure case", () => {
            spyOn(validatorJS, "isJSON").and.returnValue(false);

            let result = validator.isValid("foobar");

            expect(result).toBeFalsy();
            expect(validatorJS.isJSON).toHaveBeenCalledWith("foobar");
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });

        it("should return false if input is null", () => {
            let result = validator.isValid(null);

            expect(result).toBe(false);
        });
    });
});