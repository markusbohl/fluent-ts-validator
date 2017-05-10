import {isIterableEmtpy} from "./IsIterableEmpty";

describe("isIterableEmpty", () => {
    it("should return true if iterable is undefined", () => {
        const result = isIterableEmtpy(undefined);

        expect(result).toBe(true);
    });

    it("should return true if iterable is null", () => {
        const result = isIterableEmtpy(null);

        expect(result).toBe(true);
    });

    it("should return true if iterable is empty", () => {
        const result = isIterableEmtpy([]);

        expect(result).toBe(true);
    });

    it("should return false if iterable is not empty", () => {
        const result = isIterableEmtpy([1, 2]);

        expect(result).toBe(false);
    });
});
