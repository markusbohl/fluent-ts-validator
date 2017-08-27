/*
 * Regression tests for https://github.com/markusbohl/fluent-ts-validator/issues/4
 */

import {AbstractValidator} from "./AbstractValidator";

describe("Issue 4", () => {
    let validator: AbstractValidator<ClassA>;

    beforeEach(() => {
        validator = new ClassAValidator();
    });

    describe("AbstractValidator.validate()", () => {
        it("should fail when name is too long", () => {
            const dto = new ClassA();
            dto.name = "01234567891";

            const result = validator.validate(dto);

            expect(result.isInvalid()).toBe(true);
            expect(result.getFailureMessages()).toContain("name must be 1 to 10 characters");
        });

        it("should not fail when name is empty due to whenNotEmpty-option", () => {
            const dto = new ClassA();

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(true);
        });

        it("should fail when number array contains numbers less than 6", () => {
            const dto = new ClassA();
            dto.nbrs = [1];

            const result = validator.validate(dto);

            expect(result.isInvalid()).toBe(true);
            expect(result.getFailureMessages()).toContain("must have 2 elements");
        });

        it("should not fail when number array is empty due to whenNotEmpty-option", () => {
            const dto = new ClassA();

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(true);
        });

        it("should fail when string array contains elements which are not completely uppercase", () => {
            const dto = new ClassA();
            dto.strArray = ["ABC", "xyz"];

            const result = validator.validate(dto);

            expect(result.isInvalid()).toBe(true);
            expect(result.getFailureMessages()).toContain("string must be all uppercase");
        });

        it("should fail when string array contains elements which are not completely uppercase next to empty element", () => {
            const dto = new ClassA();
            dto.strArray = ["", "xyz"];

            const result = validator.validate(dto);

            expect(result.isInvalid()).toBe(true);
            expect(result.getFailureMessages()).toContain("string must be all uppercase");
        });

        it("should not fail when string array is empty due to whenNotEmpty-option", () => {
            const dto = new ClassA();
            dto.strArray = ["ABC", ""];

            const result = validator.validate(dto);

            expect(result.isValid()).toBe(true);
        });
    });
});

class ClassA {
    name: string = "";
    nbrs: number[] = [];
    strArray: string[] = [];
}

export class ClassAValidator extends AbstractValidator<ClassA> {
    constructor() {
        super();

        this.validateIfString(dto => dto.name)
            .hasLengthBetween(1, 10)
            .whenNotEmpty()
            .withFailureMessage("name must be 1 to 10 characters");

        this.validateIfIterable(dto => dto.nbrs)
            .hasNumberOfElements(2)
            .whenNotEmpty()
            .withFailureMessage("must have 2 elements");

        this.validateIfEachString(dto => dto.strArray)
            .isUppercase()
            .whenNotEmpty()
            .withFailureMessage("string must be all uppercase");
    }
}
