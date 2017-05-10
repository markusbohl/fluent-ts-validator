import {ValidationRule} from "../validation/ValidationRule";
import {ContainsElementValidator} from "../validators/collection-based/ContainsElementValidator";
import {DoesNotContainElementValidator} from "../validators/collection-based/DoesNotContainElementValidator";
import {SizedIterableValidatorBuilderImpl} from "./SizedIterableValidatorBuilderImpl";
import {IsEmptyValidator} from "../validators/collection-based/IsEmptyValidator";
import {IsNotEmptyValidator} from "../validators/collection-based/IsNotEmptyValidator";
import {HasNumberOfElementsValidator} from "../validators/collection-based/HasNumberOfElementsValidator";
import {HasMinNumberOfElementsValidator} from "../validators/collection-based/HasMinNumberOfElementsValidator";
import {HasMaxNumberOfElementsValidator} from "../validators/collection-based/HasMaxNumberOfElementsValidator";
import {HasMinMaxNumberOfElementsValidator} from "../validators/collection-based/HasMinMaxNumberOfElementsValidator";
import {WhenNotEmptyCondition} from '../validation/WhenNotEmptyCondition';

describe("SizedIterableValidatorBuilderImpl", () => {
    let builder: SizedIterableValidatorBuilderImpl<TestClass, string>;
    let validationRule: ValidationRule<TestClass, string[]>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => input.anArray);
        spyOn(validationRule, "addValidator");
        spyOn(validationRule, "addCondition");
        builder = new SizedIterableValidatorBuilderImpl<TestClass, string>(validationRule);
    });

    describe("whenNotEmpty()", () => {
        it("should set WhenNotEmptyCondition to validation rule", () => {
            builder.whenNotEmpty();

            expect(validationRule.addCondition).toHaveBeenCalledWith(jasmine.any(WhenNotEmptyCondition));
        });

        it("should return builder itself", () => {
            const result = builder.whenNotEmpty();

            expect(result).toBe(builder);
        });
    });

    describe("contains()", () => {
        it("should set IsEmptyValidator to validation rule", () => {
            builder.contains("foo");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(ContainsElementValidator));
        });

        it("should return builder itself", () => {
            const result = builder.contains("foo");

            expect(result).toBe(builder);
        });
    });

    describe("doesNotContain()()", () => {
        it("should set IsEmptyValidator to validation rule", () => {
            builder.doesNotContain("foo");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(DoesNotContainElementValidator));
        });

        it("should return builder itself", () => {
            const result = builder.doesNotContain("foo");

            expect(result).toBe(builder);
        });
    });

    describe("isEmpty()", () => {
        it("should set IsEmptyValidator to validation rule", () => {
            builder.isEmpty();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsEmptyValidator));
        });

        it("should return builder itself", () => {
            const result = builder.isEmpty();

            expect(result).toBe(builder);
        });
    });

    describe("isNotEmpty()", () => {
        it("should set IsNotEmptyValidator to validation rule", () => {
            builder.isNotEmpty();

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsNotEmptyValidator));
        });

        it("should return builder itself", () => {
            const result = builder.isNotEmpty();

            expect(result).toBe(builder);
        });
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
    anArray: string[] = [];
}
