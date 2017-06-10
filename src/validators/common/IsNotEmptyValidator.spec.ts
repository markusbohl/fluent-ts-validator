import {IsNotEmptyValidator} from "./IsNotEmptyValidator";

describe("IsNotEmptyValidator", () => {
    let isNotEmptyValidator: IsNotEmptyValidator;

    beforeEach(() => {
        isNotEmptyValidator = new IsNotEmptyValidator();
    });

    describe("isValid()", () => {
        it("should return false if given string value is null", () => {
            let result = isNotEmptyValidator.isValid(null);

            expect(result).toBeFalsy();
        });

        it("should return true if given string is not empty", () => {

            let result = isNotEmptyValidator.isValid("not-empty");

            expect(result).toBeTruthy();
        });

        it("should return true if given number has a value", () => {

            let result = isNotEmptyValidator.isValid(1);

            expect(result).toBeTruthy();
        });

        it("should return true if given array has elements", () => {
            let numbers = [1, 2, 3, 4];

            let result = isNotEmptyValidator.isValid(numbers);

            expect(result).toBeTruthy();
        });

        it("should return false if given array has no elements", () => {
            let emptyArray: number[] = [];

            let result = isNotEmptyValidator.isValid(emptyArray);

            expect(result).toBeFalsy();
        });

        it("should return false if given value is undefined", () => {
            let result = isNotEmptyValidator.isValid(undefined);

            expect(result).toBeFalsy();
        });

        it("should return true if given set instance contains elements", () => {
            let set: Set<string> = new Set(["foo"]);

            let result = isNotEmptyValidator.isValid(set);

            expect(result).toBeTruthy();
        });

        it("should return false if given set instance does not contain any elements", () => {
            let emptySet: Set<string> = new Set();

            let result = isNotEmptyValidator.isValid(emptySet);

            expect(result).toBeFalsy();
        });

        it("should return false if given map instance does not contain any elements", () => {
            let emptyMap: Map<number, string> = new Map();

            let result = isNotEmptyValidator.isValid(emptyMap);

            expect(result).toBeFalsy();
        });

        it("should return true if given map instance does contain elements", () => {
            let map: Map<number, string> = new Map();
            map.set(42, "foo");

            let result = isNotEmptyValidator.isValid(map);

            expect(result).toBeTruthy();
        });

        it("should return true if given instance is not an iterable although having length and size fields with value 0", () => {
            const result = isNotEmptyValidator.isValid(new NotAnIterable());

            expect(result).toBe(true);
        });

        it("should return true if given instance is a non-empty iterable without length or size fields", () => {
            let nonEmptyIterable = <Iterable<number>>{};
            nonEmptyIterable[Symbol.iterator] = function* gen() {
                yield* [1, 2];
            };

            const result = isNotEmptyValidator.isValid(nonEmptyIterable);

            expect(result).toBe(true);
        });

        it("should return false if given instance is an empty iterable without length or size fields", () => {
            let nonEmptyIterable = <Iterable<number>>{};
            nonEmptyIterable[Symbol.iterator] = function* gen() {
                yield* [];
            };

            const result = isNotEmptyValidator.isValid(nonEmptyIterable);

            expect(result).toBe(false);
        });
    });
});

class NotAnIterable {
    length: number = 0;
    size: number = 0;
}
