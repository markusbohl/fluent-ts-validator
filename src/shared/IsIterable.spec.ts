import {isIterable} from "./IsIterable";

describe("isIterable()", () => {
    it("should return true, if input is an Iterable", () => {
        const result = isIterable([1, 2, 3]);

        expect(result).toBe(true);
    });

    it("should return false, if input is not an Iterable", () => {
        const result = isIterable({});

        expect(result).toBe(false);
    });

    it("should return false, if input is undefined", () => {
        const result = isIterable(undefined);

        expect(result).toBe(false);
    });

    it("should return false, if input is null", () => {
        const result = isIterable(null);

        expect(result).toBe(false);
    });
});
