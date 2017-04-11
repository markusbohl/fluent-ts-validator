import {IsNotEmptyValidator} from "./IsNotEmptyValidator";

describe("IsNotEmptyValidator", () => {
    describe("isValid()", () => {
        it("should return false if given string value is null", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();

            let result = isNotEmptyValidator.isValid(null);

            expect(result).toBeFalsy();
        });

        it("should return true if given string is not empty", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();

            let result = isNotEmptyValidator.isValid("not-empty");

            expect(result).toBeTruthy();
        });

        it("should return true if given number has a value", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();

            let result = isNotEmptyValidator.isValid(1);

            expect(result).toBeTruthy();
        });

        it("should return true if given array has elements", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let numbers = [1, 2, 3, 4];

            let result = isNotEmptyValidator.isValid(numbers);

            expect(result).toBeTruthy();
        });

        it("should return false if given array has no elements", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let emptyArray: number[] = [];

            let result = isNotEmptyValidator.isValid(emptyArray);

            expect(result).toBeFalsy();
        });

        it("should return false if given value is undefined", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let notDefined: string;

            let result = isNotEmptyValidator.isValid(notDefined);

            expect(result).toBeFalsy();
        });

        it("should return true if given set instance contains elements", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let set: Set<string> = new Set(["foo"]);

            let result = isNotEmptyValidator.isValid(set);

            expect(result).toBeTruthy();
        });

        it("should return false if given set instance does not contain any elements", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let emptySet: Set<string> = new Set();

            let result = isNotEmptyValidator.isValid(emptySet);

            expect(result).toBeFalsy();
        });

        it("should return false if given map instance does not contain any elements", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let emptyMap: Map<number, string> = new Map();

            let result = isNotEmptyValidator.isValid(emptyMap);

            expect(result).toBeFalsy();
        });

        it("should return true if given map instance does contain elements", () => {
            let isNotEmptyValidator = new IsNotEmptyValidator();
            let map: Map<number, string> = new Map();
            map.set(42, "foo");

            let result = isNotEmptyValidator.isValid(map);

            expect(result).toBeTruthy();
        });
    });
});