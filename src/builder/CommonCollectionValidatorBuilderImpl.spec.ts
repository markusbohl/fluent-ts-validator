import {ValidationRule} from "../validation/ValidationRule";
import {HasNumberOfElementsValidator} from "../validators/collection-based/HasNumberOfElementsValidator";
import {CommonCollectionValidatorBuilderImpl} from "./CommonCollectionValidatorBuilderImpl";
import {
    HasMaxNumberOfElementsValidator,
    HasMinMaxNumberOfElementsValidator,
    HasMinNumberOfElementsValidator
} from "../validators/collection-based/index";

describe("CommonCollectionValidatorBuilderImpl", () => {
    let builder: CommonCollectionValidatorBuilderImpl<TestClass, string[]>;
    let validationRule: ValidationRule<TestClass, string[]>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => input.anArray);
        spyOn(validationRule, "addValidator");
        builder = new CommonCollectionValidatorBuilderImpl<TestClass, string[]>(validationRule);
    });

    describe("hasNumberOfElements()", () => {
        it("should set HasNumberOfElementsValidator to validation rule", () => {
            builder.hasNumberOfElements(1);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasNumberOfElementsValidator));
        });

        it("should return builder itself", () => {
            const result = builder.hasNumberOfElements(1);

            expect(result).toBe(builder);
        });
    });

    describe("hasMinNumberOfElements()", () => {
        it("should set HasMinNumberOfElementsValidator to validation rule", () => {
            builder.hasMinNumberOfElements(1);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasMinNumberOfElementsValidator));
        });

        it("should return builder itself", () => {
            const result = builder.hasMinNumberOfElements(1);

            expect(result).toBe(builder);
        });
    });

    describe("hasMaxNumberOfElements()", () => {
        it("should set HasMaxNumberOfElementsValidator to validation rule", () => {
            builder.hasMaxNumberOfElements(1);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasMaxNumberOfElementsValidator));
        });

        it("should return builder itself", () => {
            const result = builder.hasMaxNumberOfElements(1);

            expect(result).toBe(builder);
        });
    });

    describe("hasNumberOfElementsBetween()", () => {
        it("should set HasMinMaxNumberOfElementsValidator to validation rule", () => {
            builder.hasNumberOfElementsBetween(1, 3);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(HasMinMaxNumberOfElementsValidator));
        });

        it("should return builder itself", () => {
            const result = builder.hasNumberOfElementsBetween(1, 3);

            expect(result).toBe(builder);
        });
    });
});

class TestClass {
    anArray: string[];
}
