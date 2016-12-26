/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import * as validatorJS from "validator";
import { IsUrlValidator } from "./IsUrlValidator";
import { UrlOptions } from "../../shared/UrlOptions";


describe("IsUrlValidator", () => {

    let validator: IsUrlValidator;

    describe("constructor", () => {
        it("should set optional UrlOptions", () => {
            let urlOptions: UrlOptions = {
                protocols: ["http", "https"],
                require_tld: true,
                require_protocol: true,
                require_host: true
            };
            spyOn(validatorJS, "isURL");

            validator = new IsUrlValidator(urlOptions);
            validator.isValid("https://foo.com");

            expect(validatorJS.isURL).toHaveBeenCalledWith("https://foo.com", urlOptions);
        });
    });

    describe("isValid()", () => {
        beforeEach(() => {
            validator = new IsUrlValidator();
        });
        it("should delegate to validatorJS instance - success case", () => {
            spyOn(validatorJS, "isURL").and.returnValue(true);

            let result = validator.isValid("http://foo.com");

            expect(result).toBeTruthy();
            expect(validatorJS.isURL).toHaveBeenCalledWith("http://foo.com", undefined);
        });

        it("should delegate to validatorJS instance - failure case", () => {
            spyOn(validatorJS, "isURL").and.returnValue(false);

            let result = validator.isValid("bar");

            expect(result).toBeFalsy();
            expect(validatorJS.isURL).toHaveBeenCalledWith("bar", undefined);
        });
    });
});
