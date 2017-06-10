import {ValidationRule} from "../validation";
import {
    IsAfterValidator,
    IsBeforeValidator,
    IsBetweenValidator,
    IsSameAsValidator,
    IsSameOrAfterValidator,
    IsSameOrBeforeValidator
} from "../validators/date-based";
import {DateValidatorBuilder, DateValidatorBuilderImpl} from "./";

class TestClass {
    property: Date;

    constructor(property: Date) {
        this.property = property;
    }
}

describe("DateValidatorBuilderImpl", () => {
    let validationRule: ValidationRule<TestClass, Date>;
    let validatorBuilder: DateValidatorBuilder<TestClass>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => {
            return input.property;
        });
        spyOn(validationRule, "addValidator").and.callThrough();
        validatorBuilder = new DateValidatorBuilderImpl(validationRule);
    });

    describe("isBefore()", () => {
        it("should set IsBeforeValidator to validation rule", () => {
            validatorBuilder.isBefore(new Date());

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBeforeValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBefore(new Date());

            expect(result).not.toBeNull();
        });
    });

    describe("isAfter()", () => {
        it("should set IsAfterValidator to validation rule", () => {
            validatorBuilder.isAfter(new Date());

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsAfterValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isAfter(new Date());

            expect(result).not.toBeNull();
        });
    });

    describe("isSameAs()", () => {
        it("should set IsSameAsValidator to validation rule", () => {
            validatorBuilder.isSameAs(new Date());

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsSameAsValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isSameAs(new Date());

            expect(result).not.toBeNull();
        });
    });

    describe("isSameOrBefore()", () => {
        it("should set IsSameOrBeforeValidator to validation rule", () => {
            validatorBuilder.isSameOrBefore(new Date());

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsSameOrBeforeValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isSameOrBefore(new Date());

            expect(result).not.toBeNull();
        });
    });

    describe("isSameOrAfter()", () => {
        it("should set IsSameOrAfterValidator to validation rule", () => {
            validatorBuilder.isSameOrAfter(new Date());

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsSameOrAfterValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isSameOrAfter(new Date());

            expect(result).not.toBeNull();
        });
    });

    describe("isBetween()", () => {
        const lowerDate = new Date(2016, 0, 1, 0, 0, 0, 0);
        const upperDate = new Date(2016, 11, 31, 23, 59, 59, 999);

        it("should set IsBetweenValidator to validation rule", () => {
            validatorBuilder.isBetween(lowerDate, upperDate, "[", ")");

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBetweenValidator));
        });

        it("should set IsBetweenValidator with default boundaries to validation rule", () => {
            validatorBuilder.isBetween(lowerDate, upperDate);

            expect(validationRule.addValidator).toHaveBeenCalledWith(jasmine.any(IsBetweenValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBetween(lowerDate, upperDate, "[", ")");

            expect(result).not.toBeNull();
        });

        it("should default to excluding boundaries if lower and upper boundaries left blank", () => {
            const testInstance1 = new TestClass(lowerDate);
            const testInstance2 = new TestClass(upperDate);

            validatorBuilder.isBetween(lowerDate, upperDate);

            expect(validationRule.apply(testInstance1).isSuccess()).toBe(false);
            expect(validationRule.apply(testInstance2).isSuccess()).toBe(false);
        });
    });
});
