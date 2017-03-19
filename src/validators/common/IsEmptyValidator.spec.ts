import { IsEmptyValidator } from "./IsEmptyValidator";

describe("IsEmptyValidator", () => {
    describe("isValid()", () => {
        it("should return false if given string value is not null", () => {
            let isEmptyValidator = new IsEmptyValidator();

            let result = isEmptyValidator.isValid("non-empty");

            expect(result).toBeFalsy();
        });

        it("should return true if given string is empty", () => {
            let isEmptyValidator = new IsEmptyValidator();

            let result = isEmptyValidator.isValid("");

            expect(result).toBeTruthy();
        });

        it("should return false if given number has a value", () => {
            let isEmptyValidator = new IsEmptyValidator();

            let result = isEmptyValidator.isValid(1);

            expect(result).toBeFalsy();
        });

        it("should return false if given array has elements", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let numbers = [1, 2, 3, 4];

            let result = isEmptyValidator.isValid(numbers);

            expect(result).toBeFalsy();
        });

        it("should return true if given array has no elements", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let emptyArray: number[] = [];

            let result = isEmptyValidator.isValid(emptyArray);

            expect(result).toBeTruthy();
        });

        it("should return true if given value is null", () => {
            let isEmptyValidator = new IsEmptyValidator();

            let result = isEmptyValidator.isValid(null);

            expect(result).toBeTruthy();
        });

        it("should return true if given value is undefined", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let notDefined: string;

            let result = isEmptyValidator.isValid(notDefined);

            expect(result).toBeTruthy();
        });

        it("should return false if given set instance contains elements", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let set: Set<string> = new Set(["foo"]);

            let result = isEmptyValidator.isValid(set);

            expect(result).toBeFalsy();
        });

        it("should return true if given set instance does not contain any elements", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let emptySet: Set<string> = new Set();

            let result = isEmptyValidator.isValid(emptySet);

            expect(result).toBeTruthy();
        });

        it("should return true if given map instance does not contain any elements", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let emptyMap: Map<number, string> = new Map();

            let result = isEmptyValidator.isValid(emptyMap);

            expect(result).toBeTruthy();
        });

        it("should return false if given map instance does contain elements", () => {
            let isEmptyValidator = new IsEmptyValidator();
            let map: Map<number, string> = new Map();
            map.set(42, "foo");

            let result = isEmptyValidator.isValid(map);

            expect(result).toBeFalsy();
        });
    });
});