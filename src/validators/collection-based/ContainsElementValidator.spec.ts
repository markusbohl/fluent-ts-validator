import {ContainsElementValidator} from "./ContainsElementValidator";

describe("ContainsElementValidator", () => {
    let validator: ContainsElementValidator<string>;
    let anArray: string[];

    beforeEach(() => {
        validator = new ContainsElementValidator("foobar");
    });

    it("should return false if iterable is undefined", () => {
        anArray = undefined;

        const result = validator.isValid(anArray);

        expect(result).toBe(false);
    });

    it("should return false if iterable is null", () => {
        anArray = null;

        const result = validator.isValid(anArray);

        expect(result).toBe(false);
    });

    it("should return true if iterable contains given element", () => {
        anArray = ["foo", "bar", "foobar"];

        const result = validator.isValid(anArray);

        expect(result).toBe(true);
    });

    it("should return false if iterable does not contain given element", () => {
        anArray = ["foo", "bar"];

        const result = validator.isValid(anArray);

        expect(result).toBe(false);
    });
});
