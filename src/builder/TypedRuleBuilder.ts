"use strict";

import { RuleBuilder } from "./RuleBuilder";

export class TypedRuleBuilder<T, TProperty> implements RuleBuilder<T, TProperty> {

    constructor(private expression: (input: T) => TProperty) {}

    isDefined(): RuleBuilder<T, TProperty> {
        let rule = {
            apply: (input: T): boolean => {
                return typeof this.expression(input) === "undefined";
            }
        };

        return null;
    }
}