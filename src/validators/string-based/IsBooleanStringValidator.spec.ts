import * as validatorJS from "validator";
import {IsBooleanStringValidator} from "./IsBooleanStringValidator";

describe("IsBooleanStringValidator", () => {
    let validator: IsBooleanStringValidator;

    beforeEach(() => {
        validator = new IsBooleanStringValidator();
        spyOn(validatorJS, "isBoolean");
    });

    describe("isValid()", () => {
        it("should delegate isBoolean-validation to validatorJS instance", () => {
            validator.isValid("true");

            expect(validatorJS.isBoolean).toHaveBeenCalledWith("true");
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