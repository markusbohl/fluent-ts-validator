import * as validatorJS from "validator";
import { ContainsValidator } from "./ContainsValidator";

describe("ContainsValidator", () => {
    let validator: ContainsValidator;

    beforeEach(() => {
        validator = new ContainsValidator("foo");
        spyOn(validatorJS, "contains").and.callThrough();
    });

    describe("isValid()", () => {
        it("should delegate contains-validation to validatorJS instance", () => {
            let result = validator.isValid("foobar");

            expect(validatorJS.contains).toHaveBeenCalledWith("foobar", "foo");
            expect(result).toBe(true);
        });

        it("should return false if input is null", () => {
            let result = validator.isValid(null);

            expect(result).toBe(false);
        });

        it("should return false if input is undefined", () => {
            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });
    });
});