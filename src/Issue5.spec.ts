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
        it("should return valid result for enum value Colors.Red", () => {
            let dto = new AClass();
            dto.colorEnum = Colors.Red;
            dto.colorString = "RED";

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(true);
        });

        it("should return invalid result for undefined enum value", () => {
            let dto = new AClass();
            dto.colorString = "RED";

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(false);
        });

        it("should return invalid result for undefined string value", () => {
            let dto = new AClass();
            dto.colorEnum = Colors.Blue;

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(false);
        });

        it("should return invalid result for invalid string value", () => {
            let dto = new AClass();
            dto.colorEnum = Colors.Green;
            dto.colorString = "not_a_color";

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(false);
        });
    });
});

enum Colors {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
}

class AClass{
    colorEnum: Colors;
    colorString: string;
}

class MyValidator extends AbstractValidator<AClass> {
    constructor() {
        super();
        this.validateIf(dto => dto.colorEnum)
            .isIn(Colors);
        this.validateIf(dto => dto.colorString)
            .isIn(Colors);
    }
}
