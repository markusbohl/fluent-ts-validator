/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import * as validatorJS from "validator";
import { FqdnOptions } from "../../shared";
import {
    IsFQDNValidator
} from "./IsFQDNValidator";

describe("IsFQDNValidator", () => {
    describe("isValid() - delegate to validatorJS", () => {
        it("should delegate isFQDN-validation to validatorJS instance", () => {
            spyOn(validatorJS, "isFQDN");
            let validator = new IsFQDNValidator();

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
            let validator = new IsFQDNValidator(options);

            validator.isValid("fqdn");

            expect(validatorJS.isFQDN).toHaveBeenCalledWith("fqdn", options);
        });

        it("should return true", () => {
            spyOn(validatorJS, "isFQDN").and.returnValue(true);
            let validator = new IsFQDNValidator();

            let result = validator.isValid("fqdn");

            expect(result).toBeTruthy();
        });

        it("should return false", () => {
            spyOn(validatorJS, "isFQDN").and.returnValue(false);
            let validator = new IsFQDNValidator();

            let result = validator.isValid("fqdn");

            expect(result).toBeFalsy();
        });
    });
});