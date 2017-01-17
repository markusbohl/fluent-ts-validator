"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { UuidVersion } from "../../shared/";

import * as validatorJS from "validator";

export class IsUuidValidator implements PropertyValidator<string> {

    constructor(private version?: UuidVersion) { }

    isValid(input: string): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return validatorJS.isUUID(input, this.version);
    }
}