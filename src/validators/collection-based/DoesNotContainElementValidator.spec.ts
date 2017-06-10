import {DoesNotContainElementValidator} from "./DoesNotContainElementValidator";

describe("DoesNotContainElementValidator", () => {
    let validator: DoesNotContainElementValidator<string>;
    let anArray: string[];

    beforeEach(() => {
        validator = new DoesNotContainElementValidator("foobar");
    });

    it("should return false if iterable is undefined", () => {
        const result = validator.isValid(undefined);

        expect(result).toBe(false);
    });

    it("should return false if iterable contains given element", () => {
        anArray = ["foo", "bar", "foobar"];

        const result = validator.isValid(anArray);

        expect(result).toBe(false);
    });

    it("should return true if iterable does not contain given element", () => {
        anArray = ["foo", "bar"];

        const result = validator.isValid(anArray);

        expect(result).toBe(true);
    });
});
