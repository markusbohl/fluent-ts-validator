import {IsEmptyValidator} from "./IsEmptyValidator";

describe("IsEmptyValidator", () => {
    let isEmptyValidator: IsEmptyValidator;

    beforeEach(() => {
        isEmptyValidator = new IsEmptyValidator();
    });

    describe("isValid()", () => {
        it("should return false if given string value is not null", () => {
            const result = isEmptyValidator.isValid("non-empty");

            expect(result).toBe(false);
        });

        it("should return true if given string is empty", () => {

            const result = isEmptyValidator.isValid("");

            expect(result).toBe(true);
        });

        it("should return false if given number has a value", () => {

            const result = isEmptyValidator.isValid(1);

            expect(result).toBe(false);
        });

        it("should return false if given array has elements", () => {
            const numbers = [1, 2, 3, 4];

            const result = isEmptyValidator.isValid(numbers);

            expect(result).toBe(false);
        });

        it("should return true if given array has no elements", () => {
            const emptyArray: number[] = [];

            const result = isEmptyValidator.isValid(emptyArray);

            expect(result).toBe(true);
        });

        it("should return true if given value is null", () => {

            const result = isEmptyValidator.isValid(null);

            expect(result).toBe(true);
        });

        it("should return true if given value is undefined", () => {
            let notDefined: string;

            const result = isEmptyValidator.isValid(notDefined);

            expect(result).toBe(true);
        });

        it("should return false if given set instance contains elements", () => {
            const set: Set<string> = new Set(["foo"]);

            const result = isEmptyValidator.isValid(set);

            expect(result).toBe(false);
        });

        it("should return true if given set instance does not contain any elements", () => {
            const emptySet: Set<string> = new Set();

            const result = isEmptyValidator.isValid(emptySet);

            expect(result).toBe(true);
        });

        it("should return true if given map instance does not contain any elements", () => {
            const emptyMap: Map<number, string> = new Map();

            const result = isEmptyValidator.isValid(emptyMap);

            expect(result).toBe(true);
        });

        it("should return false if given map instance does contain elements", () => {
            const map: Map<number, string> = new Map();
            map.set(42, "foo");

            const result = isEmptyValidator.isValid(map);

            expect(result).toBe(false);
        });

        it("should return false if given instance is not an iterable although having length and size fields with value 0", () => {
            const result = isEmptyValidator.isValid(new NotAnIterable());

            expect(result).toBe(false);
        });

        it("should return false if given instance is a non-empty iterable without length or size fields", () => {
            let nonEmptyIterable = <Iterable<number>>{};
            nonEmptyIterable[Symbol.iterator] = function* gen() {
                yield* [1, 2];
            };

            const result = isEmptyValidator.isValid(nonEmptyIterable);

            expect(result).toBe(false);
        });

        it("should return true if given instance is an empty iterable without length or size fields", () => {
            let nonEmptyIterable = <Iterable<number>>{};
            nonEmptyIterable[Symbol.iterator] = function* gen() {
                yield* [];
            };

            const result = isEmptyValidator.isValid(nonEmptyIterable);

            expect(result).toBe(true);
        });
    });
});

class NotAnIterable {
    length: number = 0;
    size: number = 0;
}
