/*
 * Tests for https://github.com/markusbohl/fluent-ts-validator/issues/5
 */

import {AbstractValidator} from "./AbstractValidator";

describe("Issue 5 - Enum Validation", () => {

    let validator: AbstractValidator<AClass>;

    beforeEach(() => {
        validator = new MyValidator();
    });

    describe("AbstractValidator.validate()", () => {
        it("should return valid result for enum value Species.none", () => {
            let dto = new AClass();

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(true);
        });

        it("should return valid result for enum value Species.cattle", () => {
            let dto = new AClass();
            dto.species = Species.cattle;

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(true);
        });
    });
});

enum Species {
    none = "",
    cattle = "cattle",
    deer = "deer"
}

class AClass{
    species: Species = Species.none;
}

class MyValidator extends AbstractValidator<AClass> {
    constructor() {
        super();
        this.validateIf(dto => dto.species)
            .isIn(Species);
    }
}
