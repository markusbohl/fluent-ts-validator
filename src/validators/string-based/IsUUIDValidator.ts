"use strict";

import { PropertyValidator } from "../PropertyValidator";
import { UuidVersion } from "../../shared/";

import * as validatorJS from "validator";

export class IsUUIDValidator implements PropertyValidator<string> {

    constructor(private version?: UuidVersion) { }

    isValid(input: string): boolean {
        return validatorJS.isUUID(input, this.version);
    }
}