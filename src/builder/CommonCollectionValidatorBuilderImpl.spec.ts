import {ValidationRule} from "../validation/ValidationRule";
import {HasNumberOfElementsValidator} from "../validators/collection-based/HasNumberOfElementsValidator";
import {CommonCollectionValidatorBuilderImpl} from "./CommonCollectionValidatorBuilderImpl";

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


});

class TestClass {
    anArray: string[];
}
