import {ValidationRule} from "../validation/ValidationRule";
import {ContainsElementValidator} from "../validators/collection-based/ContainsElementValidator";
import {DoesNotContainElementValidator} from "../validators/collection-based/DoesNotContainElementValidator";
import {IterableValidatorBuilderImpl} from "./IterableValidatorBuilderImpl";

describe("IterableValidatorBuilderImpl", () => {
    let builder: IterableValidatorBuilderImpl<TestClass, string>;
    let validationRule: ValidationRule<TestClass, string[]>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => input.anArray);
        spyOn(validationRule, "addValidator");
        builder = new IterableValidatorBuilderImpl<TestClass, string>(validationRule);
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
});

class TestClass {
    anArray: string[] = [];
}
