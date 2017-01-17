"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { UrlOptions } from "../../shared/UrlOptions";

import * as validatorJS from "validator";

export class IsUrlValidator implements PropertyValidator<string> {

    constructor(private urlOptions?: UrlOptions) { }

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isURL(input, this.urlOptions);
    }
}