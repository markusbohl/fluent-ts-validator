import * as validatorJS from "validator";
import {FqdnOptions} from "../../shared";
import {IsFqdnValidator} from "./IsFqdnValidator";

describe("IsFqdnValidator", () => {
    describe("isValid() - delegate to validatorJS", () => {
        it("should delegate isFQDN-validation to validatorJS instance", () => {
            spyOn(validatorJS, "isFQDN");
            let validator = new IsFqdnValidator();

            validator.isValid("fqdn");

            expect(validatorJS.isFQDN).toHaveBeenCalledWith("fqdn", undefined);
        });

        it("should delegate isFQDN-validation with options to validatorJS instance", () => {
            spyOn(validatorJS, "isFQDN");
            let options: FqdnOptions = {
                require_tld: true,
                allow_underscores: true,
                allow_trailing_dot: false
            };
            let validator = new IsFqdnValidator(options);

            validator.isValid("fqdn");

            expect(validatorJS.isFQDN).toHaveBeenCalledWith("fqdn", options);
        });

        it("should return true", () => {
            spyOn(validatorJS, "isFQDN").and.returnValue(true);
            let validator = new IsFqdnValidator();

            let result = validator.isValid("fqdn");

            expect(result).toBeTruthy();
        });

        it("should return false", () => {
            spyOn(validatorJS, "isFQDN").and.returnValue(false);
            let validator = new IsFqdnValidator();

            let result = validator.isValid("fqdn");

            expect(result).toBeFalsy();
        });
        it("should return false if input is undefined", () => {
            let validator = new IsFqdnValidator();

            let result = validator.isValid(undefined);

            expect(result).toBe(false);
        });

        it("should return false if input is null", () => {
            let validator = new IsFqdnValidator();

            let result = validator.isValid(null);

            expect(result).toBe(false);
        });
    });
});